import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TaskDetails = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [taskDescription, setTaskDescription] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tasksList1/${taskId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch task');
        }
        const data = await response.json();
        setTask(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleTaskDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/tasksList1/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: taskDescription }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      // Optionally, you can update the task state with the updated task data from the response

      // Reset the task description field
      setTaskDescription('');
    } catch (error) {
      console.error(error);
    }
  };

  if (!task) {
    return <p>Loading task...</p>;
  }

  return (
    <div>
      <h2>Task Details</h2>
      <h3>{task.title}</h3>
      <p>Status: {task.completed ? 'Completed' : 'Incomplete'}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Task Description:
          <textarea
            value={taskDescription}
            onChange={handleTaskDescriptionChange}
          />
        </label>
        <button type="submit">Save Description</button>
      </form>
    </div>
  );
};

export default TaskDetails;