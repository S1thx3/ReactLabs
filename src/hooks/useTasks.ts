import { useState, useEffect } from 'react';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  isCompleted: boolean;
}

const TASKS_KEY = 'tasks_data';

function getInitialTasks(): Task[] {
  const data = localStorage.getItem(TASKS_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
  // Демо-дані, якщо localStorage порожній
  return [
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
  ];
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(getInitialTasks());

  // Зберігаємо задачі у localStorage при зміні
  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, 'id'>) => {
    setTasks(prev => [
      ...prev,
      { ...task, id: Date.now().toString() }
    ]);
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const editTask = (id: string, newTitle: string, newDescription: string) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, title: newTitle, description: newDescription } : task
    ));
  };

  const toggleComplete = (id: string) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  };

  return { tasks, addTask, deleteTask, editTask, toggleComplete };
} 