import React, { useState, useEffect } from 'react';
import TaskList from './TaskList.jsx';
import Modal from './Modal.jsx';
import './styles.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskDetails from './TaskDetails.jsx';

const App = () => {
  const [tasksList1, setTasksList1] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    // Fetch data for List 1
    fetch('http://localhost:3000/tasksList1')
      .then((response) => response.json())
      .then((data) => setTasksList1(data));
  }, []);

  const openModal = (list) => {
    setSelectedList(list);
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
    const newTask = { id: Date.now(), title: taskTitle, completed: false, description:'' };

    if (selectedList === 'list1') {
      setTasksList1([...tasksList1, newTask]);

    // Determine the selected list and update accordingly
    if (selectedList === 'list1') {
      fetch('http://localhost:3000/tasksList1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      })
        .then((response) => response.json())
        .then((data) => {
          setTasksList1([...tasksList1, data]);
          closeModal();
        });
    } 
    }
    closeModal();
  };

  const markTaskAsCompleted = (taskId) => {
    // Determine the selected list and update accordingly
    if (selectedList === 'list1') {
      const updatedTasks = tasksList1.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      );
      setTasksList1(updatedTasks);
    } 
  };

  return (
    <Router>
      <div className="App">
        <h1>Task List</h1>
        <button className="add-button" onClick={() => openModal('list1')}>
          Add Task
        </button>
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
        <h2>List</h2>
        <TaskList tasks={tasksList1} markTaskAsCompleted={markTaskAsCompleted} />
      </div>
      <Routes>
      <Route
        path="/"
        element={<TaskList tasks={tasksList1} markTaskAsCompleted={markTaskAsCompleted} />}
      />
      <Route path="/task/:taskId" element={<TaskDetails tasks={tasksList1} />} />
    </Routes>
    </Router>
  );
};

export default App;