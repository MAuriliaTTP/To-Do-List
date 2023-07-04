import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

const TaskList = ({ tasks, markTaskAsCompleted }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Link to={`/task/${task.id}`}>{task.title}</Link>
          <button onClick={() => markTaskAsCompleted(task.id)}>Mark as Completed</button>
        </li>
      ))}
    </ul>
  );
};

const TaskDetails = ({ tasks }) => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [taskDescription, setTaskDescription] = useState('');

  useEffect(() => {
    const foundTask = tasks.find((task) => task.id.toString() === taskId);
    setTask(foundTask);
  }, [tasks, taskId]);

  const handleDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  };

  const updateDescription = (event) => {
    event.preventDefault();

    if (!task) {
      return;
    }

    const updatedTask = { ...task, description: taskDescription };

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
        console.error('Error updating task description:', error);
      });
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
              Enter new task description:
              <input
                type="text"
                value={taskDescription}
                onChange={handleDescriptionChange}
              />
            </label>
            <button type="submit">Update Description</button>
          </form>
        </div>
      ) : (
        <p>Task not found</p>
      )}
    </div>
  );
};


export default TaskDetails;