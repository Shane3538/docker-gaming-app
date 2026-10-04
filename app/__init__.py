from flask import Flask
from .models import init_db


def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "cyber-arena-secret-key"
    app.config["DATABASE"] = "app.db"

    with app.app_context():
        init_db()

    from .routes import bp
    app.register_blueprint(bp)

    return app
