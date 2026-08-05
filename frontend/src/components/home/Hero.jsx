import React from 'react';
import { Link } from 'react-router-dom';
import { Play, MapPin, Landmark, Camera, Compass, ArrowRight, Video } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
      
      {/* Background Image Overlay featuring Indian Heritage Temple & Fort */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&q=80&w=2000"
          alt="Content Hunter Heritage Temple Architecture"
          className="w-full h-full object-cover object-center scale-105 filter brightness-50 contrast-125"
        />
        {/* Vignette & Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black"></div>
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 flex flex-col items-center justify-center space-y-8">
        
        {/* Emblem Camera Icon Banner */}
        <div className="flex flex-col items-center space-y-2">
          <div className="relative group cursor-pointer">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-red-600 border-4 border-white/30 flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.8)] transform group-hover:scale-110 transition-all duration-300">
              <Video className="w-10 h-10 sm:w-12 sm:h-12 text-white fill-current" />
            </div>
            <div className="absolute -inset-1 rounded-3xl bg-red-600 blur-xl opacity-50 -z-10 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>

        {/* Main Title - CONTENT HUNTER */}
        <div className="space-y-3 max-w-4xl">
          <h1 className="font-sans font-black text-5xl sm:text-7xl lg:text-9xl uppercase tracking-tighter text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] leading-none">
            CONTENT <span className="text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.8)]">HUNTER</span>
          </h1>

          {/* Slogan in Kannada */}
          <div className="flex items-center justify-center space-x-3 text-red-500 font-bold text-lg sm:text-2xl tracking-wide pt-2">
            <span className="h-0.5 w-12 sm:w-20 bg-red-600"></span>
            <span className="text-white font-black drop-shadow-md">ನಿಮ್ಮ ಹುಡುಕಾಟ ಇಲ್ಲಿಗೆ ಮುಗಿಯುತ್ತದೆ</span>
            <span className="h-0.5 w-12 sm:w-20 bg-red-600"></span>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm font-semibold uppercase tracking-widest pt-1">
            ( Your Search Ends Here )
          </p>
        </div>

        {/* 3 Pillars Badge Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-4xl w-full pt-4">
          <div className="glass-panel p-4 rounded-2xl border border-red-600/30 flex items-center space-x-3 bg-black/60 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 text-red-500 flex items-center justify-center shrink-0">
              <Landmark className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-white font-black text-xs sm:text-sm uppercase tracking-wider">HISTORICAL PLACES</div>
              <div className="text-slate-400 text-[10px]">Ancient Temples & Forts</div>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-red-600/30 flex items-center space-x-3 bg-black/60 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 text-red-500 flex items-center justify-center shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-white font-black text-xs sm:text-sm uppercase tracking-wider">EXPLORING HERITAGE</div>
              <div className="text-slate-400 text-[10px]">Architecture & Culture</div>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-red-600/30 flex items-center space-x-3 bg-black/60 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 text-red-500 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-white font-black text-xs sm:text-sm uppercase tracking-wider">HIDDEN STORIES</div>
              <div className="text-slate-400 text-[10px]">Untold Historical Legends</div>
            </div>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link
            to="/destinations"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(220,38,38,0.7)] hover:scale-105 transition-all flex items-center justify-center space-x-2"
          >
            <Compass className="w-5 h-5" />
            <span>Explore Heritage Places</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            to="/videos"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black text-sm uppercase tracking-widest border border-white/20 backdrop-blur-md hover:scale-105 transition-all flex items-center justify-center space-x-2"
          >
            <Play className="w-5 h-5 text-red-500 fill-current" />
            <span>Watch Vlogs & Reels</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Hero;
