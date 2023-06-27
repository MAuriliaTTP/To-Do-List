import React, { useState } from 'react';
import TaskList from './TaskList.jsx';
import './styles.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');

  const openForm = () => {
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setTaskTitle('');
  };

  const handleTaskTitleChange = (event) => {
    setTaskTitle(event.target.value);
  };

  const addTask = (event) => {
    event.preventDefault();
    if (taskTitle.trim() === '') {
      return;
    }
    const newTask = { id: Date.now(), title: taskTitle, completed: false };
    setTasks([...tasks, newTask]);
    setFormOpen(false);
    setTaskTitle('');
  };

  const markTaskAsCompleted = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>Task List</h1>
      {!isFormOpen && (
        <button className="add-button" onClick={openForm}>
          Add Task
        </button>
      )}
      {isFormOpen && (
        <form onSubmit={addTask} className="form">
          <label>
            Enter task title:
            <input
              type="text"
              name="title"
              value={taskTitle}
              onChange={handleTaskTitleChange}
            />
          </label>
          <button type="submit">Add</button>
          <button type="button" onClick={closeForm}>
            Cancel
          </button>
        </form>
      )}
      <TaskList tasks={tasks} markTaskAsCompleted={markTaskAsCompleted} />
    </div>
  );
};

export default App;