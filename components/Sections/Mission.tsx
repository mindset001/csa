import React from 'react';
import { GlassCard } from '../UI/GlassCard';
import { Activity, Search, Zap, RotateCw } from 'lucide-react';
import { motion } from 'framer-motion';

const mantraSteps = [
  {
    icon: Activity,
    title: "Measure",
    text: "We start by running simulations, such as phishing exercises, to gauge your team’s current cybersecurity awareness and response to threats. These simulations deliver a clear baseline of your organization’s human risk profile."
  },
  {
    icon: Search,
    title: "Analyse",
    text: "Next, we dive into the data from these simulations to uncover patterns, vulnerabilities, and areas where your team might be exposed to cyber threats. This step pinpoints specific behaviors or knowledge gaps."
  },
  {
    icon: Zap,
    title: "Optimise",
    text: "Using these insights, we collaborate with you to refine your cybersecurity training and policies. This could mean delivering custom interactive workshops, updating protocols, or introducing new security tools."
  },
  {
    icon: RotateCw,
    title: "Repeat",
    text: "Cybersecurity isn’t a one-off task. We keep the cycle going—measuring, analyzing, and optimizing—to ensure your team stays ahead of evolving threats and builds lasting cybersecurity habits."
  }
];

export const Mission: React.FC = () => {
  return (
    <section className="relative py-24 bg-white text-center overflow-hidden">
      {/* Subtle Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h3 className="text-brand-cyan font-bold text-xl uppercase tracking-widest mb-2">Our Mission</h3>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">
            Everything We Do Is Driven By Our Mantra
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            At Cyber Safety Alliance, We believe the industry needs to move away from a reactive mindset and embrace a proactive, people-first approach. Our mission is to make cybersecurity something that is understood, lived, and practiced by everyone not just the IT team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mantraSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white border border-slate-100 hover:border-brand-cyan shadow-lg hover:shadow-2xl p-8 rounded-xl relative overflow-hidden transition-all duration-300"
            >
              <div className="absolute inset-0 bg-brand-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-brand-light/30 flex items-center justify-center mb-6 text-brand-dark group-hover:bg-brand-cyan group-hover:text-white transition-colors shadow-sm">
                  <step.icon size={32} />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-4">{step.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors">
                  {step.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};