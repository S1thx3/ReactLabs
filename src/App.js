import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import AddTaskPage from './components/AddTaskPage';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <ThemeToggle />
          <header className="App-header">
            <h1>Task Manager</h1>
          </header>
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add" element={<AddTaskPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 