import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MonitorSmartphone, FileCheck, Users, GraduationCap, ArrowUpRight, Check, ChevronRight } from 'lucide-react';
import { ServiceItem } from '../../types';

// Enhanced Service Data with Features
interface ExtendedServiceItem extends ServiceItem {
  features: string[];
}

const services: ExtendedServiceItem[] = [
  { 
    id: 1, 
    title: 'Human Risk Management Platform', 
    description: 'Through our integrated platform, we offer a full suite of tools to manage and reduce human-related cyber risks. We move beyond simple awareness to actionable risk reduction.', 
    icon: MonitorSmartphone,
    features: ["Phishing simulations", "Automated training & awareness campaigns", "Real-time threat reporting plugins", "Behavioral risk scoring", "Incident response workflows", "Detailed analytics and benchmarking"]
  },
  { 
    id: 2, 
    title: 'Cyber Policy Review', 
    description: 'We analyze and refine your cybersecurity policies to ensure they are robust, compliant, and practical for your workforce. We bridge the gap between technical requirements and human behavior.', 
    icon: FileCheck,
    features: ["Gap Analysis", "Compliance Mapping (ISO/GDPR)", "Plain English Rewrite", "Policy Adoption Metrics", "Stakeholder Workshops", "Regular Review Cycles"]
  },
  { 
    id: 3, 
    title: 'Tabletop Exercises', 
    description: 'In-a-Box Simulations designed to test your incident response plans in a safe environment. We simulate real-world cyber attack scenarios to prepare your leadership and technical teams.', 
    icon: Users,
    features: ["Ransomware Scenarios", "Incident Response Testing", "Executive Decision Making", "Post-Mortem Analysis", "Communication Playbooks", "Crisis Management Drills"]
  },
  { 
    id: 4, 
    title: 'Cybersecurity Training', 
    description: 'Engaging virtual and in-person training sessions that go beyond compliance tick-boxes. We focus on real-world scenarios that empower your staff to recognize and neutralize threats.', 
    icon: GraduationCap,
    features: ["Gamified Learning Modules", "Role-Based Training", "Micro-Learning Series", "Interactive Workshops", "Phishing Remediation", "Executive Briefings"]
  },
];

export const Services: React.FC = () => {
  const [activeId, setActiveId] = useState<number>(1);
  const activeService = services.find(s => s.id === activeId) || services[0];

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
       {/* Ambient Background Glow */}
       <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-50 rounded-full blur-[100px] opacity-60 pointer-events-none" />
       
       <div className="container mx-auto px-6 relative z-10">
          
          <div className="mb-16">
             <h3 className="text-brand-cyan font-bold text-lg uppercase tracking-widest mb-2">Capabilities</h3>
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
               <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 leading-tight">
                 What We Do
               </h2>
               <p className="text-slate-500 max-w-md text-lg">
                  At CSAlliance, we help organizations reduce cybersecurity risks by focusing on the human element.
               </p>
             </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
             
             {/* Left Column: Navigation List */}
             <div className="lg:col-span-5 flex flex-col">
                {services.map((service) => (
                   <button
                      key={service.id}
                      onClick={() => setActiveId(service.id)}
                      className={`group relative text-left py-6 px-2 transition-all duration-300 border-b ${
                         activeId === service.id 
                            ? 'border-brand-dark' 
                            : 'border-slate-200 hover:border-slate-300'
                      }`}
                   >
                      <div className="flex items-center justify-between">
                         <span className={`text-xl md:text-2xl font-display font-bold transition-colors duration-300 ${
                            activeId === service.id ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'
                         }`}>
                            {service.title}
                         </span>
                         {/* Animated Arrow for Active State */}
                         <div className="w-8">
                            {activeId === service.id && (
                               <motion.div layoutId="activeArrow" transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                                  <ChevronRight className="text-brand-cyan" size={24} />
                               </motion.div>
                            )}
                         </div>
                      </div>
                      
                      {/* Animated Progress Line for Active State */}
                      {activeId === service.id && (
                         <motion.div 
                            layoutId="activeLine"
                            className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-brand-dark"
                         />
                      )}
                   </button>
                ))}
             </div>

             {/* Right Column: Detail Card */}
             <div className="lg:col-span-7">
                <AnimatePresence mode='wait'>
                   <motion.div
                      key={activeService.id}
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden min-h-[500px] flex flex-col"
                   >
                      {/* Decorative Background Icon */}
                      <div className="absolute top-0 right-0 p-8 opacity-5 text-slate-900 pointer-events-none transform translate-x-10 -translate-y-10">
                         <activeService.icon size={300} strokeWidth={0.5} />
                      </div>

                      <div className="relative z-10">
                         <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-cyan">
                               <activeService.icon size={28} />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
                               {activeService.title}
                               <ArrowUpRight size={20} className="text-slate-400" />
                            </h3>
                         </div>

                         <p className="text-lg text-slate-600 leading-relaxed mb-8">
                            {activeService.description}
                         </p>

                         <div className="h-px w-full bg-slate-200 mb-8" />

                         <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Key Features</h4>
                         
                         <div className="space-y-4">
                            {activeService.features.map((feature, idx) => (
                               <motion.div 
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 + 0.2 }}
                                  className="flex items-start gap-3"
                               >
                                  <div className="mt-1 w-5 h-5 rounded-full bg-brand-cyan/10 flex items-center justify-center flex-shrink-0">
                                     <Check size={12} className="text-brand-cyan" />
                                  </div>
                                  <span className="text-slate-700 font-medium leading-relaxed">{feature}</span>
                               </motion.div>
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