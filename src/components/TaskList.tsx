import React, { useState } from 'react';
import TaskItem from './TaskItem';
import VirtualTaskList from './VirtualTaskList';
import LazyTaskStatistics from './LazyTaskStatistics';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  isCompleted: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Learn React',
      description: 'Study React fundamentals and hooks',
      priority: 'high',
      isCompleted: false
    },
    {
      id: '2',
      title: 'Build Project',
      description: 'Create a new React application',
      priority: 'medium',
      isCompleted: false
    },
    {
      id: '3',
      title: 'Deploy App',
      description: 'Deploy the application to production',
      priority: 'low',
      isCompleted: false
    }
  ]);

  const [viewMode, setViewMode] = useState<'normal' | 'virtual'>('normal');

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

  const handleComplete = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, isCompleted: !task.isCompleted }
        : task
    ));
  };

  return (
    <div className="task-list">
      <h2>Task List</h2>
      
      <div className="view-controls">
        <button 
          onClick={() => setViewMode('normal')}
          className={viewMode === 'normal' ? 'active' : ''}
        >
          Normal View
        </button>
        <button 
          onClick={() => setViewMode('virtual')}
          className={viewMode === 'virtual' ? 'active' : ''}
        >
          Virtual View
        </button>
      </div>

      {viewMode === 'normal' ? (
        <div className="tasks-container">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              priority={task.priority}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      ) : (
        <VirtualTaskList 
          tasks={tasks}
          itemHeight={200}
          visibleItems={5}
        />
      )}

      <LazyTaskStatistics tasks={tasks} />
    </div>
  );
};

export default TaskList; 