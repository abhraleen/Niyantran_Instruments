import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { AdminDashboard } from './pages/Admin';
import { Dev } from './pages/Dev';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/dev" element={<Dev />} />
      </Routes>
    </Router>
  );
}

