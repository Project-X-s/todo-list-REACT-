import React, { useState } from 'react';
import TodoList from './TodoList';
import '../App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTodo = (text) => {
    const newTodo = { id: todos.length + 1, text: text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const clearCompleted = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'completed') {
      return todo.completed;
    } else {
      return !todo.completed;
    }
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