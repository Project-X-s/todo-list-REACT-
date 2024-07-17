import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
      const response = await axios.get('http://localhost:5000/get_all');
      const formattedTodos = response.data.map(item => ({
        id: item[0],
        text: item[1],
        completed: item[2] === 1 
      }));
      setTodos(formattedTodos); 
    } catch (error) {
      if (error.response) {
        console.error('Error fetching tasks:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('No response from server:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
  };
  

  const addTodo = async (text) => {
    try {
      const response = await axios.post('http://localhost:5000/create_task', { title: text });
      const newTodo = { id: response.data.id, text: text, completed: false };
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTodo = async (id) => {
    if (!id) {
      console.error('ID não definido para deletar');
      return;
    }
  
    try {
      await axios.delete(`http://localhost:5000/delete_task/${id}`);
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  
  const toggleComplete = async (id) => {
    if (!id) {
      console.error('ID não definido para atualizar');
      return;
    }
  
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
      await axios.put(`http://localhost:5000/update_task/${id}`, updatedTodo);
      const updatedTodos = todos.map(todo =>
        todo.id === id ? updatedTodo : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  

  const clearCompleted = async () => {
    try {
      await axios.delete('http://localhost:5000/delete_all_done_tasks');
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
