import React from 'react';

interface TaskActionsProps {
  taskId: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
  isCompleted: boolean;
}

const TaskActions: React.FC<TaskActionsProps> = ({
  taskId,
  onEdit,
  onDelete,
  onComplete,
  isCompleted
}) => {
  return (
    <div className="task-actions">
      <button
        onClick={() => onEdit(taskId)}
        className="action-button edit-button"
        title="Редагувати"
      >
        ✏️
      </button>
      <button
        onClick={() => onDelete(taskId)}
        className="action-button delete-button"
        title="Видалити"
      >
        🗑️
      </button>
      <button
        onClick={() => onComplete(taskId)}
        className={`action-button complete-button ${isCompleted ? 'completed' : ''}`}
        title={isCompleted ? "Виконано" : "Не виконано"}
      >
        {isCompleted ? '✅' : '☐'}
      </button>
    </div>
  );
};

export default TaskActions; 