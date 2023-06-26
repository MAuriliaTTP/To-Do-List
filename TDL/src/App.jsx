import React from 'react';

const App = () => {
  return (
    <div className="App">
      <TaskList />
    </div>
  );
};

const TaskList = () => {
  const tasks = [
    { id: 1, title: 'Task 1' },
    { id: 2, title: 'Task 2' },
    { id: 3, title: 'Task 3' },
  ];

  return (
    <div>
      <h2>To Do List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;