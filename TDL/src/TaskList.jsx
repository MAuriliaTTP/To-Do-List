import React from 'react';
import TaskItem from './TaskItem';
import { Link } from 'react-router-dom';

const TaskList = ({ tasks, markTaskAsCompleted }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Link to={`/task/${task.id}`}>{task.title}</Link>
          {console.log(task.id)}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;