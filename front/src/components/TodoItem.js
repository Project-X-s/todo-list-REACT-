import React from 'react';
import './TodoItem.css';

function TodoItem({ todo, deleteTodo, toggleComplete }) {
  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleToggleComplete = () => {
    toggleComplete(todo.id);
  };

  return (
    <li className={`TodoItem ${todo.completed ? 'completed' : ''}`}>
      <span className="todo-text">{todo.text}</span>
      <div className="buttons">
        <button className="complete-btn" onClick={handleToggleComplete}>
          {todo.completed ? 'Desfazer' : 'Concluir'}
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          Deletar
        </button>
      </div>
    </li>
  );
}

export default TodoItem;