import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

const TaskDetails = ({ tasks, updateTask, deleteTask }) => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [taskDescription, setTaskDescription] = useState('');
  const [taskTitle, setTaskTitle] = useState('');

  useEffect(() => {
    const foundTask = tasks.find((task) => task.id.toString() === taskId);
    setTask(foundTask);
  }, [tasks, taskId]);

  const handleDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  };

  const handleTaskTitleChange = (event) => {
    setTaskTitle(event.target.value);
  };

  const updateDescription = (event) => {
    event.preventDefault();

    if (!task) {
      return;
    }

    const updatedTask = { ...task, description: taskDescription, title: taskTitle};

    fetch(`http://localhost:3000/tasksList1/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then((data) => {
        setTask(data);
      })
      .catch((error) => {
        console.error('Error updating task: ', error);
      });

      updateTask(taskId, updatedTask);
      location.reload();
  };

  return (
    <div>
      <h2>Task Details</h2>
      {task ? (
        <div>
          <h3>{task.title}</h3>
          <p>Status: {task.completed ? 'Completed' : 'Incomplete'}</p>
          <p>Description: {task.description}</p>

          <form onSubmit={updateDescription}>
          <label>
              Enter new title:
              <input
                type="text"
                value={taskTitle}
                onChange={handleTaskTitleChange}
              />
            </label>
            <label>
              Enter new task description:
              <input
                type="text"
                value={taskDescription}
                onChange={handleDescriptionChange}
              />
            </label>
            <button type="submit">Update Task</button>
          </form>
        </div>
      ) : (
        <p>Task not found</p>
      )}
    </div>
  );
};


export default TaskDetails;