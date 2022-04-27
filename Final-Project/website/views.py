#from crypt import methods
from flask import Blueprint, redirect, render_template, session, url_for, request
from flask_login import login_required, login_required, current_user
from website import socketio
from flask_socketio import emit

from website.models import User
from . import db

views = Blueprint('views', __name__)


# Below are different lists of adjectives and roles.
# The html character page will automatically update depending
# on how much currency the current player possesses
# adjectives1 are automatically unlocked, adjectives2 are unlocked after
# reaching a currency of 10, adjective3 are unlocked after
# reaching a currency of 50. The same goes for roles1-roles3
adjectives1 = ['British', 'Cocky', 'Cool', 'Creepy', 'Evil', 'Friendly', 'Good', 'Hot', 'Introverted', 'Irish', 'Lame', 'Loud', 'Mean', 'Quiet', 'Smart', 'Sneaky', 'Strong', 'Stubborn', 'Stupid']
adjectives2 = ['Athiestic', 'Blind', 'Conservative', 'Diseased', 'Dying', 'Easily-Shutdown', 'Hated', 'Hurtful', 'Invincible', 'Juvenile', 'Liberal', 'Multi-Millionaire', 'Mysterious', 'Religious', 'Sneaky']
adjectives3 = ['Ascended', 'Celebrity', 'Chatty', 'Dinosaur-Rider', 'Dismissive', 'Doom-Mongering',  'Gigantic', 'Goblin-Slaying', 'Hoarder', 'Murderous', 'Needs-A-Shower', 'Time-Traveling', 'Undead', 'Verbose']
roles1 = ['Barbarian', 'BlackSmith', 'Cow', 'Dragon', 'Dwarf', 'Elf', 'Farmer', 'Goblin', 'Halfling', 'King', 'Knight', 'Priest', 'Prince', 'Princess', 'Rock Golem', 'Tritton', 'Troll', 'Witch', 'Wizard']
roles2 = ['Alien', 'Baseball Player', 'Basketball Player', 'Cowboy', 'Dad', 'Lawyer', 'Mermaid', 'Mom', 'NPC', 'Pirate', 'Skeptic', 'Soccer Player', 'Super Hero', 'Uncle', 'Zookeeper']
roles3 = ['Anime Side Character', 'Conservative', 'E-Girl', 'Frog', 'Imposter', 'Infant', 'Liberal', 'Main Character', 'Monkey', 'Ninja', 'School Girl', 'Social Justice Warrior', 'Teenager', 'Velociraptor']

@views.route('/')
def home():
    return render_template("home.html", user=current_user)

@views.route('/character', methods=['GET', 'POST'])
@login_required
def character():
    db.session.commit()
    if request.method == 'POST':
        adjective = request.form.get('adjective')
        role = request.form.get('role')
        user_to_update = User.query.filter_by(username=current_user.username).first()
        user_to_update.adjective = adjective
        user_to_update.role = role
        db.session.commit()
        return render_template("character.html", user=current_user, adj1=adjectives1, adj2=adjectives2, adj3=adjectives3, role1=roles1, role2=roles2, role3=roles3)
    else:
        return render_template("character.html", user=current_user, adj1=adjectives1, adj2=adjectives2, adj3=adjectives3, role1=roles1, role2=roles2, role3=roles3)
        
@views.route('/chat', methods=['GET', 'POST'])
@login_required
def chat():
    username = str(current_user.username)
    adjective = str(current_user.adjective)
    role = str(current_user.role)
    currency = str(current_user.currency)
    context = {
        'username': username,
        'adjective': adjective,
        'role': role,
        'currency': currency
    }
    return render_template("chat.html", user=current_user, context=context)

@socketio.on('user_joined')
def joined(msg):
	username = msg['user']
	emit('status', {'msg': ' has entered the realm' + '>', 'user': username})
	emit('status', {'msg': ' has entered the realm' + '>', 'user': username}, broadcast=True, include_self=False)

@socketio.on('message')
def message(msg):
	username = msg['user']
	emit('message', {'msg': msg['msg'], 'fullUser' : msg['fullUser'], 'user': username})
	emit('message', {'msg': msg['msg'], 'fullUser' : msg['fullUser'], 'user': username}, broadcast=True, include_self=False)

@socketio.on('liked_msg')
def like_msg(user):
	user_to_update = User.query.filter_by(username= user).first()
	user_to_update.currency += 1
	db.session.commit()	

@socketio.on('user_left')
def user_left(msg):
	username = msg['user']
	emit('status', {'msg': ' has left the realm' + '>', 'user': username})
	emit('status', {'msg': ' has left the realm' + '>', 'user': username}, broadcast=True, include_self=False)      
