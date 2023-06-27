import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, markTaskAsCompleted }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          markTaskAsCompleted={markTaskAsCompleted}
        />
      ))}
    </ul>
  );
};

export default TaskList;