import React, { useRef } from 'react';
import TaskItem from './TaskItem';
import VirtualTaskList from './VirtualTaskList';
import LazyTaskStatistics from './LazyTaskStatistics';
import { useTasks, Task } from '../hooks/useTasks';

const TaskList: React.FC = () => {
  const { tasks, addTask, deleteTask, editTask, toggleComplete } = useTasks();
  const [viewMode, setViewMode] = React.useState<'normal' | 'virtual'>('normal');

  // useRef для автофокусу на полі вводу
  const titleRef = useRef<HTMLInputElement>(null);

  // Стейт для форми додавання задачі
  const [newTitle, setNewTitle] = React.useState('');
  const [newDescription, setNewDescription] = React.useState('');
  const [newPriority, setNewPriority] = React.useState<'high' | 'medium' | 'low'>('medium');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addTask({
      title: newTitle,
      description: newDescription,
      priority: newPriority,
      isCompleted: false
    });
    setNewTitle('');
    setNewDescription('');
    setNewPriority('medium');
    // Автофокус після додавання
    titleRef.current?.focus();
  };

  return (
    <div className="task-list">
      <h2>Task List</h2>

      {/* Форма додавання задачі */}
      <form className="add-task-form" onSubmit={handleAddTask} style={{marginBottom: 24}}>
        <input
          ref={titleRef}
          type="text"
          placeholder="Task title"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newDescription}
          onChange={e => setNewDescription(e.target.value)}
        />
        <select
          value={newPriority}
          onChange={e => setNewPriority(e.target.value as 'high' | 'medium' | 'low')}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button type="submit">Add Task</button>
      </form>

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
              isCompleted={task.isCompleted}
              onDelete={deleteTask}
              onEdit={editTask}
              onComplete={toggleComplete}
            />
          ))}
        </div>
      ) : (
        <VirtualTaskList 
          tasks={tasks}
          itemHeight={200}
          visibleItems={5}
          onComplete={toggleComplete}
        />
      )}

      <LazyTaskStatistics tasks={tasks} />
    </div>
  );
};

export default TaskList; 