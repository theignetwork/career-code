import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import ResultsPage from './components/ResultsPage.jsx';

function AppWithRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/results/:careerCode" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default AppWithRouter;