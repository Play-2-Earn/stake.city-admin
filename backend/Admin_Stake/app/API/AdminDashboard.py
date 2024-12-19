from flask import Blueprint , request , jsonify
from mongoengine import connect , ValidationError,Q
from ..API.model import Question , Answer , Admin , AdminHistory , User , Reports,SelectedAnswer, UserDashboard
from dotenv import load_dotenv
import os
from bson import ObjectId
import requests

hist_bp = Blueprint('question' , __name__)

# Load environment variables
load_dotenv(dotenv_path=".env")

# MongoDB configuration
MONGODB_HOST = os.getenv("MONGO_URI")

# Connect to MongoDB
connect(
    db='stake_city',
    host=MONGODB_HOST,
)

@hist_bp.route('/api/questions_answers', methods=['GET'])
def get_questions_answers():
    """
    Optimized API using MongoDB aggregation with $lookup to fetch questions, answers, and answer giver details efficiently.
    """
    try:
        # Custom function to format timestamps
        def format_timestamp(timestamp):
            return timestamp.strftime('%Y-%m-%d %H:%M:%S') if timestamp else None

        # Aggregation pipeline for questions (Exclude _id)
        questions = Question.objects.aggregate([
            {
                "$project": {
                    "_id": 0,  # Exclude _id from the output
                    "key": {"$toString": "$_id"},  # Convert ObjectId to string
                    "activity": {"$literal": "Created Question"},
                    "user_name": "$user_name",
                    "content": "$question_text",
                    "timestamp": {"$ifNull": ["$timestamp", None]},  # Handle missing timestamps
                    "location_name": "$location_name",  # Use location_name
                    "stake_amount": "$stake_amount",  # Include stake_amount
                    "status": "$status"
                }
            }
        ])

        # Aggregation pipeline for answers with $lookup for question and answer giver user details (Exclude _id)
        answers = Answer.objects.aggregate([
            # First $lookup to join answers with related questions
            {
                "$lookup": {
                    "from": "question",  # Collection to join (questions)
                    "localField": "question_id",  # Field in Answer
                    "foreignField": "_id",  # Field in Question
                    "as": "related_question"  # Output array field
                }
            },
            {"$unwind": {"path": "$related_question", "preserveNullAndEmptyArrays": True}},  # Unwind results

            # Second $lookup to join answers with the answer giver user details
            {
                "$lookup": {
                    "from": "user",  # Assuming the "user" collection contains user information
                    "localField": "answer_giver_user_id",  # Field in Answer
                    "foreignField": "_id",  # Field in User collection
                    "as": "answer_giver"  # Output array field
                }
            },
            {"$unwind": {"path": "$answer_giver", "preserveNullAndEmptyArrays": True}},  # Unwind answer giver details

            {
                "$project": {
                    "_id": 0,  # Exclude _id from the output
                    "key": {"$toString": "$_id"},  # Convert ObjectId to string
                    "activity": {"$literal": "Created Answer"},
                    "user_name": "$answer_giver.user_name",  # Get user_name from the joined user document
                    "content": "$answer",
                    "timestamp": {"$ifNull": ["$timestamp", None]},  # Handle missing timestamps
                    "location_name": {"$ifNull": ["$related_question.location_name", None]},  # Use location_name
                    "stake_amount": {"$ifNull": ["$related_question.stake_amount", 0]},  # Include stake_amount from related question
                    "status": "$status"
                }
            }
        ])

        # Combine questions and answers into a single list
        combined_data = list(questions) + list(answers)

        # Convert ObjectId to string and format timestamps
        for item in combined_data:
            item["timestamp"] = format_timestamp(item.get("timestamp"))  # Safely get the timestamp
            item["key"] = str(item["key"])  # Convert ObjectId to string for "key"

        # Sort: If timestamp is None, it will be treated as the lowest value (last in the list)
        combined_data.sort(key=lambda x: x.get("timestamp") if x.get("timestamp") is not None else "", reverse=True)

        return jsonify({"status": "success", "data": combined_data}), 200
    except ValidationError as e:
        return jsonify({"status": "error", "message": str(e)}), 400
    except Exception as e:
        return jsonify({"status": "error", "message": f"An unexpected error occurred: {str(e)}"}), 500


