import sqlite3

conn = sqlite3.connect('database.db')
cursor = conn.cursor()

cursor.execute('''
CREATE TABLE IF NOT EXISTS task (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  done BOOLEAN NOT NULL
);
''')

conn.commit()
conn.close()

def get_all():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    cursor.execute('SELECT * FROM task;')
    tasks = cursor.fetchall()
    
    # Obtendo os nomes das colunas
    column_names = [description[0] for description in cursor.description]

    # Convertendo as tuplas em dicionários
    tasks_list = [dict(zip(column_names, task)) for task in tasks]

    conn.close()
    
    return tasks_list

def create(title):
  conn = sqlite3.connect('database.db')
  cursor = conn.cursor()

  cursor.execute('INSERT INTO task (title, done) VALUES (?, ?);', (title, False))
  conn.commit()

  conn.close()
  
def update(id, title, done):
  conn = sqlite3.connect('database.db')
  cursor = conn.cursor()

  cursor.execute('UPDATE task SET title = ?, done = ? WHERE id = ?;', (title, done, id))
  conn.commit()

  conn.close()
  
def delete(id):
  conn = sqlite3.connect('database.db')
  cursor = conn.cursor()

  cursor.execute('DELETE FROM task WHERE id = ?;', (id,))
  conn.commit()

  conn.close()
  
def get_all_done():
  conn = sqlite3.connect('database.db')
  cursor = conn.cursor()

  cursor.execute('SELECT * FROM task WHERE done = ?;', (True,))
  tasks = cursor.fetchall()
  

  # Obtendo os nomes das colunas
  column_names = [description[0] for description in cursor.description]

  # Convertendo as tuplas em dicionários
  tasks_list = [dict(zip(column_names, task)) for task in tasks]

  conn.close()

  return tasks_list

def get_all_not_done():
  conn = sqlite3.connect('database.db')
  cursor = conn.cursor()

  cursor.execute('SELECT * FROM task WHERE done = ?;', (False,))
  tasks = cursor.fetchall()
  
  # Obtendo os nomes das colunas
  column_names = [description[0] for description in cursor.description]

  # Convertendo as tuplas em dicionários
  tasks_list = [dict(zip(column_names, task)) for task in tasks]

  conn.close()

  return tasks_list

def delete_all_done():
  conn = sqlite3.connect('database.db')
  cursor = conn.cursor()

  cursor.execute('DELETE FROM task WHERE done = ?;', (True,))
  conn.commit()

  conn.close()