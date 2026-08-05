import React from 'react';
import { Quote, Star } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      quote: "Alex created an extraordinary promotional series for Wonderful Indonesia. His video surpassed 1 million views and drove a massive wave of eco-tourists to Nusa Penida.",
      author: "Dewi Lestari",
      role: "Marketing Director, Indonesia Tourism Board",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
    },
    {
      quote: "Working with Alex on our outdoor travel campaign was seamless. The drone photography and storytelling quality rivaled top national geography productions.",
      author: "Marcus Vance",
      role: "Global Brand Manager, Peak Explorer Gear",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200"
    },
    {
      quote: "His Kyoto travel guide was my Bible for my first solo trip to Japan! Every budget tip and hidden alley recommendation was 100% spot on.",
      author: "Elena Rostova",
      role: "Avid Reader & Traveler",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200"
    }
  ];

  return (
    <section className="py-20 bg-slate-950/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold uppercase tracking-wider">
            <Quote className="w-3.5 h-3.5" />
            <span>Endorsements</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            What Brands & Readers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6 hover:border-brand-500/40 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex text-amber-400 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "{r.quote}"
                </p>
              </div>

              <div className="flex items-center space-x-4 pt-4 border-t border-slate-800">
                <img
                  src={r.avatar}
                  alt={r.author}
                  className="w-12 h-12 rounded-full object-cover border border-brand-500/40"
                />
                <div>
                  <h4 className="text-white font-bold text-sm">{r.author}</h4>
                  <p className="text-slate-400 text-xs">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