@hist_bp.route('/api/update_report_status/<string:report_id>', methods=['PUT'])
def update_report_status(report_id):
    """
    API to update the status of a specific Report and create an enriched AdminHistory.
    """
    try:
        # Parse the JSON request body
        data = request.get_json()

        # Extract parameters from the request
        new_status = data.get('status')
        item_type = data.get('type')
        admin_user_id = data.get('admin_user_id')

        # Validate required fields
        if not all([new_status, item_type, admin_user_id]):
            return jsonify({
                "status": "error",
                "message": "Missing required fields: 'status', 'type', or 'admin_user_id'."
            }), 400

        # Validate item type
        if item_type not in ['Question', 'Answer']:
            return jsonify({
                "status": "error",
                "message": "Invalid 'type'. Must be either 'question' or 'answer'."
            }), 400

        # Validate status
        valid_statuses = ['in_check', 'approved', 'rejected']
        if new_status not in valid_statuses:
            return jsonify({
                "status": "error",
                "message": f"Invalid 'status'. Valid options are {', '.join(valid_statuses)}."
            }), 400

        # Convert admin_user_id to ObjectId and check validity
        try:
            admin_user_id = ObjectId(admin_user_id)
        except Exception:
            return jsonify({
                "status": "error",
                "message": "Invalid 'admin_user_id' format. Must be a valid ObjectId."
            }), 400

        # Fetch the admin user
        admin_user = Admin.objects(id=admin_user_id).only('admin_username', 'email').first()
        if not admin_user:
            return jsonify({"status": "error", "message": "Admin user not found."}), 404

        # Fetch the report document
        report = Reports.objects(id=report_id).first()
        if not report:
            return jsonify({"status": "error", "message": "Report not found."}), 404

        # Fetch the target details (question or answer) if needed for activity log
        target_user = None
        target_content = None
           # Determine the target type and fetch details
        if report.target_type.lower() == "question":
            target = Question.objects(id=report.target.id).first()
            if target:
                target_user = target.user
                target_content = target.question_text   # Use question_text
        elif report.target_type.lower() == "answer":
            target = Answer.objects(id=report.target.id).first()
            if target:
                target_user = target.answer_giver_user_id
                target_content = target.answer   # Use answer

        # Update the status of the report
        report.update(set__status=new_status)

        # Create enriched activity string for AdminHistory
        activity = (
            f"The admin '{admin_user.admin_username}' ({admin_user.email}) updated the status of a report on a {item_type}. "
            f"Report was created by '{report.user.user_name}' for '{report.report_reason}'. "
            f"The reported {item_type} belongs to '{target_user.user_name if target_user else 'Unknown User'}' "
            f"({target_user.email if target_user else 'Unknown Email'}) with content: "
            f"'{target_content if target_content else 'Unknown Content'}'."
        )

        # Save the AdminHistory record
        admin_history = AdminHistory(
            user=admin_user.id,  # Admin performing the action
            action=new_status,
            target=report,  # The report being updated
            activity=activity
        )
        admin_history.save()

        return jsonify({
            "status": "success",
            "message": f"The status of the report with ID '{report_id}' has been updated to '{new_status}'.",
            "admin_history": {
                "user_name": admin_user.email,
                "action": new_status,
                "timestamp": admin_history.timestamp.strftime('%d/%m/%Y %H:%M:%S'),
                "activity": activity
            }
        }), 200

    except Exception as e:
        return jsonify({"status": "error", "message": f"An unexpected error occurred: {str(e)}"}), 500

# API to create an admin
@hist_bp.route('/api/admins', methods=['POST'])
def create_admin():
    """
    API to create a new admin user.
    """
    try:
        # Parse the request body
        data = request.get_json()

        # Validate required fields
        required_fields = ['admin_username', 'email', 'password', 'full_name']
        for field in required_fields:
            if field not in data:
                return jsonify({"status": "error", "message": f"Missing required field: {field}"}), 400

        # Check if admin already exists
        if Admin.objects(admin_username=data['admin_username']).first() or Admin.objects(email=data['email']).first():
            return jsonify({"status": "error", "message": "Admin with the given username or email already exists."}), 400

        # Create the admin
        new_admin = Admin(
            admin_username=data['admin_username'],
            email=data['email'],
            password=data['password'],
            full_name=data['full_name'],
        )
        new_admin.save()

        return jsonify({"status": "success", "message": "Admin created successfully.", "admin_id": str(new_admin.id)}), 201

    except Exception as e:
        return jsonify({"status": "error", "message": f"An unexpected error occurred: {str(e)}"}), 500

# API to get all admins
@hist_bp.route('/api/admins', methods=['GET'])
def get_all_admins():
    """
    API to retrieve all admin users.
    """
    try:
        # Retrieve all admin users
        admins = Admin.objects()
        admin_list = [
            {
                "id": str(admin.id),
                "admin_username": admin.admin_username,
                "email": admin.email,
                "full_name": admin.full_name,
                "created_at": admin.created_at.strftime('%Y-%m-%d %H:%M:%S'),
                "is_active": admin.is_active,
            } for admin in admins
        ]

        return jsonify({"status": "success", "data": admin_list}), 200

    except Exception as e:
        return jsonify({"status": "error", "message": f"An unexpected error occurred: {str(e)}"}), 500


