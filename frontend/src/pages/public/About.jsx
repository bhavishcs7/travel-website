import React from 'react';
import { Camera, Film, Globe, Award, Heart, CheckCircle2 } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-28 pb-20 bg-dark-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Banner Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5" />
            <span>My Story & Vision</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white leading-tight">
            Chasing Dreams Across <span className="text-brand-500 italic">6 Continents</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            I am Alex Rivera — a full-time travel creator, documentary filmmaker, and photographer dedicated to showing you the raw beauty of our planet.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&q=80&w=1000"
              alt="Alex Exploring Patagonia"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 p-4 glass-panel rounded-2xl">
              <span className="text-xs text-brand-400 font-bold uppercase">Torres Del Paine, Patagonia</span>
              <p className="text-white text-sm font-semibold">"Travel isn't about escaping life, it's about making life unescapable."</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-bold text-white">
              Why I Started Travel Content Creation
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Back in 2020, I saved up $5,000, packed a single backpack with a Sony camera and a drone, and bought a one-way ticket to Southeast Asia. What started as personal video diaries transformed into a global community of over 500,000 adventurers.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              My mission is to inspire you to step outside your comfort zone, travel responsibly, support local indigenous communities, and capture lifelong memories.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3 text-slate-200 text-sm">
                <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" />
                <span>Featured in National Geographic Traveler & BBC Travel</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-200 text-sm">
                <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" />
                <span>Partnered with over 35+ Global Tourism Boards</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-200 text-sm">
                <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" />
                <span>Published 300+ 4K Cinematic YouTube Vlogs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gear Used Section */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="font-serif text-2xl font-bold text-white">The Gear Behind The Visuals</h3>
            <p className="text-slate-400 text-xs">Everything I carry in my 45L travel backpack to produce cinematic videos.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-slate-900 p-5 rounded-2xl border border-white/5 space-y-2">
              <Camera className="w-6 h-6 text-brand-400" />
              <h4 className="text-white font-bold text-sm">Primary Camera</h4>
              <p className="text-slate-400 text-xs">Sony A7S III + 24-70mm f/2.8 GM II</p>
            </div>
            <div className="bg-slate-900 p-5 rounded-2xl border border-white/5 space-y-2">
              <Film className="w-6 h-6 text-sky-400" />
              <h4 className="text-white font-bold text-sm">Drone Footage</h4>
              <p className="text-slate-400 text-xs">DJI Mini 4 Pro (4K 60fps HDR)</p>
            </div>
            <div className="bg-slate-900 p-5 rounded-2xl border border-white/5 space-y-2">
              <Award className="w-6 h-6 text-amber-400" />
              <h4 className="text-white font-bold text-sm">Action & Underwater</h4>
              <p className="text-slate-400 text-xs">GoPro HERO 12 Black + Dome Port</p>
            </div>
            <div className="bg-slate-900 p-5 rounded-2xl border border-white/5 space-y-2">
              <Heart className="w-6 h-6 text-pink-400" />
              <h4 className="text-white font-bold text-sm">Audio & Wireless</h4>
              <p className="text-slate-400 text-xs">DJI Mic 2 Wireless Transmitters</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
