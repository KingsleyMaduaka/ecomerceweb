from flask import Flask, render_template, jsonify, request, url_for, redirect
import re
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os
app = Flask(__name__)

load_dotenv

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] ='sitathome20@gmail.com' 
app.config['MAIL_PASSWORD'] = os.getenv("EMAIL_PASSWORD") 

mail = Mail(app)

def is_valid_email(email):
    email_regex = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
    return re.match(email_regex, email)




@app.route("/")
def home():
    return render_template("index.html")

@app.route("/cart")
def cart():
    return render_template("cart.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/contact", methods=['GET', 'POST'])
def contact():
    return render_template("contact.html")



#email sending route
@app.route('/send-email', methods=['GET','POST'])
def send_email():
    data = request.get_json()

    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    phoneNumber = data.get('phoneNumber', '').strip()
    message = data.get('message', '').strip()


    #validation
    if not name or len(name) < 2:
        return jsonify({"error": "Invalid name"}), 400
    if not is_valid_email(email):
        return jsonify ({"error": "Ivalid email address"}), 400
    if not message or len(message) < 10:
        return jsonify({"error": "Message must be at least 10 characters long"}), 400
    
    if not phoneNumber:
        return jsonify({"error": "Phone number is required"}), 400
    
    if not phoneNumber.startswith('+') or not phoneNumber[1:].isdigit() or len(phoneNumber) < 11:
        return jsonify({"error": "Invalid phone number"}), 400
    


    try:
        msg = Message(
            subject = f"Contact Form Submission from {name}",
            sender = email,
            recipients = ['makeltopaz001@gmail.com', 'benchuks144@gmail.com'],
            body= f"from:  {name} \nemail:  {email} \nphone number:  {phoneNumber} \n\nMessage:  {message}",
        )
        mail.send(msg)
        return  "Email sent successfully"
    
    except Exception as e:
        print(e)
        return  "Failed to send email"
    



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