@hist_bp.route('/api/admin_history', methods=['GET'])
def get_admin_history():
    """
    Optimized API to fetch admin history records sorted by timestamp, including admin user email.
    """
    try:
        # Fetch all admin history records, sorted by timestamp, projecting only necessary fields
        admin_history_records = AdminHistory.objects.order_by('-timestamp').only(
            'id', 'action', 'timestamp', 'activity', 'user'
        )

        # Extract unique admin IDs from the records
        admin_ids = {str(record.user.id) for record in admin_history_records if record.user}

        # Fetch admin details in one query
        admins = Admin.objects(id__in=admin_ids).only('id', 'email')
        admin_cache = {str(admin.id): admin.email for admin in admins}

        # Transform records into a list of dictionaries
        enriched_history = []
        for record in admin_history_records:
            # Get the admin email
            admin_email = admin_cache.get(str(record.user.id), "Unknown Admin") if record.user else "Unknown Admin"

            # Append the enriched record
            enriched_history.append({
                "key": str(record.id),  # Use ID as the unique key
                "user_name": admin_email,
                "action": record.action,
                "timestamp": record.timestamp.strftime('%d/%m/%Y %H:%M:%S'),
                "activity": record.activity
            })

        return jsonify({
            "status": "success",
            "data": enriched_history
        }), 200

    except Exception as e:
        return jsonify({"status": "error", "message": f"An unexpected error occurred: {str(e)}"}), 500

@hist_bp.route('/api/reports', methods=['POST'])
def create_report():
    """
    API endpoint to create a report against a question or an answer.
    """
    try:
        data = request.json
        user_id = data.get('user_id')
        target_id = data.get('target_id')
        target_type = data.get('target_type')  # Should be "Question" or "Answer"
        report_reason = data.get('report_reason')

        # Validate input
        if not user_id or not target_id or not target_type or not report_reason:
            return jsonify({"status": "error", "message": "Missing required fields."}), 400
        if report_reason not in Reports.REASON_CHOICES:
            return jsonify({"status": "error", "message": "Invalid report reason."}), 400

        # Fetch the user
        user = User.objects(id=user_id).first()
        if not user:
            return jsonify({"status": "error", "message": "User not found."}), 404

        # Determine target collection
        if target_type.lower() == "question":
            target = Question.objects(id=target_id).first()
        elif target_type.lower() == "answer":
            target = Answer.objects(id=target_id).first()
        else:
            return jsonify({"status": "error", "message": "Invalid target type."}), 400

        if not target:
            return jsonify({"status": "error", "message": f"{target_type.capitalize()} not found."}), 404

        # Create the report
        report = Reports(
            user=user,
            target=target,
            report_reason=report_reason,
            content=(
                f"User '{user.user_name}' reported the {target_type.lower()} with ID "
                f"{str(target.id)} for '{report_reason}'."
            ),
            target_type=target_type.lower()
        )
        report.save()

        return jsonify({
            "status": "success",
            "message": "Report created successfully.",
            "data": {
                "report_id": str(report.id),
                "reporter_id": str(user.id),
                "reporter": user.user_name,
                "target_id": str(target.id),
                "target_type": target_type,
                "report_reason": report_reason,
                "content": report.content
            }
        }), 201

    except Exception as e:
        return jsonify({"status": "error", "message": f"An unexpected error occurred: {str(e)}"}), 500

@hist_bp.route('/api/reports', methods=['GET'])
def get_all_reports():
    """
    API endpoint to retrieve all reports without pagination,
    including the owner of the reported item and its content.
    """
    try:
        # Fetch all reports
        reports = Reports.objects.all()

        # Create response data
        reports_data = []
        for report in reports:
            # Initialize variables for target details
            target_owner = None
            target_content = None

            # Determine the target type and fetch details
            if report.target_type.lower() == "question":
                target = Question.objects(id=report.target.id).first()
                if target:
                    target_owner = target.user.user_name
                    target_content = target.question_text   # Use question_text
            elif report.target_type.lower() == "answer":
                target = Answer.objects(id=report.target.id).first()
                if target:
                    target_owner = target.answer_giver_user_id.user_name
                    target_content = target.answer   # Use answer

            # Append the report details to the response list
            reports_data.append({
                "key": str(report.id),
                "reporter_id": str(report.user.id),
                "user_name": report.user.user_name,
                "target_id": str(report.target.id),
                "type": report.target_type.capitalize(),
                "target_owner": target_owner,
                "target_content": target_content,
                "report_reason": report.report_reason,
                "content": report.content,
                "timestamp": report.timestamp.strftime("%Y-%m-%d %H:%M:%S"),
                "status": report.status
            })

        return jsonify({
            "status": "success",
            "data": reports_data
        }), 200

    except Exception as e:
        return jsonify({"status": "error", "message": f"An unexpected error occurred: {str(e)}"}), 500

