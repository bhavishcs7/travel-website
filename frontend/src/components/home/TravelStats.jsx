import React from 'react';
import { Globe, Users, Camera, Plane } from 'lucide-react';

const TravelStats = () => {
  const stats = [
    { icon: Globe, value: '42+', label: 'Countries Explored', color: 'text-brand-400' },
    { icon: Users, value: '250K+', label: 'YouTube Subscribers', color: 'text-red-400' },
    { icon: Camera, value: '15,000+', label: 'Photos Captured', color: 'text-sky-400' },
    { icon: Plane, value: '180+', label: 'Flights Taken', color: 'text-teal-400' },
  ];

  return (
    <section className="py-16 bg-slate-950/80 border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="glass-panel p-6 rounded-3xl border-white/5 text-center space-y-2 group hover:border-brand-500/30 transition-all">
                <div className={`w-12 h-12 rounded-2xl bg-white/5 mx-auto flex items-center justify-center ${s.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="font-serif text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {s.value}
                </div>
                <div className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TravelStats;
