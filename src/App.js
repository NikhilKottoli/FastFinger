import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import NavBar from './components/NavBar';
import Leaderboard from './components/LeaderBoard';
import Type from './components/Type';
import Home from './components/Home';
import Stats from './components/Stats';
import AboutUsPage from './components/AboutUs';
import LoginPage from './components/Login'; // Renamed to match the route usage
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check localStorage to see if the user is logged in
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    return storedLoginStatus === 'true'; // Convert string back to boolean
  });

  // List of paths where the NavBar should not be displayed
  const noNavBarPaths = ['/'];

  useEffect(() => {
    // Update localStorage whenever the login state changes
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div className="App flex flex-col h-screen overflow-y-hidden">
      {/* Conditionally render NavBar based on the current path */}
      {!noNavBarPaths.includes(location.pathname) && <NavBar />}
      
      <Routes>
        <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/Home" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/Leaderboard" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Leaderboard />
          </ProtectedRoute>
        } />
        <Route path="/Stats" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Stats />
          </ProtectedRoute>
        } />
        <Route path="/Type" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Type />
          </ProtectedRoute>
        } />
        <Route path="/About" element={<AboutUsPage />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
