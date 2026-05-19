import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Home } from './pages/Home';
import { AdminDashboard } from './pages/Admin';
import { Dev } from './pages/Dev';
import { WelcomeScreen } from './components/layout/WelcomeScreen';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { AdminLoginModal } from './components/modals/AdminLoginModal';

// Protected route component
const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
    const { isAuthenticated } = useAdminAuth();
    if (!isAuthenticated) return <Navigate to="/" replace />;
    return element;
};

function AppContent() {
    const [showWelcome, setShowWelcome] = React.useState(true);
    const [loginModalOpen, setLoginModalOpen] = React.useState(false);
    const { isAuthenticated } = useAdminAuth();
    const location = useLocation();

    // Skip main welcome screen if admin is already authenticated
    const shouldShowWelcome = showWelcome && !isAuthenticated;

    return (
        <>
            <AnimatePresence mode="wait">
                {shouldShowWelcome && (
                    <WelcomeScreen key="welcome" onComplete={() => setShowWelcome(false)} />
                )}
            </AnimatePresence>
            
            <AdminLoginModal open={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
            
            <Routes>
                <Route path="/" element={<Dev onLoginClick={() => setLoginModalOpen(true)} />} />
                <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} />} />
                <Route path="/home" element={<Home onLoginClick={() => setLoginModalOpen(true)} />} />
            </Routes>
        </>
    );
}

export default function App() {
    return (
        <Router>
            <AdminAuthProvider>
                <AppContent />
            </AdminAuthProvider>
        </Router>
    );
}

