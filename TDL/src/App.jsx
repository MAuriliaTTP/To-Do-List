import React, { useState, useEffect } from 'react';
import TaskList from './TaskList.jsx';
import Modal from './Modal.jsx';
import './styles.css';

const App = () => {
  const [tasksList1, setTasksList1] = useState([]);
  const [tasksList2, setTasksList2] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    // Fetch data for List 1
    fetch('http://localhost:3000/tasksList1')
      .then((response) => response.json())
      .then((data) => setTasksList1(data));

    // Fetch data for List 2
    fetch('http://localhost:3000/tasksList2')
      .then((response) => response.json())
      .then((data) => setTasksList2(data));
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
    const newTask = { id: Date.now(), title: taskTitle, completed: false };

    if (selectedList === 'list1') {
      setTasksList1([...tasksList1, newTask]);
    } else if (selectedList === 'list2') {
      setTasksList2([...tasksList2, newTask]);
    }
  
    
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
    } else if (selectedList === 'list2') {
      fetch('http://localhost:3000/tasksList2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      })
        .then((response) => response.json())
        .then((data) => {
          setTasksList2([...tasksList2, data]);
          closeModal();
        });
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
    } else if (selectedList === 'list2') {
      const updatedTasks = tasksList2.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      );
      setTasksList2(updatedTasks);
    }
  };

  return (
    <div className="App">
      <h1>Task List</h1>
      <button className="add-button" onClick={() => openModal('list1')}>
        Add Task to List 1
      </button>
      <button className="add-button" onClick={() => openModal('list2')}>
        Add Task to List 2
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
      <h2>List 1</h2>
      <TaskList tasks={tasksList1} markTaskAsCompleted={markTaskAsCompleted} />
      <h2>List 2</h2>
      <TaskList tasks={tasksList2} markTaskAsCompleted={markTaskAsCompleted} />
    </div>
  );
};

export default App;