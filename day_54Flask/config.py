import os
basedir=os.path.abspath(os.path.dirname(__file__))
class Config(object):
    DEBUG=True
    SQLALCHEMY_DATABASE_URI ='sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    USER_PER_PAGE=3
    POSTS_PER_PAGE=3
    COMMENTS_PER_PAGE=10