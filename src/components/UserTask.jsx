// src/components/UserTasks.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const UserTasks = () => {
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    if (!user) return;

    const fetchTasks = async () => {
      const response = await axios.get(`http://localhost:8080/tasks/user/${user.id}`);
      const completed = response.data.filter((task) => task.completed);
      const pending = response.data.filter((task) => !task.completed);
      setTasks(pending);
      setCompletedTasks(completed);
    };
    fetchTasks();
  }, [user]);

  const handleAddTask = async () => {
    if (!user) return;

    const formData = new FormData();
    formData.append('description', newTask);
    formData.append('userId', user.id);

    try {
      const response = await axios.post('http://localhost:8080/tasks', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (error) {
      console.error('Error al agregar tarea:', error);
    }
  };


  const handleCompleteTask = async (taskId) => {
    try {
      await axios.put(`http://localhost:8080/tasks/${taskId}/complete`);      
      setTasks(tasks.filter((task) => task.id !== taskId));
      const completedTask = tasks.find((task) => task.id === taskId);
      setCompletedTasks([...completedTasks, { ...completedTask, completed: true }]);
    } catch (error) {
      console.error('Error al marcar tarea como completada:', error);
    }
  };

  return (
    <div>
      <h2>Tareas de {user ? user.name : 'Usuario no seleccionado'}</h2>
      <h3>Pendientes</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.description}{' '}
            <button onClick={() => handleCompleteTask(task.id)}>Completar</button>
          </li>
        ))}
      </ul>
      <h3>Completadas</h3>
      <ul>
        {completedTasks.map((task) => (
          <li key={task.id}>{task.description}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Nueva tarea"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Agregar Tarea</button>
    </div>
  );
};

export default UserTasks;
