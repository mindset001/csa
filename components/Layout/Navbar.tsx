import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavItem } from '../../types';
import { Logo } from '../UI/Logo';

const navItems: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'Methodology', href: '#methodology' },
  { label: 'What We Do', href: '#services' },
  { label: 'About Us', href: '#about' },
  { label: 'Why Us', href: '#why-us' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-4 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-4 group"
        >
           {/* Custom Tech Shield Logo */}
           <div className="relative w-12 h-14 flex-shrink-0 text-brand-cyan">
             <Logo className="w-full h-full drop-shadow-sm" />
           </div>
           
           <div className="flex flex-col justify-center">
             <span className="font-display font-bold text-xl leading-none text-slate-800 tracking-wider group-hover:text-brand-cyan transition-colors">CYBER SAFETY</span>
             <span className="font-display text-sm tracking-[0.1em] text-brand-cyan font-medium">Alliance</span>
           </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-medium text-slate-600 hover:text-brand-cyan transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-cyan transition-all group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="px-6 py-2 rounded-none border border-brand-cyan text-xs font-bold uppercase tracking-widest text-brand-cyan hover:bg-brand-cyan hover:text-white transition-all clip-path-slant"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-800 hover:text-brand-cyan transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed inset-0 bg-white/95 backdrop-blur-2xl z-40 flex flex-col items-center justify-center gap-8 border-t border-slate-200"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-2xl font-display font-bold text-slate-800 hover:text-brand-cyan transition-colors"
              >
                {item.label}
              </a>
            ))}
             <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="text-2xl font-display font-bold text-brand-cyan hover:text-brand-dark transition-colors"
            >
              Contact Us
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};