@hist_bp.route('/api/transactions', methods=['GET'])
def get_transactions():
    try:
        # Calculate total stake amounts from SelectedAnswer
        pipeline = [
            {
                '$lookup': {
                    'from': 'question',  # The collection to join with
                    'localField': 'question_id',  # Field in the selected answer
                    'foreignField': '_id',  # Field in the question
                    'as': 'question_data'
                }
            },
            {
                '$unwind': '$question_data'  # Unwind the array to get a single document for each selected answer
            },
            {
                '$group': {
                    '_id': None,  # Group all data
                    'total_stake_amount': {'$sum': '$question_data.stake_amount'}  # Sum the stake amount
                }
            }
        ]
        selected_answers_result = list(SelectedAnswer.objects.aggregate(*pipeline))
        total_staked_amount = selected_answers_result[0]['total_stake_amount'] if selected_answers_result else 0

        # Calculate the active stake amount for ACTIVE questions
        active_questions = Question.objects(status="ACTIVE").only('stake_amount')
        active_staked_amount = sum(question.stake_amount for question in active_questions)

        # Calculate the total stake amount from all users
        dashboards = UserDashboard.objects().only('total_staked')
        user_total_stake = sum(dashboard.total_staked for dashboard in dashboards)

        # Combine the results
        transactions = {
            "total_staked_amount": total_staked_amount,
            "active_staked_amount": active_staked_amount,
            "user_total_stake": user_total_stake,
            "users_count": len(dashboards)
        }

        # Return the response
        return jsonify({"transactions": transactions}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@hist_bp.route('/api/remove-duplicates', methods=['DELETE'])
def remove_duplicates():
    try:
        # Step 1: Group by user_name and question_id and find duplicates
        pipeline = [
            {
                "$group": {
                    "_id": {"user_name": "$user_name", "question_id": "$question_id"},
                    "duplicates": {"$push": "$_id"},  # Collect all IDs for each group
                    "count": {"$sum": 1}  # Count occurrences
                }
            },
            {
                "$match": {"count": {"$gt": 1}}  # Filter groups with duplicates
            }
        ]

        duplicate_groups = list(SelectedAnswer.objects.aggregate(*pipeline))

        # Step 2: Remove all but one document for each duplicate group
        for group in duplicate_groups:
            duplicate_ids = group["duplicates"]
            # Keep the first document and delete the rest
            ids_to_delete = duplicate_ids[1:]
            SelectedAnswer.objects(id__in=ids_to_delete).delete()

        return jsonify({
            "message": "Duplicate documents removed successfully.",
            "duplicates_found": len(duplicate_groups)
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

from datetime import datetime

@hist_bp.route('/api/update-question-status', methods=['PUT'])
def update_question_status():
    """
    API endpoint to update the status of all questions.
    - If visible_until is not after today, set status to 'ACTIVE'.
    - Otherwise, set status to 'INACTIVE'.
    """
    try:
        today = datetime.now()

        # Update the statuses of all questions in bulk
        questions_to_activate = Question.objects(visible_until__lte=today)
        questions_to_activate.update(status="INACTIVE")

        questions_to_inactivate = Question.objects(visible_until__gt=today)
        questions_to_inactivate.update(status="ACTIVE")

        return jsonify({
            "status": "success",
            "message": "Question statuses updated successfully.",
            "details": {
                "active_count": questions_to_activate.count(),
                "inactive_count": questions_to_inactivate.count()
            }
        }), 200

    except Exception as e:
        return jsonify({"status": "error", "message": f"An error occurred: {str(e)}"}), 500



session = requests.Session()

@hist_bp.route('/api/get_all_users_sorted', methods=['GET'])
def fetch_and_resend_users():
    try:
        # Define the external endpoint URL
        url = "http://localhost:5000/api/get_all_users_sorted"

        # Fetch data from the endpoint using the session
        response = session.get(url)

        # Check if the response is successful
        if response.status_code != 200:
            return jsonify({"error": f"Failed to fetch data. Status code: {response.status_code}"}), response.status_code

        # Parse the fetched data
        data = response.json()

        # Resend the data as the response
        return jsonify(data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
