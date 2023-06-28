import React, { useState } from 'react';
import TaskList from './TaskList.jsx';
import Modal from './Modal.jsx';
import './styles.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
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
    closeModal();
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
      {!isModalOpen && (
        <button className="add-button" onClick={openModal}>
          Add Task
        </button>
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
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
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
          </form>
        </Modal>
      )}
      <TaskList tasks={tasks} markTaskAsCompleted={markTaskAsCompleted} />
    </div>
  );
};

export default App;