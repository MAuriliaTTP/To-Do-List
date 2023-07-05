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
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedList, setSelectedList] = useState(null);
  const [editingTask, setEditingTask] = useState(null); // New state variable for the task being edited

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
    setTaskDescription('');
  };

  const handleTaskTitleChange = (event) => {
    setTaskTitle(event.target.value);
  };

  
  const addTask = (event) => {
    event.preventDefault();
    if (taskTitle.trim() === '') {
      return;
    }
    const newTask = { id: Date.now(), title: taskTitle, completed: false, description: taskDescription };

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
        })
        .catch((error) => {
          console.error('Error adding task:', error);
        });
    }

    closeModal();
  };

  const updateTask = (taskId, updatedTaskData) => {
    // Send a PATCH request to update the task on the server
    console.log('Clicked');
    fetch(`http://localhost:3000/tasksList1/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTaskData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the task in the local state
        const updatedTasks = tasksList1.map((task) => {
          if (task.id === taskId) {
            // Merge the updated data into the existing task object
            return { ...task, ...data };
          }
          return task;
        });
        setTasksList1(updatedTasks);
        setEditingTask(null); // Clear the editingTask state after updating the task
      })
      .catch((error) => {
        console.error('Error updating task:', error);
      });
  };

  const deleteTask = (taskId) => {
    // Remove the task from tasksList1 state and send a DELETE request to delete the task on the server
    const updatedTasks = tasksList1.filter((task) => task.id !== taskId);

    setTasksList1(updatedTasks);

    fetch(`http://localhost:3000/tasksList1/${taskId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Handle the response if needed
        } else {
          throw new Error('Error deleting task');
        }
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
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

  const handleEditClick = (task) => {
    console.log('Clicked');
    setEditingTask(task);
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
        <TaskList
          tasks={tasksList1}
          markTaskAsCompleted={markTaskAsCompleted}
          updateTask={updateTask}
          deleteTask={deleteTask}
          handleEditClick={handleEditClick}
        />
      </div>
      <Routes>
        <Route
          path="/"
          element={<h1>Welcome to Task List App</h1>}
        />
        <Route
          path="/task/:taskId"
          element={<TaskDetails tasks={tasksList1} updateTask={updateTask} deleteTask={deleteTask} />}
        />
      </Routes>
    </Router>
  );
};

export default App;