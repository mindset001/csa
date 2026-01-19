import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ShieldCheck, Lock, MousePointer2, Image } from 'lucide-react';
import { MagnetButton } from '../UI/MagnetButton';
import Logo from '../../images/logo.png'

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      
      {/* Background Elements - Light & Airy */}
      <div className="absolute inset-0 z-0 bg-white">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-sky-100 rounded-full blur-[100px] opacity-80" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-light rounded-full blur-[100px] opacity-60" />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <motion.div 
          style={{ opacity }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-none border-l-4 border-brand-cyan bg-white/50 backdrop-blur-md mx-auto lg:mx-0 shadow-sm">
            <ShieldCheck size={16} className="text-brand-cyan" />
            <span className="text-sm font-bold tracking-widest text-slate-600 uppercase">Secure Your Future</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-none tracking-tight text-slate-900">
            Cyber Safety <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-dark">Alliance</span>
          </h1>
          
          <p className="text-2xl text-slate-600 font-light tracking-wide">
            Building a Safer Digital Future
          </p>
          
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
            <MagnetButton variant="primary" onClick={scrollToContact}>
              Contact Us <ArrowRight size={18} />
            </MagnetButton>
          </div>
        </motion.div>

        {/* Hero Visuals (Right Side) */}
        <div className="relative h-[600px] hidden lg:flex items-center justify-center perspective-1000">
           
           {/* Center Shield Logic - High Contrast for Light BG */}
           <motion.div 
             animate={{ rotateY: [0, 5, 0, -5, 0] }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             className="relative z-20 w-96 h-96"
           >
            
              <img src={Logo}/>
           </motion.div>

           {/* Orbiting Elements */}
           <motion.div 
             style={{ y: y2 }}
             className="absolute top-20 right-0 w-48 p-4 bg-white/80 border border-brand-cyan/20 backdrop-blur-md rounded-none clip-path-tech shadow-xl"
           >
             <div className="flex items-center gap-3 mb-2">
               <div className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse" />
               <span className="text-xs font-bold text-slate-600 uppercase">Active Protection</span>
             </div>
             <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
               <div className="h-full w-[98%] bg-brand-cyan" />
             </div>
           </motion.div>

        </div>

      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-brand-cyan flex flex-col items-center gap-2"
      >
        <MousePointer2 size={16} />
      </motion.div>

    </section>
  );
};