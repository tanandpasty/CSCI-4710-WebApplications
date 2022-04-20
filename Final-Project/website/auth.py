from cmath import log
from flask import Blueprint, redirect, render_template, request, url_for
from sqlalchemy import true
from website.__init__ import db
from website.models import Adjective, User
from werkzeug.security import generate_password_hash, check_password_hash

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
                log("LOGGED IN!")
            else:
                print("INCORRECT PASSWORD")
                log("NOT CORRECT!")
        else:
            print("NO USER HAS BEEN FOUND")
            log("NO USER FOUND!")
    return render_template('login.html')

@auth.route('/logout')
def logout():
    return "<h1>LogOUt page</h1>"

@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        username = request.form.get('username')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')

        user = User.query.filter_by(username=username).first()
        if user:
            print("USER ALREADY EXISTS")
            log("USER ALREADY EXISTS")
        elif len(username) < 3:
            pass
        elif password1 != password2:
            pass
        elif len(password1) < 7:
            pass
        else:
            new_user = User(username=username, password=generate_password_hash(password1, method='sha256'))
            db.session.add(new_user)
            db.session.commit()
            return redirect(url_for("views.home"))

    return render_template('sign_up.html')
