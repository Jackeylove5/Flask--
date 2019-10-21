from flask import Flask
from config import Config
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy


db=SQLAlchemy()
migrate=Migrate()

def create_app(config_class=Config):
    app=Flask(__name__)
    app.config.from_object(config_class)
    app.url_map.strict_slashes = False
    CORS(app)

    db.init_app(app)
    migrate.init_app(app, db)

    # 注册blueprint
    from app.api import bp as api_bp
    app.register_blueprint(api_bp,url_prefix='/api')

    return app

from app import models

