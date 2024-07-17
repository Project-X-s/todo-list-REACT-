from flask import Flask, request, jsonify, Blueprint
from model import create, update, delete, get_all_done, get_all_not_done, delete_all_done

app = Blueprint('controller', __name__)

@app.route('/create_task', methods=['POST'])
def create_task():
	data = request.json  # Assumindo que os dados são enviados em formato JSON
	title = data.get('title')
	if not title:
		return jsonify({'error': 'O título é obrigatório'}), 400
	
	create(title)
	return jsonify({'message': 'Tarefa criada com sucesso'}), 201

@app.route('/update_task', methods=['PUT'])
def update_task():
  data = request.json
  id = data.get('id')
  title = data.get('title')
  done = data.get('done')
  update(id, title, done)
  return jsonify({'message': 'Tarefa atualizada com sucesso'}), 200

@app.route('/delete_task', methods=['DELETE'])
def delete_task():
  data = request.json
  id = data.get('id')
  delete(id)
  return jsonify({'message': 'Tarefa deletada com sucesso'}), 200

@app.route('/get_all_done_tasks', methods=['GET'])
def get_all_done_tasks():
  tasks = get_all_done()
  return jsonify(tasks), 200

@app.route('/get_all_not_done_tasks', methods=['GET'])
def get_all_not_done_tasks():
  tasks = get_all_not_done()
  return jsonify(tasks), 200

@app.route('/delete_all_done_tasks', methods=['DELETE'])
def delete_all_done_tasks():
  delete_all_done()
  return jsonify({'message': 'Tarefas deletadas com sucesso'}), 200

if __name__ == '__main__':
	app.run(debug=True)