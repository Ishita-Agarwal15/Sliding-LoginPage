from flask import Flask, render_template, request, session, redirect, url_for
from flask_cors import CORS
import os
from pymongo import MongoClient
from dotenv import load_dotenv

app=Flask(__name__)
CORS(app)

load_dotenv()
app.secret_key=os.getenv("SECRET_KEY")
os.environ['OAUTHLIB_INSECURE_TRANSPORT']='1'


# MongoDB Setup
client=MongoClient('mongodb://localhost:27017/')
db=client['login_db']
users=db['users']

@app.route('/')
def index():
    return render_template('login.html')

@app.route('/login',methods=['POST'])
def login():
    data=request.get_json()
    user=users.find_one({"email":data['email'],"password":data['password']})
    if user:
        session['user_email']=data['email']
        return "Login successful!"
    else:
        return "Invalid email or password"

@app.route('/register',methods=['POST'])
def register():
    data=request.get_json()
    if users.find_one({"email":data['email']}):
        return "Email already exists"
    users.insert_one(data)
    return "Registration successful!"


if __name__=='__main__':
    app.run(debug=True)
