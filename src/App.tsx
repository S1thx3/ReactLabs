import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import AddTaskPage from './components/AddTaskPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
          <h1>Task Management </h1>
      </header>
        <main>
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add-task" element={<AddTaskPage />} />
          </Routes>
        </main>
    </div>
    </BrowserRouter>
  );
}

export default App;
