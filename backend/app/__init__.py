from flask import Flask
from flask_mail import Mail
from flask_cors import CORS
from dotenv import load_dotenv
from mongoengine import connect
import os

# Configure Flask-Caching


load_dotenv(dotenv_path=".env")

def create_app():
    app = Flask(__name__)

    # Connect to MongoDB on localhost
    MONGODB_HOST = os.getenv("MONGO_URI")
    connect(
        db='stake_city',
        host=MONGODB_HOST,
    )

    # Flask-Mail configuration
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USERNAME'] = 'testingben12@gmail.com'  # Replace with your email
    app.config['MAIL_PASSWORD'] = 'qxxa yqbu boeq dojd'     # Replace with your email password
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USE_SSL'] = False

    mail = Mail(app)
    app.secret_key = os.getenv('SECRET_KEY')

    CORS(app, supports_credentials=True, resources={
        r"/*": {
            "origins": ["http://localhost:3000" , "http://localhost:5173"],
            "allow_headers": ["Authorization", "Content-Type"],
        }
    })



    # Register blueprints
    from .API.AdminDashboard import hist_bp


    app.register_blueprint(hist_bp)

    return app
