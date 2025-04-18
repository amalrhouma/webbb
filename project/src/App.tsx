import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StandardRooms from './pages/StandardFloor';
import EconomicRooms from './pages/LuxuryFloor';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/standard-rooms" element={<StandardRooms />} />
      <Route path="/economic-rooms" element={<EconomicRooms />} />
    </Routes>
  );
}

export default App;