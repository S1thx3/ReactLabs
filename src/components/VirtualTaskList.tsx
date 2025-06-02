import React, { useState, useRef, useEffect } from 'react';
import TaskItem from './TaskItem';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

interface VirtualTaskListProps {
  tasks: Task[];
  itemHeight?: number;
  visibleItems?: number;
}

const VirtualTaskList: React.FC<VirtualTaskListProps> = ({
  tasks,
  itemHeight = 200,
  visibleItems = 5
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalHeight = tasks.length * itemHeight;

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + visibleItems,
    tasks.length
  );

  const visibleTasks = tasks.slice(startIndex, endIndex);
  const offsetY = startIndex * itemHeight;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div 
      className="virtual-list-container"
      ref={containerRef}
      onScroll={handleScroll}
      style={{ height: `${visibleItems * itemHeight}px`, overflow: 'auto' }}
    >
      <div 
        className="virtual-list-inner"
        style={{ height: `${totalHeight}px`, position: 'relative' }}
      >
        <div 
          className="virtual-list-items"
          style={{ transform: `translateY(${offsetY}px)` }}
        >
          {visibleTasks.map(task => (
            <div 
              key={task.id}
              style={{ height: `${itemHeight}px` }}
              className="virtual-list-item"
            >
              <TaskItem
                id={task.id}
                title={task.title}
                description={task.description}
                priority={task.priority}
                onDelete={() => {}}
                onEdit={() => {}}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualTaskList; 