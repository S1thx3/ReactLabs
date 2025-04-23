import React, { useState } from 'react';
import TaskActions from './TaskActions';

interface TaskItemProps {
  id: string;
  title: string;
  description: string;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string, newDescription: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  description,
  onDelete,
  onEdit
}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleComplete = () => {
    setIsCompleted(!isCompleted);
  };

  const handleEdit = () => {
    if (isEditing) {
      onEdit(id, editedTitle, editedDescription);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className={`task-item ${isCompleted ? 'completed' : ''}`}>
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
          <h3>{title}</h3>
          <p>{description}</p>
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