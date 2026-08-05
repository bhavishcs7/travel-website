import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Film, Globe2, Award, CheckCircle } from 'lucide-react';

const Intro = () => {
  return (
    <section className="py-20 bg-dark-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Creator Image Showcase */}
          <div className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000"
                alt="Alex Rivera Travel Creator"
                className="w-full h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-80"></div>
              
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl glass-panel border-white/10">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center text-brand-500">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base">Alex Rivera</h4>
                    <p className="text-slate-400 text-xs">Full-Time Travel Filmmaker & Content Creator</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Floating Accent Cards */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-6 -right-6 glass-panel px-5 py-3 rounded-2xl z-20 border-brand-500/30 flex items-center space-x-3 shadow-glow hidden sm:flex">
              <Award className="w-8 h-8 text-amber-400" />
              <div>
                <div className="text-white font-bold text-sm">Top 10 Creator</div>
                <div className="text-slate-400 text-[10px]">Nominated Travel Filmmaker 2025</div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Story */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold uppercase tracking-wider">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Behind The Lens</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
              Transforming Travel Moments into <span className="text-brand-500 italic">Cinematic Art</span>
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              I left the corporate desk behind 6 years ago with a single camera and a passion to uncover planet earth's most inspiring corners. Since then, I've created over 300+ travel vlogs and captured millions of photos across 6 continents.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white text-sm font-semibold">4K Cinematic Guides</h4>
                  <p className="text-slate-400 text-xs">High production drone footage and itineraries.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white text-sm font-semibold">Honest Budgets</h4>
                  <p className="text-slate-400 text-xs">Real breakdowns for backpackers and luxury lovers.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white text-sm font-semibold">Cultural Immersion</h4>
                  <p className="text-slate-400 text-xs">Local food, rituals, and human connection.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white text-sm font-semibold">Gear Breakdown</h4>
                  <p className="text-slate-400 text-xs">Solo traveler filming secrets and tech guides.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/10 transition-all hover:scale-105"
              >
                <span>Read Full Journey Story</span>
                <Film className="w-4 h-4 text-brand-400" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Intro;
