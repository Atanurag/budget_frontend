// File: src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import DiscoveryPage from './pages/DiscoveryPage';
import CollectionPage from './pages/CollectionPage';

export default function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4 space-x-4">
          <NavLink to="/" className={({ isActive }) => isActive ? 'font-bold' : ''}>Discovery</NavLink>
          <NavLink to="/collection" className={({ isActive }) => isActive ? 'font-bold' : ''}>My Collection</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<DiscoveryPage />} />
          <Route path="/collection" element={<CollectionPage />} />
        </Routes>
      </div>
    </Router>
  );
}
