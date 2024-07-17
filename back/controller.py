from flask import Flask, request, jsonify, Blueprint
from model import create

app = Blueprint('controller', __name__)

@app.route('/create_task', methods=['POST'])
def create_task():
	data = request.json  # Assumindo que os dados são enviados em formato JSON
	title = data.get('title')
	if not title:
		return jsonify({'error': 'O título é obrigatório'}), 400
	
	create(title)
	return jsonify({'message': 'Tarefa criada com sucesso'}), 201

if __name__ == '__main__':
	app.run(debug=True)