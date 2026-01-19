import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, ShieldCheck, TrendingDown, CheckCircle2 } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const cards = [
    {
      icon: UserCheck,
      title: "Human-Centric",
      description: "We address the root cause of 90% of breaches: human error. We don't just train; we transform behaviors.",
      stat: "90%",
      statLabel: "Breach Prevention",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      icon: ShieldCheck,
      title: "Compliance Ready",
      description: "Seamlessly align with GDPR, ISO 27001, and NIST standards. Compliance isn't just a checkbox; it's a culture.",
      stat: "100%",
      statLabel: "Audit Ready",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: TrendingDown,
      title: "Measurable Impact",
      description: "Real-time analytics prove risk reduction. Watch your phishing click rates drop and reporting rates soar.",
      stat: "-60%",
      statLabel: "Risk Reduction",
      gradient: "from-emerald-400 to-teal-500"
    }
  ];

  return (
    <section id="why-us" className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Background Decor - Floating Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
         <motion.div 
            animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 left-10 w-72 h-72 bg-brand-light rounded-full blur-[80px] opacity-60 mix-blend-multiply" 
         />
         <motion.div 
            animate={{ scale: [1, 1.1, 1], x: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute top-40 right-10 w-72 h-72 bg-purple-100 rounded-full blur-[80px] opacity-60 mix-blend-multiply" 
         />
         <motion.div 
            animate={{ scale: [1, 1.3, 1], y: [0, -40, 0] }}
            transition={{ duration: 12, repeat: Infinity, delay: 2 }}
            className="absolute -bottom-32 left-1/2 w-96 h-96 bg-cyan-100 rounded-full blur-[80px] opacity-60 mix-blend-multiply" 
         />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
                Why Partner With <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-dark">Cyber Safety Alliance?</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Cyber threats are evolving—so should your people. We bridge the gap between complex security requirements and human behavior.
              </p>
           </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white/60 backdrop-blur-xl border border-white/50 p-8 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-300"
            >
               {/* Hover Gradient Border Effect */}
               <div className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
               
               <div className="relative z-10">
                  {/* Icon & Stat Row */}
                  <div className="flex justify-between items-start mb-8">
                     <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        <card.icon size={28} />
                     </div>
                     <div className="text-right">
                        <span className={`block text-3xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-br ${card.gradient}`}>
                           {card.stat}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                           {card.statLabel}
                        </span>
                     </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-brand-cyan transition-colors">
                     {card.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed mb-6">
                     {card.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-slate-600 transition-colors">
                     <CheckCircle2 size={16} className={`text-transparent bg-clip-text bg-gradient-to-br ${card.gradient}`} />
                     <span>Verified Excellence</span>
                  </div>
               </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};