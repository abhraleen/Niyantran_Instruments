import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Home } from './pages/Home';
import { AdminDashboard } from './pages/Admin';
import { Dev } from './pages/Dev';
import { WelcomeScreen } from './components/layout/WelcomeScreen';

export default function App() {
  const [showWelcome, setShowWelcome] = React.useState(true);

  return (
    <Router>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen key="welcome" onComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>
      <Routes>
        <Route path="/" element={<Dev />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

