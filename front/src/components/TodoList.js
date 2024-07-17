import React, { useState } from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, deleteTodo, toggleComplete, addTodo }) {
  const [inputText, setInputText] = useState('');

  const handleAddTodo = () => {
    if (inputText.trim() !== '') {
      addTodo(inputText);
      setInputText('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={handleAddTodo}>Adcionar afazer</button>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleComplete={toggleComplete}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;