import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Leaderboard from './components/LeaderBoard';
import Type from './components/Type';
import Home from './components/Home';
import Stats from './components/Stats';
import AboutUsPage from './components/AboutUs';

function App() {
  return (
    <Router>
      <div className="App flex flex-col h-screen overflow-y-hidden">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          
          <Route path="/Leaderboard" element={<Leaderboard />} />
          <Route path="/Stats" element={<Stats />} />
          <Route path="/Type" element={<Type />} />
          <Route path="/About" element={<AboutUsPage />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
