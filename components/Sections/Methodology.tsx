import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Search, Zap, RotateCw, ChevronRight, Check } from 'lucide-react';

const steps = [
  {
    id: 0,
    title: "Measure",
    subtitle: "Establish a Baseline",
    icon: Activity,
    color: "text-blue-500",
    bg: "bg-blue-500",
    lightBg: "bg-blue-50",
    description: "We start by running simulations, such as phishing exercises, to gauge your team’s current cybersecurity awareness. These simulations deliver a clear baseline of your organization’s human risk profile.",
    details: ["Phishing Simulations", "Risk Assessment", "Baseline Reporting"]
  },
  {
    id: 1,
    title: "Analyse",
    subtitle: "Identify Vulnerabilities",
    icon: Search,
    color: "text-indigo-500",
    bg: "bg-indigo-500",
    lightBg: "bg-indigo-50",
    description: "Next, we dive into the data to uncover patterns and areas where your team might be exposed. This step pinpoints specific behaviors or knowledge gaps, ensuring our recommendations are precise.",
    details: ["Behavioral Analysis", "Gap Identification", "Data-Driven Insights"]
  },
  {
    id: 2,
    title: "Optimise",
    subtitle: "Strengthen Defenses",
    icon: Zap,
    color: "text-sky-500",
    bg: "bg-sky-500",
    lightBg: "bg-sky-50",
    description: "Using these insights, we refine your cybersecurity training and policies. This could mean delivering custom workshops, updating protocols, or introducing new security tools.",
    details: ["Custom Workshops", "Policy Updates", "Targeted Training"]
  },
  {
    id: 3,
    title: "Repeat",
    subtitle: "Continuous Improvement",
    icon: RotateCw,
    color: "text-teal-500",
    bg: "bg-teal-500",
    lightBg: "bg-teal-50",
    description: "Cybersecurity isn’t a one-off task. We keep the cycle going—measuring, analyzing, and optimizing—to ensure your team stays ahead of evolving threats and builds lasting habits.",
    details: ["Ongoing Monitoring", "Adaptive Strategy", "Long-term Resilience"]
  }
];

export const Methodology: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-rotate through steps if user hasn't interacted
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setAutoPlay(false);
  };

  return (
    <section id="methodology" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-slate-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-brand-light/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h3 className="text-brand-cyan font-bold text-lg uppercase tracking-widest mb-2">Our Methodology</h3>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900">
            The Cycle of Continuous Defense
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Navigation */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => handleStepClick(index)}
                className={`group relative p-6 rounded-2xl text-left transition-all duration-300 border ${
                  activeStep === index 
                    ? 'bg-white border-brand-cyan shadow-lg scale-105 z-10' 
                    : 'bg-white/50 border-slate-100 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      activeStep === index ? step.lightBg : 'bg-slate-100'
                    }`}>
                      <step.icon size={20} className={activeStep === index ? step.color : 'text-slate-400'} />
                    </div>
                    <div>
                      <h4 className={`font-bold transition-colors ${activeStep === index ? 'text-slate-900' : 'text-slate-500'}`}>
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{step.subtitle}</p>
                    </div>
                  </div>
                  {activeStep === index && (
                    <motion.div layoutId="active-indicator">
                       <ChevronRight size={20} className="text-brand-cyan" />
                    </motion.div>
                  )}
                </div>
                
                {/* Progress Bar for Active Step (only during autoplay) */}
                {activeStep === index && autoPlay && (
                   <motion.div 
                     initial={{ width: "0%" }}
                     animate={{ width: "100%" }}
                     transition={{ duration: 5, ease: "linear" }}
                     className="absolute bottom-0 left-0 h-1 bg-brand-cyan/20"
                   >
                     <div className="h-full bg-brand-cyan w-full" />
                   </motion.div>
                )}
              </button>
            ))}
          </div>

          {/* Right Content Area */}
          <div className="w-full lg:w-2/3 min-h-[500px] relative">
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-2xl h-full flex flex-col justify-center relative overflow-hidden"
              >
                 {/* Decorative Big Icon */}
                 <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
                    {React.createElement(steps[activeStep].icon, { size: 400, className: "text-slate-900" })}
                 </div>

                 <div className="relative z-10">
                   <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${steps[activeStep].lightBg}`}>
                      <span className={`font-bold uppercase tracking-wider text-sm ${steps[activeStep].color}`}>Step 0{activeStep + 1}</span>
                   </div>
                   
                   <h3 className="text-4xl font-display font-bold text-slate-900 mb-6">
                     {steps[activeStep].title}: <span className="text-slate-500">{steps[activeStep].subtitle}</span>
                   </h3>
                   
                   <p className="text-lg text-slate-600 leading-relaxed mb-8">
                     {steps[activeStep].description}
                   </p>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-100 pt-8">
                      {steps[activeStep].details.map((detail, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${steps[activeStep].bg}`}>
                            <Check size={14} className="text-white" />
                          </div>
                          <span className="font-medium text-slate-700">{detail}</span>
                        </div>
                      ))}
                   </div>
                 </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};