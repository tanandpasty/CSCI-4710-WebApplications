from email.policy import default
from enum import unique
from . import db
from flask_login import UserMixin

class Role(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32), unique=True)

class Adjective(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32), unique=True)

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(15), unique=True)
    password = db.Column(db.String(30))
    currency = db.Column(db.Integer, default=0)
    adjective = db.Column(db.String(30), default='Cowardly')
    role = db.Column(db.String(30), default='Wizard')
