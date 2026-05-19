import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogIn } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AdminWelcomeScreen } from '../layout/AdminWelcomeScreen';

interface AdminLoginModalProps {
    open: boolean;
    onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ open, onClose }) => {
    const { login } = useAdminAuth();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [showWelcome, setShowWelcome] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        setTimeout(() => {
            if (login(email, password)) {
                setEmail('');
                setPassword('');
                setIsLoading(false);
                onClose();
                // Show admin welcome animation before navigating
                setShowWelcome(true);
            } else {
                setError('Invalid email or password');
                setIsLoading(false);
            }
        }, 600);
    };

    const handleWelcomeDone = () => {
        setShowWelcome(false);
        window.location.href = '/admin';
    };

    const handleClose = () => {
        setError('');
        setEmail('');
        setPassword('');
        onClose();
    };

    return (
        <>
            {/* Admin welcome animation — shown on every successful login */}
            <AnimatePresence>
                {showWelcome && (
                    <AdminWelcomeScreen key="admin-welcome" onComplete={handleWelcomeDone} />
                )}
            </AnimatePresence>

            <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[900]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={handleClose}
                    />

                    {/* Modal */}
                    <motion.div
                        key="modal"
                        className="fixed inset-0 z-[901] flex items-center justify-center p-4"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.92 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
                            {/* Header */}
                            <div className="relative px-8 pt-8 pb-6 bg-gradient-to-br from-blue-50 to-white border-b border-blue-100">
                                <button
                                    onClick={handleClose}
                                    className="absolute top-4 right-4 p-2 hover:bg-blue-100 rounded-lg transition-colors"
                                >
                                    <X className="h-5 w-5 text-slate-400" />
                                </button>

                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
                                        <LogIn className="h-6 w-6 text-white" />
                                    </div>
                                    <h2 className="text-xl font-heading font-black text-navy">Admin Access</h2>
                                </div>
                                <p className="text-sm text-slate-500">Enter your credentials to access the admin panel</p>
                            </div>

                            {/* Body */}
                            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                {/* Email field */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        disabled={isLoading}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </div>

                                {/* Password field */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        disabled={isLoading}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </div>

                                {/* Error message */}
                                <AnimatePresence>
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -4 }}
                                            className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 font-medium"
                                        >
                                            {error}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Login button */}
                                <button
                                    type="submit"
                                    disabled={isLoading || !email || !password}
                                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-lg flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Logging in...
                                        </>
                                    ) : (
                                        <>
                                            <LogIn className="h-4 w-4" />
                                            Login to Admin
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Footer hint */}
                            <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 text-center">
                                <p className="text-xs text-slate-400">
                                    Authorized access only • Contact support for access requests
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
            </AnimatePresence>
        </>
    );
};
