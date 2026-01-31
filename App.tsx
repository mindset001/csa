import React from 'react';
import { Navbar } from './components/Layout/Navbar';
import { Hero } from './components/Sections/Hero';
import { Methodology } from './components/Sections/Methodology';
import { About } from './components/Sections/About';
import { Services } from './components/Sections/Services';
import { WhyChooseUs } from './components/Sections/WhyChooseUs';
import { Team } from './components/Sections/Team';
import { Newsletter } from './components/Sections/Newsletter';
import { Contact } from './components/Sections/Contact';
import { Footer } from './components/Layout/Footer';

function App() {
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
}

export default App;