import React, { useState } from 'react';
import TaskActions from './TaskActions';

interface TaskItemProps {
  id: string;
  title: string;
  description: string;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string, newDescription: string) => void;
  priority?: 'high' | 'medium' | 'low';
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  description,
  onDelete,
  onEdit,
  priority = 'medium'
}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [showDetails, setShowDetails] = useState(false);

  const handleComplete = () => {
    setIsCompleted(!isCompleted);
  };

  const handleEdit = () => {
    if (isEditing) {
      onEdit(id, editedTitle, editedDescription);
    }
    setIsEditing(!isEditing);
  };

  if (isCompleted && priority === 'low') {
    return null;
  }

  const getPriorityColor = () => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'gray';
    }
  };

  return (
    <div className={`task-item ${isCompleted ? 'completed' : ''}`}>
      <div className="task-header">
        <h3>{title}</h3>
        <span 
          className="priority-indicator" 
          style={{ backgroundColor: getPriorityColor() }}
          title={`Priority: ${priority}`}
        />
      </div>
      
      {showDetails && (
        <div className="task-details">
          <p>{description}</p>
          <div className="task-meta">
            <span>Priority: {priority}</span>
            <span>Status: {isCompleted ? 'Completed' : 'In Progress'}</span>
          </div>
        </div>
      )}

      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="edit-input"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="edit-textarea"
          />
        </div>
      ) : (
        <div className="task-content">
          <button 
            className="toggle-details"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
        </div>
      )}
      
      <TaskActions
        taskId={id}
        onEdit={handleEdit}
        onDelete={onDelete}
        onComplete={handleComplete}
        isCompleted={isCompleted}
      />
    </div>
  );
};

export default TaskItem; 