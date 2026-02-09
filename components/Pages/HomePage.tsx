import React from 'react';
import { Navbar } from '../Layout/Navbar';
import { Hero } from '../Sections/Hero';
import { Methodology } from '../Sections/Methodology';
import { About } from '../Sections/About';
import { Services } from '../Sections/Services';
import { WhyChooseUs } from '../Sections/WhyChooseUs';
import { Team } from '../Sections/Team';
import { Newsletter } from '../Sections/Newsletter';
import { Contact } from '../Sections/Contact';
import { Footer } from '../Layout/Footer';

export const HomePage: React.FC = () => {
  return (
    <main className="bg-[#0d2535] text-white min-h-screen selection:bg-brand-cyan selection:text-brand-darkest">
      <Navbar />
      <Hero />
      <Methodology />
      <Services />
      <About />
      <Team />
      <WhyChooseUs />
      <Newsletter />
      <Contact />
      <Footer />
    </main>
  );
};
