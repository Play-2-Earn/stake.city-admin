from mongoengine import Document, StringField, FloatField, IntField, BooleanField,DateTimeField, ReferenceField,connect,DictField, ListField , GenericReferenceField
from datetime import datetime
from dotenv import load_dotenv
import os
# Load environment
load_dotenv(dotenv_path=".env")

MONGODB_HOST = os.getenv("MONGO_URI")

# Connect to MongoDB on localhost
connect(
    db='stake_city',
    host=MONGODB_HOST,
)

# User Model
class User(Document):
    user_name = StringField(required=True, unique=True)  # Unique user identifier
    mobile = StringField(required=True)
    email = StringField(required=True, unique=True)
    password = StringField(required=True)  # Ensure password is required
    full_name = StringField(required=True)
    age = IntField(required=True)
    gender = StringField()
    terms_accepted = BooleanField(default=False)
    verified_email = BooleanField(default=False)
    location = StringField() # Location specific to the Player mode

class Login(Document):
    user_name = ReferenceField(User, required=True)  # Reference to the User model (Foreign key)
    ip_address = StringField(required=True)  # IP address of the user
    browser_name = StringField(required=True)  # Browser name
    device_type = StringField(required=True)  # Device type (e.g., mobile, desktop)
    device_name = StringField(required=True)  # Device name (e.g., iPhone, Pixel)
    brand = StringField(required=True)  # Brand of the device (e.g., Apple, Google)
    model = StringField(required=True)  # Model of the device (e.g., iPhone 12)
    city = StringField(required=True)  # City based on IP address
    region = StringField(required=True)  # Region (state/province) based on IP
    country = StringField(required=True)  # Country based on IP
    login_timestamp = DateTimeField(default=datetime.utcnow)
    last_passwords = StringField()  # Timestamp of login

# Password Reset Model
class PasswordReset(Document):
    user_name = ReferenceField(User, required=True)
    old_password = StringField(required=True)
    new_password = StringField(required=True)
    reset_timestamp = DateTimeField(default=datetime.utcnow)


# Model to store previous passwords
class PreviousPasswords(Document):
    email = StringField(required=True)  # Store email directly
    old_password = StringField(required=True)
    reset_timestamp = DateTimeField(default=datetime.utcnow)

# Question Model
class Question(Document):
    user = ReferenceField(User, required=True)
    user_name = StringField(required=True)
    question_id = StringField()
    question_title = StringField(required=True)
    question_text = StringField(required=True)
    stake_amount = FloatField(required=True)
    coordinates = DictField()
    location_name = StringField()
    timestamp = DateTimeField(default=datetime.utcnow)
    visible_until = DateTimeField(required=True)
    has_been_extended = BooleanField(default=False)
    verbal_address = StringField()  # New field added
    released = BooleanField(default=False)
    associated_users = ListField(ReferenceField(User), default=[])  # List of associated users
    associated_answers = ListField(ReferenceField('Answer'), default=[])  # List of associated answers
     # New attribute to track the review status of the answer
    STATUS_CHOICES = ('INACTIVE', 'ACTIVE')
    status = StringField(choices=STATUS_CHOICES, default='ACTIVE')  # Default to 'in_check'
    meta = {

        'indexes': [
            'timestamp',                 # For sorting and filtering by timestamp
            'stake_amount',              # For filtering by stake amount
            'question_text',             # For searching by question text
        ]
    }

class QuestionExtension(Document):
    question = ReferenceField(Question, required=True)
    extended_by_days = IntField(required=True)
    extension_date = DateTimeField(default=datetime.utcnow)

