import React, { useState, useEffect } from 'react';
import axios from 'axios'; // npm install axios
import TodoList from './TodoList';
import '../App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchAllTasks();
  }, []); 

  const fetchAllTasks = async () => {
    try {
      const response = await axios.get('/get_all_not_done_tasks'); 
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTodo = async (text) => {
    try {
      const response = await axios.post('/create_task', { title: text });
      setTodos([...todos, { id: response.data.id, text: text, completed: false }]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/delete_task/${id}`);
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleComplete = async (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        const updatedTodo = { ...todo, completed: !todo.completed };
        updateTask(id, updatedTodo.text, updatedTodo.completed);
        return updatedTodo;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const updateTask = async (id, title, done) => {
    try {
      await axios.put('/update_task', { id, title, done });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const clearCompleted = async () => {
    try {
      await axios.delete('/delete_all_done_tasks');
      const updatedTodos = todos.filter(todo => !todo.completed);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error clearing completed tasks:', error);
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'active') {
      return !todo.completed;
    } else if (filter === 'completed') {
      return todo.completed;
    }
    return true;
  });

  return (
    <div className="App">
      <h1>Lista de Afazeres</h1>
      <TodoList
        todos={filteredTodos}
        deleteTodo={deleteTodo}
        toggleComplete={toggleComplete}
        addTodo={addTodo}
      />
      <div className="filters">
        <button onClick={() => setFilter('all')}>Todos</button>
        <button onClick={() => setFilter('active')}>Ativos</button>
        <button onClick={() => setFilter('completed')}>Completos</button>
        <button onClick={clearCompleted}>Limpar Completos</button>
      </div>
    </div>
  );
}

export default App;
