// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import UserRegistration from './components/UserRegistration';
import UserSelection from './components/UserSelection';
import UserTasks from './components/UserTask';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<UserRegistration />} />
          <Route path="/select-user" element={<UserSelection />} />
          <Route path="/tasks" element={<UserTasks />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
