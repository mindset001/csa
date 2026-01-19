import React, { useState, useEffect } from 'react';
import { Send, Calendar, Clock, ArrowRight } from 'lucide-react';
import { MagnetButton } from '../UI/MagnetButton';

export const Contact: React.FC = () => {
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [countdown, setCountdown] = useState<string>("Calculating...");

  useEffect(() => {
    const getNextEventDate = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      // Quarter end months (0-indexed): Mar(2), Jun(5), Sep(8), Dec(11)
      const quarters = [2, 5, 8, 11];
      
      for (let year of [currentYear, currentYear + 1]) {
        for (let month of quarters) {
          // Get last day of the month
          const lastDay = new Date(year, month + 1, 0);
          
          // Find the last Saturday
          // Day 6 is Saturday.
          const dayOfWeek = lastDay.getDay();
          // Logic to find previous Saturday (or today if it is Saturday)
          // If Sun(0) -> subtract 1
          // If Sat(6) -> subtract 0
          // If Fri(5) -> subtract 6
          const daysToSubtract = (dayOfWeek + 1) % 7; 
          
          const eventDate = new Date(lastDay);
          eventDate.setDate(lastDay.getDate() - daysToSubtract);
          eventDate.setHours(10, 0, 0, 0); // Set event time to 10:00 AM
          
          if (eventDate > now) {
            return eventDate;
          }
        }
      }
      return new Date(); // Fallback
    };

    const target = getNextEventDate();
    setTargetDate(target);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown("Event Started");
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="contact" className="py-24 relative bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Form Section */}
          <div className="lg:w-1/2">
            <div className="mb-10">
              <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Take Control of Your Human Cyber Risk Today!</h2>
              <p className="text-slate-600">Everything starts with a conversation. But there’s other ways to get in touch with us.</p>
            </div>

            <form className="space-y-6 bg-slate-50 border border-slate-200 p-8 rounded-xl shadow-lg" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="bg-white border-b border-gray-300 p-3 w-full focus:outline-none focus:border-brand-cyan text-black transition-colors rounded-t"
                />
                <input 
                  type="text" 
                  placeholder="Job Title" 
                  className="bg-white border-b border-gray-300 p-3 w-full focus:outline-none focus:border-brand-cyan text-black transition-colors rounded-t"
                />
              </div>
              
              <input 
                type="text" 
                placeholder="Company" 
                className="bg-white border-b border-gray-300 p-3 w-full focus:outline-none focus:border-brand-cyan text-black transition-colors rounded-t"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="bg-white border-b border-gray-300 p-3 w-full focus:outline-none focus:border-brand-cyan text-black transition-colors rounded-t"
                />
                <input 
                  type="text" 
                  placeholder="Phone" 
                  className="bg-white border-b border-gray-300 p-3 w-full focus:outline-none focus:border-brand-cyan text-black transition-colors rounded-t"
                />
              </div>
              
              <textarea 
                placeholder="A summary of what you'd like to discuss:" 
                rows={4}
                className="bg-white border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:border-brand-cyan text-black transition-colors"
              />

              <MagnetButton variant="primary" className="w-full md:w-auto">
                Send Message <Send size={18} />
              </MagnetButton>
            </form>
          </div>

          {/* Webinar Section */}
          <div className="lg:w-1/2 flex items-center">
            <div className="w-full bg-brand-darkest border border-brand-cyan/20 p-8 md:p-12 rounded-2xl relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/20 rounded-full blur-[60px]" />
               
               <h2 className="text-3xl font-display font-bold text-white mb-6 text-center">Amazing and Free Webinar</h2>
               <p className="text-gray-300 text-center mb-8">
                 Join us for our upcoming Quarterly Webinar for <span className="text-brand-light underline decoration-wavy">Free</span>, where we’ll share key updates, spotlight stories, new features, and exclusive insights from The Cyber Safety Alliance team.
               </p>

               <div className="bg-black/30 border border-brand-light/50 p-6 rounded-xl text-center mb-8 backdrop-blur-sm">
                 <p className="text-lg font-medium text-white flex items-center justify-center gap-2 mb-2">
                   <Calendar size={20} className="text-brand-light" /> 
                   Next Quarter's Saturday:
                 </p>
                 <strong className="text-2xl text-brand-light block">
                    {targetDate ? targetDate.toDateString() : 'Loading Date...'}
                 </strong>
                 <p className="text-sm text-gray-400 mt-2 flex items-center justify-center gap-2 font-mono">
                    <Clock size={14} /> {countdown}
                 </p>
               </div>

               <div className="text-center">
                 <h4 className="text-white mb-4 font-medium">Register for Updates</h4>
                 <div className="flex gap-2">
                   <input 
                     type="email" 
                     placeholder="email address" 
                     className="flex-1 p-3 rounded bg-white text-black focus:outline-none"
                   />
                   <button className="bg-brand-cyan text-white font-bold px-6 py-3 rounded hover:bg-brand-light transition-colors">
                     Register
                   </button>
                 </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};