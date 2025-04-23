import React, { useState } from 'react';
import TaskItem from './TaskItem';

interface Task {
  id: string;
  title: string;
  description: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'A',
      description: 'qwe'
    },
    {
      id: '2',
      title: 'B',
      description: 'qweqwe'
    },
    {
      id: '3',
      title: 'C',
      description: 'qweqweqwe'
    }
  ]);

  const handleDelete = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEdit = (id: string, newTitle: string, newDescription: string) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, title: newTitle, description: newDescription }
        : task
    ));
  };

  return (
    <div className="task-list">
      <h2>Task List</h2>
      <div className="tasks-container">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList; 