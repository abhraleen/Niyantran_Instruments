import React from 'react';
import { Navbar, Footer } from '@/components/layout/shared';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Contact } from '@/components/sections/Contact';

export const Home = () => {
    return (
        <div className="bg-background min-h-screen">
            <Navbar />
            <main>
                <Hero />
                <About />
                <Services />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};
