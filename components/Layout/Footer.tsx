import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-brand-dark/30 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-12 text-brand-cyan">
                     <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                        {/* Shield Outline */}
                        <path d="M50 5 L 90 20 V 45 C 90 70 70 88 50 95 C 30 88 10 70 10 45 V 20 L 50 5 Z" />
                        
                        {/* Circuit Nodes */}
                        <circle cx="10" cy="20" r="4" fill="currentColor" stroke="none" />
                        <circle cx="90" cy="20" r="4" fill="currentColor" stroke="none" />
                        <circle cx="10" cy="55" r="4" fill="currentColor" stroke="none" />
                        <circle cx="90" cy="55" r="4" fill="currentColor" stroke="none" />
                        <circle cx="50" cy="95" r="3" fill="currentColor" stroke="none" />

                        {/* Globe */}
                        <circle cx="50" cy="50" r="24" strokeWidth="3" />
                        <path d="M50 26 V 74" strokeWidth="2" />
                        <path d="M26 50 H 74" strokeWidth="2" />

                        {/* Lock Overlay */}
                        <path d="M40 50 V 42 A 10 10 0 0 1 60 42 V 50" strokeWidth="4" />
                        <rect x="36" y="50" width="28" height="20" rx="4" fill="#000000" strokeWidth="4" />
                        <circle cx="50" cy="60" r="3" fill="currentColor" stroke="none" />
                        <path d="M50 60 V 66" strokeWidth="3" />
                     </svg>
                </div>
                <div className="flex flex-col">
                     <span className="font-display font-bold text-xl leading-none text-white tracking-wider">CYBER SAFETY</span>
                     <span className="font-display text-sm tracking-[0.1em] text-brand-light font-medium">Alliance</span>
                </div>
            </div>
          </div>
          
          <div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Cyber Safety Alliance (CSA) is a Human Risk Management (HRM) and Cyber Awareness Training Firm that specializes in interactive cybersecurity education, behavioral risk mitigation, and compliance-driven training for individuals and organizations.
            </p>
          </div>
        </div>
        
        <div className="border-t border-brand-dark/30 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2025 cyber safety alliance. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <div className="flex gap-4">
              {[Twitter, Linkedin, Mail].map((Icon, idx) => (
                <a key={idx} href="#" className="text-gray-500 hover:text-brand-cyan transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};