import React from 'react';

interface TaskProps {

  task: {
    completed: boolean;
    id: number;
    title: string;
  };

  updateTask: (task: { completed: boolean; title: string; id: number }) => void;

  deleteTask: (id: number) => void;

}

const Task: React.FC<TaskProps> = ({ task, updateTask, deleteTask }) => {
  
  const toggleComplete = () => {
    updateTask({ ...task, completed: !task.completed });
  };

  return (
    <li>
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.title}
      </span>
      <button onClick={toggleComplete}>
        {task.completed ? 'Desconcluir' : 'Concluir'}
      </button>
      <button onClick={() => deleteTask(task.id)}>Remover</button>
    </li>
  );
};

export default Task;