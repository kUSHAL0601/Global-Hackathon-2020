from flask_sqlalchemy import SQLAlchemy
from app import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))
    username = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    uniqid = db.Column(db.String(255), unique=True)
    typeR = db.Column(db.Integer)

    def __init__(self, name, username, password, uniqid, typeR):
        self.name = name
        self.username = username
        self.password = generate_password_hash(password)
        self.uniqid = uniqid
        self.typeR = int(typeR)
        
    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def to_dict(self):
        return {
            'id' : self.id,
            'name': self.name,
            'username': self.username,
            'uniqid': self.uniqid,
            'typeR': self.typeR
        }

    def __repr__(self):
        return "User<%d> %s" % (self.id, self.name)
