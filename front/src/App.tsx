import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList/TaskList';
import TaskForm from './components/TaskForm/TaskForm';

const App = () => {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/get_all_tasks')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = (task: any) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (updatedTask: any) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const deleteTask = (taskId: any) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
    </div>
  );
};

export default App;