class Answer(Document):
    # Link to the related question
    question_id = ReferenceField('Question', required=True, reverse_delete_rule=2)

    # User who asked the question (if needed in your logic)
    asker_user_id = ReferenceField('User', required=True, reverse_delete_rule=2)

    # User who gave the answer
    answer_giver_user_id = ReferenceField('User', required=True, reverse_delete_rule=2)

    # Content of the answer
    answer = StringField(required=True)

    # List of user IDs (or usernames) who liked the answer
    likes = ListField(StringField(), default=[])
    liked_by = ListField(StringField(), default=[])  # To store usernames of users who liked

    # Flag to check if the asker liked this specific answer
    liked_by_asker = BooleanField(default=False)
      # New fields
    responder_user_name = StringField()  # Responder's username (optional)
    answer_user_name = StringField()  # Answer user's username (optional)
    answers_selected = BooleanField(default=False)  # If the answer is selected
    question_asker_user_name = StringField()  # Asker's username (optional)
    answer_text = StringField()  # Answer text (optional)
    # Number of reports against this answer
    reports = IntField(default=0)
    reported_by = ListField(ReferenceField('User'), default=[])  # Users who reported the answer

    # Tracking if the asker has liked 3 answers
    has_liked_3 = BooleanField(default=False)

    # Timestamp of when the answer was created
    timestamp = DateTimeField(default=datetime.utcnow)

    # Status of the answer (e.g., 'in_check', 'approved', 'rejected')
    STATUS_CHOICES = ('in_check', 'approved', 'rejected')
    status = StringField(choices=STATUS_CHOICES, default='in_check')
    uploaded_files = ListField(StringField(), default=[])  # Save file IDs in the Answer document

    # Meta options for the Answer document
    meta = {
        'collection': 'answer',  # Specify collection name if needed
        'ordering': ['-timestamp'],  # Default ordering by timestamp (most recent first)
        'indexes': [
            # Indexes for common query patterns
            'timestamp',                 # For sorting and filtering by timestamp
            'status',                    # For filtering by answer status
            'question_id',               # For quickly finding answers related to a question
            'answer_giver_user_id',      # For queries about specific users' answers
            {'fields': ['likes'], 'sparse': True},  # Sparse index for answers with likes
            {'fields': ['reports'], 'sparse': True},  # Sparse index for answers with reports
        ]
    }


class History(Document):
    user_name = StringField(required=True)  # User name of the question asker
    question = StringField(required=True)    # The question text
    stake_amount = FloatField(required=True)  # Amount staked for the question
    active_duration = StringField(required=True)  # Duration in days, hours, minutes, and seconds
    timestamp = DateTimeField(default=datetime.utcnow)  # Timestamp for when the history record was created

class UserDashboard(Document):
    user = ReferenceField(User, required=True, unique=True)  # Reference to the User model
    user_name = StringField(required=True, unique=True)  # Unique user identifier
    full_name = StringField(required=True)  # User's full name
    email = StringField(required=True)  # User's email address
    mobile = StringField(required=True)  # User's mobile number
    multiplier = FloatField(required=True, default=1.0)  # Reputation-based voting score; starting at 1.0
    level = IntField(required=True, default=1)  # Level progression, starts at 1
    asker_badge_name = StringField(default="")  # Badge name for questions asked
    responder_badge_name = StringField(default="")  # Badge name for answers given
    last_updated = DateTimeField(default=datetime.utcnow)  # Track last update timestamp
    total_staked = FloatField(default=0.0)  # Total amount staked by the user
    total_received = FloatField(default=0.0)  # Total amount received by the user
    total_likes = IntField(default=0)  # Total likes received on answers given
    is_active = BooleanField(default=True)  # Indicates if the user dashboard is active
    points_balance = FloatField(default=0.0)  # Points balance for the user
    transactions = ListField(DictField())  # List of transaction details

    def calculate_total_stake(self):
        # Fetch all questions by this user and sum the stake amounts
        total_stake = sum(q.stake_amount for q in Question.objects(user=self.user))
        return total_stake

    def calculate_total_received(self):
        # Fetch all payments where this user was the responder and sum the payment amounts
        total_received = sum(p.payment_amount for p in Payment.objects(responder_user_name=self.user_name))
        return total_received

    def update_last_updated(self):
        # Update the last_updated timestamp
        self.last_updated = datetime.utcnow()
        self.save()
    meta = {
        'indexes': ['user_name']
    }

for dashboard in UserDashboard.objects:
    if not hasattr(dashboard, 'is_active'):
        dashboard.is_active = True  # or whatever default value you choose
        dashboard.save()

class ExtensionQuestion(Document):
    question = ReferenceField(Question, required=True)  # Reference to the Question model
    extension_date = DateTimeField(required=True)  # The new extended visibility date
    has_been_extended = BooleanField(default=False)  # Indicates if the question has been extended

class Payment(Document):
    user = ReferenceField(User, required=True)  # The user who is making the payment
    payment_amount = FloatField(required=True)  # The amount to be paid
    timestamp = DateTimeField(default=datetime.utcnow)  # When the payment was made
    question_id = ReferenceField(Question, required=True)  # Reference to the related question
    responder_user_name = StringField(required=True)  # The username of the responder receiving the payment

    meta = {
        'indexes': [
            {'fields': ['user', 'question_id', 'responder_user_name']}  # Ensure a unique user-question-responder pair if needed
        ]
    }

class Admin(Document):
    admin_username = StringField(required=True, unique=True)  # Unique identifier for admin
    email = StringField(required=True, unique=True)  # Admin email, should be unique
    password = StringField(required=True)  # Password for admin login
    full_name = StringField(required=True)  # Admin's full name
    created_at = DateTimeField(default=datetime.utcnow)  # Timestamp for when the admin was created
    is_active = BooleanField(default=True)  # Status of the admin (active/inactive)
    meta = {
        'collection': 'admins'
        }

    def __str__(self):
        return f"Admin({self.admin_username}, {self.full_name})"

