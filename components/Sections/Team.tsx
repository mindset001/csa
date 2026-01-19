import React from 'react';
import { motion } from 'framer-motion';
import { TeamMember } from '../../types';
import Ahmad from '../../images/ahmad.jpeg';
import Zubair from '../../images/zubair.jpeg';

const team: TeamMember[] = [
  {
    id: 1,
    name: 'Dr. Asmau Wali',
    role: 'Chief Executive Officer (CEO)',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Ahmad Tambaya',
    role: 'Chief Technology Officer (CTO)',
    imageUrl: Ahmad
  },
  {
    id: 3,
    name: 'Zubair Kazaure',
    role: 'Founder/ Cyber Safety Lead',
    imageUrl: Zubair
  }
];

export const Team: React.FC = () => {
  return (
    <section id="team" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-display font-bold text-slate-900">Leadership</h3>
          <p className="text-slate-600 mt-2">Meet the executives guiding Cyber Safety Alliance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="text-center"
            >
              <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-2 border-slate-100">
                <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">{member.name}</h4>
              <span className="text-brand-cyan text-sm font-bold uppercase tracking-wider block mb-2">{member.role}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
