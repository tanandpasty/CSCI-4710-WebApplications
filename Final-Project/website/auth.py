from cmath import log
from flask import Blueprint, redirect, render_template, request, url_for, flash
from sqlalchemy import true
from website.__init__ import db
from website.models import Adjective, User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, login_required, current_user, logout_user

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        user = User.query.filter_by(username=username).first()

        if user:
            if check_password_hash(user.password, password):
                print("YOU HAVE LOGGED IN")
                login_user(user, remember=True)
                flash('You have logged in!', category='success')
            else:
                print("INCORRECT PASSWORD")
                flash('You have typed in an incorrect password.', category='error')
        else:
            print("NO USER HAS BEEN FOUND")
            flash('Username was not found', category='error')
    return render_template('login.html', user=current_user)

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for("auth.login"))

@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        username = request.form.get('username')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')

        user = User.query.filter_by(username=username).first()
        if user:
            flash('User already exists.', category='error')
            print("USER ALREADY EXISTS")
        elif len(username) < 3:
            flash('Username too short.', category='error')
            print("USERNAME TOO SHORT")        
        elif password1 != password2:
            flash('Password don\'t match', category='error')
            print("Password dont match")
        elif len(password1) < 7:
            flash('Password too short', category='error')
            print("Pasword too short")
        else:
            new_user = User(username=username, password=generate_password_hash(password1, method='sha256'))
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)
            return redirect(url_for("views.home"))
    return render_template('sign_up.html', user=current_user)
