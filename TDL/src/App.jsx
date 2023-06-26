import React, { useState } from 'react';
import TaskList from './TaskList.jsx';
import './styles.css';

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: false },
    { id: 3, title: 'Task 3', completed: false },
  ]);

  const addTask = (title) => {
    const newTask = { id: Date.now(), title, completed: false };
    setTasks([...tasks, newTask]);
  };

  const markTaskAsCompleted = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <TaskList
        tasks={tasks}
        addTask={addTask}
        markTaskAsCompleted={markTaskAsCompleted}
      />
    </div>
  );
};

export default App;