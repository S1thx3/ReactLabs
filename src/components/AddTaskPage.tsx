import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddTaskForm from './AddTaskForm';
import { useTasks } from '../hooks/useTasks';

const AddTaskPage: React.FC = () => {
  const { addTask } = useTasks();
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    addTask({
      title: data.title,
      description: data.description + (data.important ? ' (Important)' : ''),
      priority: data.priority,
      isCompleted: false
    });
    navigate('/');
  };

  return (
    <div className="add-task-page">
      <h2 style={{marginBottom: 24}}>Add New Task (Advanced)</h2>
      <AddTaskForm onSubmitTask={handleSubmit} />
      <button className="back-btn" onClick={() => navigate('/')}>Back to Main</button>
    </div>
  );
};

export default AddTaskPage; 