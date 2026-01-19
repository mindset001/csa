import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Target, Shield, Lock, ArrowRight, X, Linkedin, Quote } from 'lucide-react';

const teamMembers = [
  {
    name: "Zubair Kazuare",
    role: "Founder",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
    bio: "The visionary behind the alliance, bridging the gap between complex security needs and human behavior."
  },
  {
    name: "Asma'u Wali",
    role: "CEO",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
    bio: "Leading global operations with a focus on sustainable security cultures and organizational resilience."
  },
  {
    name: "Ahmad Tambaya",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
    bio: "Architecting the next generation of adaptive threat detection and interactive training platforms."
  }
];

export const About: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isExpanded]);

  const handleWorkWithUs = () => {
    setIsExpanded(false);
    // Slight delay to allow modal to start closing visually
    setTimeout(() => {
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
    }, 100);
  };

  return (
    <section id="about" className="relative py-32 bg-white overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-slate-50 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-light/20 rounded-full blur-3xl opacity-50 -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* Left Column: Image Composition */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white group cursor-pointer" onClick={() => setIsExpanded(true)}>
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                alt="Team Collaboration" 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-8 left-8 text-white max-w-xs">
                <p className="font-display font-bold text-lg mb-1">Human-Centric Security</p>
                <p className="text-sm text-slate-200">Empowering teams to defend themselves.</p>
              </div>

              {/* "Click to Expand" Hint */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-sm">
                 <span className="bg-white/90 text-slate-900 px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all">
                    View Story
                 </span>
              </div>
            </div>

            {/* Floating Stats Card */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-12 -right-6 md:-right-12 bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-[280px]"
            >
               <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 bg-brand-cyan/10 rounded-full flex items-center justify-center text-brand-cyan">
                    <Users size={24} />
                 </div>
                 <div>
                   <span className="block font-display font-bold text-3xl text-slate-900">50k+</span>
                   <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Users Trained</span>
                 </div>
               </div>
               <p className="text-slate-600 text-sm leading-relaxed">
                 Transforming employees from targets into the strongest line of defense.
               </p>
            </motion.div>
          </motion.div>

          {/* Right Column: Content */}
          <div className="lg:w-1/2">
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
             >
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-12 h-1 bg-brand-cyan rounded-full"></span>
                  <span className="text-brand-cyan font-bold uppercase tracking-widest text-sm">About Us</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-8 leading-tight">
                  Defending the <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-blue-600">Human Element.</span>
                </h2>

                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Cyber Safety Alliance (CSA) is a Human Risk Management (HRM) and Cyber Awareness Training firm. We don't just tick boxes; we change behaviors.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mb-10">
                  Our journey began with a simple observation: most breaches trace back to human error. We exist to fix that—empowering organizations to build a culture where security is everyone's responsibility.
                </p>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                   {[
                     { icon: Target, title: "Behavior-Based", desc: "Targeted interventions for risky behaviors." },
                     { icon: Shield, title: "Active Defense", desc: "Real-time threat reporting tools." },
                     { icon: Lock, title: "Compliance", desc: "ISO 27001 & GDPR aligned content." },
                     { icon: Users, title: "Interactive", desc: "Engaging workshops, not boring lectures." }
                   ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                         <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-brand-cyan">
                            <item.icon size={20} />
                         </div>
                         <div>
                            <h4 className="font-bold text-slate-900 text-sm md:text-base">{item.title}</h4>
                            <p className="text-sm text-slate-500 leading-snug">{item.desc}</p>
                         </div>
                      </div>
                   ))}
                </div>
                
                <div className="mt-12">
                   <button 
                     onClick={() => setIsExpanded(true)}
                     className="group flex items-center gap-2 text-slate-900 font-bold border-b-2 border-brand-cyan pb-1 hover:text-brand-cyan transition-colors"
                   >
                     Read Our Full Story <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>

             </motion.div>
          </div>
        </div>
      </div>

      {/* FULL STORY OVERLAY */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
              onClick={() => setIsExpanded(false)}
            />

            {/* Modal Content */}
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-5xl h-[95vh] sm:h-[90vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
               {/* Modal Header */}
               <div className="flex items-center justify-between p-6 sm:p-8 border-b border-slate-100 bg-white z-20 sticky top-0">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-brand-cyan text-white flex items-center justify-center rounded-lg">
                        <Shield size={20} fill="currentColor" />
                     </div>
                     <span className="font-display font-bold text-xl text-slate-900">Our Story</span>
                  </div>
                  <button 
                    onClick={() => setIsExpanded(false)}
                    className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-red-500 transition-colors"
                  >
                    <X size={20} />
                  </button>
               </div>

               {/* Scrollable Body */}
               <div className="overflow-y-auto flex-1 p-6 sm:p-12 scroll-smooth">
                  
                  {/* Hero Section of Story */}
                  <div className="mb-16 text-center max-w-3xl mx-auto">
                    <motion.div
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                    >
                       <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
                         It Wasn't a Technical Failure.<br/>
                         <span className="text-brand-cyan">It Was a Human One.</span>
                       </h2>
                       <p className="text-xl text-slate-600 leading-relaxed font-light">
                         The firewall held. The encryption was sound. Yet, a single click on a well-crafted email brought the network to its knees. That was the moment Cyber Safety Alliance was born.
                       </p>
                    </motion.div>
                  </div>

                  {/* Split Content */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                     <div className="order-2 md:order-1 relative">
                        <div className="absolute top-[-20px] left-[-20px] text-brand-light transform -scale-x-100">
                           <Quote size={80} />
                        </div>
                        <p className="relative z-10 text-lg text-slate-700 italic font-medium leading-loose pl-6 border-l-4 border-brand-cyan">
                           "We realized that the industry was spending billions on digital walls but pennies on the people guarding the gates. We set out to change that paradigm forever."
                        </p>
                        <div className="mt-4 flex items-center gap-3 pl-6">
                           <img 
                              src={teamMembers[0].image} 
                              alt="Founder" 
                              className="w-10 h-10 rounded-full object-cover"
                           />
                           <div>
                              <strong className="block text-slate-900 text-sm">{teamMembers[0].name}</strong>
                              <span className="text-xs text-slate-500">{teamMembers[0].role}</span>
                           </div>
                        </div>
                     </div>
                     <div className="order-1 md:order-2 h-64 md:h-80 rounded-2xl overflow-hidden relative shadow-lg">
                        <img 
                          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop" 
                          alt="Office working" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-brand-cyan/10 mix-blend-multiply" />
                     </div>
                  </div>

                  {/* The Philosophy Section */}
                  <div className="bg-slate-50 rounded-3xl p-8 md:p-12 mb-20 border border-slate-100">
                     <div className="max-w-4xl mx-auto">
                        <h3 className="text-2xl font-display font-bold text-slate-900 mb-6">Our Philosophy: From Liability to Asset</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-600">
                           <p>
                              Traditionally, employees have been viewed as the "weakest link" in the cybersecurity chain. This negative reinforcement creates fear, hiding, and ultimately, more risk.
                           </p>
                           <p>
                              We flip the script. By combining behavioral psychology with cutting-edge threat intelligence, we transform your workforce into a "Human Firewall"—a sophisticated, active sensor network that detects threats technology misses.
                           </p>
                        </div>
                     </div>
                  </div>

                  {/* Team Section */}
                  <div className="mb-12">
                     <h3 className="text-2xl font-display font-bold text-slate-900 mb-10 text-center">The Minds Behind the Mission</h3>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.map((member, idx) => (
                           <motion.div 
                              key={idx}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.1 }}
                              className="group text-center"
                           >
                              <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden p-1 border-2 border-slate-100 group-hover:border-brand-cyan transition-colors">
                                 <img src={member.image} alt={member.name} className="w-full h-full rounded-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                              </div>
                              <h4 className="text-lg font-bold text-slate-900">{member.name}</h4>
                              <span className="text-brand-cyan text-sm font-bold uppercase tracking-wider block mb-2">{member.role}</span>
                              <p className="text-slate-500 text-sm px-4">{member.bio}</p>
                              <div className="flex justify-center mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <a href="#" className="text-slate-400 hover:text-brand-cyan"><Linkedin size={18} /></a>
                              </div>
                           </motion.div>
                        ))}
                     </div>
                  </div>

               </div>
               
               {/* Modal Footer CTA */}
               <div className="bg-slate-50 p-6 sm:p-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p className="text-slate-600 font-medium">Ready to write your own security success story?</p>
                  <button 
                    onClick={handleWorkWithUs}
                    className="bg-brand-dark text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-brand-cyan transition-colors shadow-lg"
                  >
                     Work With Us
                  </button>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};