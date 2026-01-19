import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagnetButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const MagnetButton: React.FC<MagnetButtonProps> = ({ 
  children, 
  onClick, 
  className = "",
  variant = 'primary'
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.15, y: y * 0.15 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "relative px-8 py-4 rounded-full font-bold uppercase tracking-wider transition-colors duration-300 overflow-hidden group shadow-lg";
  
  const variants = {
    primary: "bg-brand-dark text-white hover:text-white border border-transparent hover:shadow-xl",
    secondary: "bg-white border border-slate-200 text-slate-800 hover:border-brand-cyan hover:text-brand-dark backdrop-blur-sm",
    outline: "border border-brand-cyan text-brand-cyan hover:bg-brand-cyan hover:text-white"
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {/* Background Fill Animation for Primary */}
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-brand-cyan translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
      )}
       {/* Background Fill Animation for Secondary */}
       {variant === 'secondary' && (
        <span className="absolute inset-0 bg-brand-light/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
      )}

      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};