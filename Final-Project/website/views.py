from flask import Blueprint, render_template

views = Blueprint('views', __name__)

@views.route('/')
def home():
    return render_template("home.html")

@views.route('/character')
def character():
    return render_template("character.html")

@views.route('/chat')
def chat():
    return render_template("chat.html")
