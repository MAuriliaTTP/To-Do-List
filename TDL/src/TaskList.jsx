import React from 'react';
import TaskItem from './TaskItem';
import { Link } from 'react-router-dom';

const TaskList = ({ tasks, markTaskAsCompleted, deleteTask, updateTask }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Link to={`/task/${task.id}`}>{task.title}</Link>
          <button onClick={() => markTaskAsCompleted(task.id)}>Mark as Completed</button>
          <button onClick={() => updateTask(task.id)}>Edit</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;