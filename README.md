# Sliding-LoginPage
### This is a small, simple and responsive web-based Login and SignUp application built using:
- **Frontend**- HTML, CSS, JavaScript
- **Backend**- Python with Flask
- **Database**- MongoDB


## ✨**Features**
1. Email-based user registration and login
2. Secure password validation with live strength checker
3. Responsive design for mobile, laptop and tablet
4. Eye icon to toggle password visibility
5. Caps Lock detection for password field
6. Password Rules added:
   - Atleast 8 characters
   - Cannot contain email
   - At least 1 number or digit
   - At least 1 special character


## 🚀**Getting Started**
1. Clone the repository
2. Install the necessary dependencies in the system
3. Configure Environment Variables by creating `.env` file (for more [Refer Here](#bonus-more-about-environment-variables))
   - Example of `.env` structure
   ```
   SECRET_KEY=your_secret_key_here
   MONGO_URI=mongodb://localhost:3000/
   API_KEY=your_api_key_here
   ```
4. Run the project using
   ```
   python app.py
   ```
5. Visit the server on the browser using the local server URL


---


### BONUS: More About Environment Variables
- A `.env` file is used to store configuration settings like API keys, database credentials, etc for an application.
- `.env` files should be added to your `.gitignore` file to prevent them from being committed to your version control system. 
- To generate a secure unique SECRET_KEY in Python:
    
  Option 1: Quick and Easy (for development only)
  ```
  import os
  app.secret_key=os.urandom(24)
  ```
  Option 2: Use a strong fixed key (recommended for production)
  ```
  # if using, run this in the command prompt

  python -c "import secrets; print(secrets.token_urlsafe(24))"
  ```
- To use `.env` in Flask
  
  1. Install `python-dotenv`: this allows flask to load variables from `.env` file
     ```
     pip install python-dotenv
     ```
  2. Create file named as `.env` and write you SECRET_KEY
  3. Update `app.py` to load `.env`
     ```
     from dotenv import load_dotenv
     import os

     #load environment variables from .env file
     load_dotenv()    
     
     #set your secret key
     app.secret_key=os.getenv("SECRET_KEY)
     ```