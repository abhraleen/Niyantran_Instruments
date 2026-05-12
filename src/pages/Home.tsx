import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar, Footer } from '@/components/layout/shared';
import { WelcomeScreen } from '@/components/layout/WelcomeScreen';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { Workflow } from '@/components/sections/Workflow';
import { Contact } from '@/components/sections/Contact';
import { DashboardPreview } from '@/components/sections/DashboardPreview';

export const Home = () => {
    const [showWelcome, setShowWelcome] = React.useState(true);

    return (
        <div className="bg-background min-h-screen selection:bg-primary/10 selection:text-primary">
            <AnimatePresence>
                {showWelcome && (
                    <WelcomeScreen onComplete={() => setShowWelcome(false)} />
                )}
            </AnimatePresence>

            {!showWelcome && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <Navbar />
                    <main>
                        <Hero />
                        <About />
                        <Services />
                        <WhyChooseUs />
                        <DashboardPreview />
                        <Workflow />
                        <Contact />
                    </main>
                    <Footer />
                </motion.div>
            )}
        </div>
    );
};
