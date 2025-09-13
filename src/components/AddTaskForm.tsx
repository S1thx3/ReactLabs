import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  description: yup.string().required('Description is required').min(5, 'Description must be at least 5 characters'),
  priority: yup.string().oneOf(['high', 'medium', 'low']).required('Priority is required'),
  deadline: yup
    .string()
    .required('Deadline is required')
    .test('is-future', 'Deadline must be in the future', value => {
      if (!value) return false;
      const today = new Date();
      today.setHours(0,0,0,0);
      return new Date(value) >= today;
    }),
  email: yup.string().email('Invalid email').required('Email is required'),
  important: yup.boolean().required()
});

type AddTaskFormValues = {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  deadline: string;
  email: string;
  important: boolean;
};

const AddTaskForm: React.FC<{ onSubmitTask: (data: AddTaskFormValues) => void }> = ({ onSubmitTask }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AddTaskFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      priority: 'medium',
      important: false
    }
  });

  const onSubmit = (data: AddTaskFormValues) => {
    onSubmitTask(data);
    reset();
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title')} placeholder="Title" />
      {errors.title && <span className="form-error">{errors.title.message}</span>}

      <input {...register('description')} placeholder="Description" />
      {errors.description && <span className="form-error">{errors.description.message}</span>}

      <select {...register('priority')}>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      {errors.priority && <span className="form-error">{errors.priority.message}</span>}

      <input type="date" {...register('deadline')} />
      {errors.deadline && <span className="form-error">{errors.deadline.message}</span>}

      <input type="email" {...register('email')} placeholder="Responsible Email" />
      {errors.email && <span className="form-error">{errors.email.message}</span>}

      <label style={{display: 'flex', alignItems: 'center', gap: 8}}>
        <input type="checkbox" {...register('important')} /> Important
      </label>

      <button type="submit">Add Task (Advanced)</button>
    </form>
  );
};

export default AddTaskForm; 