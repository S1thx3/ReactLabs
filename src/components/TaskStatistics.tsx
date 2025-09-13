import React from 'react';

interface TaskStatisticsProps {
  tasks: Array<{
    id: string;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    isCompleted: boolean;
  }>;
}

const TaskStatistics: React.FC<TaskStatisticsProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.isCompleted).length;
  const highPriorityTasks = tasks.filter(task => task.priority === 'high').length;
  const mediumPriorityTasks = tasks.filter(task => task.priority === 'medium').length;
  const lowPriorityTasks = tasks.filter(task => task.priority === 'low').length;

  const completionPercentage = (completedTasks / totalTasks) * 100;

  return (
    <div className="task-statistics">
      <h3>Task Statistics</h3>
      <div className="statistics-grid">
        <div className="stat-item">
          <h4>Total Tasks</h4>
          <p>{totalTasks}</p>
        </div>
        <div className="stat-item">
          <h4>Completed</h4>
          <p>{completedTasks} ({completionPercentage.toFixed(1)}%)</p>
        </div>
        <div className="stat-item">
          <h4>High Priority</h4>
          <p>{highPriorityTasks}</p>
        </div>
        <div className="stat-item">
          <h4>Medium Priority</h4>
          <p>{mediumPriorityTasks}</p>
        </div>
        <div className="stat-item">
          <h4>Low Priority</h4>
          <p>{lowPriorityTasks}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskStatistics; 