class SelectedAnswer(Document):
    user_name = StringField(required=True)  # The responder's username whose answer is selected
    answer = ReferenceField(Answer, required=True)  # Reference to the selected answer document
    question_id = ReferenceField(Question, required=True)  # Reference to the related question
    timestamp = DateTimeField(default=datetime.utcnow)  # Time when the answer was selected

    meta = {
        'indexes': [
            {'fields': ['question_id', 'user_name'], 'unique': True}  # Ensures a user can select a specific answer only once
        ]
    }

class Wallet(Document):
    user = ReferenceField(User, required=True, unique=True)
    wallet_addr = StringField(unique=True)
    balance = FloatField(required=True, default=0.0)  # Wallet balance
    locked_amount = FloatField(default=0.0) # Balance that is locked after assigning a task
    updated_at = DateTimeField(default=datetime.utcnow)  # Track last update time

from mongoengine import Document, StringField, GenericReferenceField, DateTimeField
from datetime import datetime

class AdminHistory(Document):
    """
    Model for storing the history of admin actions with enriched activity details.
    """
    # Reference to the admin user who performed the action
    user = ReferenceField(Admin , required=True)

    # Action status (e.g., in_check, approved, rejected, updated)
    STATUS_CHOICES = ('in_check', 'approved', 'rejected', 'updated')
    action = StringField(required=True, choices=STATUS_CHOICES)

    # Reference to either an Answer or a Question
    target = GenericReferenceField(required=True)  # Can reference any document type (e.g., Answer or Question)

    # Timestamp for the action
    timestamp = DateTimeField(default=datetime.utcnow)  # When the action was performed

    # Optional field for a human-readable activity description
    activity = StringField()  # Detailed description of the admin action

    # Meta options for the model
    meta = {
        'collection': 'admin_history',  # Collection name
        'ordering': ['-timestamp'],  # Default ordering by timestamp
        'indexes': [
            'timestamp',  # Index for sorting by timestamp
            'user',       # Index for querying by user
            'action',     # Index for querying by action
        ]
    }

class UserHistory(Document):
    """
    Model for storing the history of admin actions with enriched activity details.
    """
    # Reference to the admin user who performed the action
    user = GenericReferenceField(required=True)

    # Action status (e.g., in_check, approved, rejected, updated)
    STATUS_CHOICES = ('in_check', 'approved', 'rejected', 'updated')
    action = StringField(required=True, choices=STATUS_CHOICES)

    # Reference to either an Answer or a Question
    target = GenericReferenceField(required=True)  # Can reference any document type (e.g., Answer or Question)

    # Timestamp for the action
    timestamp = DateTimeField(default=datetime.utcnow)  # When the action was performed

    # Optional field for a human-readable activity description
    content = StringField()  # Detailed description of the admin action

    # Meta options for the model
    meta = {
        'collection': 'admin_history',  # Collection name
        'ordering': ['-timestamp'],  # Default ordering by timestamp
        'indexes': [
            'timestamp',  # Index for sorting by timestamp
            'user',       # Index for querying by user
            'action',     # Index for querying by action
        ]
    }

class Reports(Document):
    """
    Model for storing the reports against questions or answers.
    """
    # Reference to the user who reported the question or answer
    user = ReferenceField(User, required=True)

    # Reference to the reported question or answer
    target = GenericReferenceField(required=True)  # Can reference any document type (e.g., Answer or Question)

    # Timestamp for the report
    timestamp = DateTimeField(default=datetime.utcnow)  # When the report was made
    target_type = StringField(required=True)  # Type of the reported target (e.g., 'question' or 'answer')
    REASON_CHOICES = (
    'inappropriate_language',  # Text contains offensive or abusive language
    'irrelevant_content',      # Text is off-topic or unrelated to the task
    'scam',                    # Text contains fraudulent or deceptive content
    'insufficient_detail',     # Text lacks necessary detail or explanation
    'incorrect_information',   # Text contains false or misleading information
    'other'                    # Any other issue not listed
    )
    report_reason = StringField(required=True, choices=REASON_CHOICES)  # Reason for reporting the text

    STATUS_CHOICES = ('in_check', 'approved', 'rejected')
    status = StringField(choices=STATUS_CHOICES, default='in_check')  # Default to 'in_check'

    content = StringField()  # Optional field for additional context or details about the report
    # Meta options for the model
    meta = {
        'collection': 'reports',  # Collection name
        'ordering': ['-timestamp'],  # Default ordering by timestamp
        'indexes': [
            'timestamp',  # Index for sorting by timestamp
            'user',       # Index for querying by user
        ]
    }

