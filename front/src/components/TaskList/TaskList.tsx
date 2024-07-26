import React from 'react';
import Task from '../Task/Task';

interface TaskListProps {

  tasks: {
    completed: boolean;
    id: number;
    title: string;
  }[];

  updateTask: (task: { completed: boolean; title: string; id: number }) => void;

  deleteTask: (id: number) => void;

}

const TaskList: React.FC<TaskListProps> = ({ tasks, updateTask, deleteTask }) => {
  return (
    <ul>
      {tasks.map(task => (
        <Task key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
      ))}
    </ul>
  );
};

export default TaskList;
