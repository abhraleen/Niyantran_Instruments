import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar, Footer } from '@/components/layout/shared';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Contact } from '@/components/sections/Contact';
import { WelcomeScreen } from '@/components/layout/WelcomeScreen';

export const Home: React.FC<{ onLoginClick?: () => void }> = ({ onLoginClick }) => {
    const [showWelcome, setShowWelcome] = React.useState(true);

    const handleComplete = React.useCallback(() => {
        setShowWelcome(false);
    }, []);

    return (
        <>
            <AnimatePresence>
                {showWelcome && (
                    <WelcomeScreen key="welcome" onComplete={handleComplete} />
                )}
            </AnimatePresence>

            <div className="bg-background min-h-screen">
                <Navbar />
                <main>
                    <Hero />
                    <About />
                    <Services />
                    <Contact />
                </main>
                <Footer onLoginClick={onLoginClick} />
            </div>
        </>
    );
};
