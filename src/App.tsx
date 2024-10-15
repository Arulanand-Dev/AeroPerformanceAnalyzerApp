// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DefaultConditionFetcher from './components/DefaultConditionFetcher';
import StoreTelemetryData from './components/StoreTelemetryData';
import Dashboard from './components/dashboard/Dashboard';


const App: React.FC = () => {
  return (
    <Router>
      <div className="container mx-auto">
        <nav className="flex justify-between items-center bg-blue-500 p-4">
          <h1 className="text-white text-2xl">Aero Performance</h1>
          <ul className="flex gap-4">
            <li>
              <Link to="/" className="text-white hover:text-gray-200">Upload</Link>
            </li>
            <li>
              <Link to="/dashboard" className="text-white hover:text-gray-200">Dashboard</Link>
            </li>
            <li>
              <Link to="/default-conditions" className="text-white hover:text-gray-200">DefaultCondition</Link>
            </li>
          </ul>
        </nav>

        <div className="mt-8">
          <Routes>
            <Route path="/" element={<StoreTelemetryData />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/default-conditions" element={<DefaultConditionFetcher />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
