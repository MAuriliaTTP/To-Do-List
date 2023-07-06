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

    updateTask(taskId, updatedTask);
      
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