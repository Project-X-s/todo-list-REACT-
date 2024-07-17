from flask import Flask    
from flask_cors import CORS
from controller import app as controller 


app = Flask(__name__)
CORS(app)

app.register_blueprint(controller)

if __name__ == "__main__":
    app.run(debug=True)