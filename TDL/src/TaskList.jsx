import React from 'react';
import TaskItem from './TaskItem.jsx';
import TaskForm from './TaskForm.jsx';

const TaskList = ({ tasks, addTask, markTaskAsCompleted }) => {
  return (
    <div className="TaskList">
      <h2>Task List</h2>
      <TaskForm addTask={addTask} />
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            markTaskAsCompleted={markTaskAsCompleted}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;