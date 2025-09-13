import React, { Suspense } from 'react';

// Імітація важкого компонента, який завантажується тільки коли потрібен
const TaskStatistics = React.lazy(() => import('./TaskStatistics'));

interface LazyTaskStatisticsProps {
  tasks: Array<{
    id: string;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    isCompleted: boolean;
  }>;
}

const LazyTaskStatistics: React.FC<LazyTaskStatisticsProps> = ({ tasks }) => {
  const [showStatistics, setShowStatistics] = React.useState(false);

  return (
    <div className="lazy-statistics">
      <button 
        onClick={() => setShowStatistics(!showStatistics)}
        className="toggle-statistics"
      >
        {showStatistics ? 'Hide Statistics' : 'Show Statistics'}
      </button>

      {showStatistics && (
        <Suspense fallback={<div>Loading statistics...</div>}>
          <TaskStatistics tasks={tasks} />
        </Suspense>
      )}
    </div>
  );
};

export default LazyTaskStatistics; 