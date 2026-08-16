import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, Camera, MapPin, ChevronDown, Play } from 'lucide-react';

export default function Hero() {
  const scrollDown = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative w-full min-h-screen flex flex-col overflow-hidden bg-[#FAFAFA]">

      {/* ── Full-bleed background image ────────────────── */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="/premium_heritage_hero.png"
          alt="Content Hunter — Premium Heritage Photography"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark gradient on the left side (35-40%) for text readability */}
        <div className="absolute inset-0 w-full md:w-3/4 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        {/* Bottom fade to blend with the #FAFAFA background of the next section */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/50 to-transparent" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay" />
      </div>

      {/* ── Hero Content ────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-12 flex flex-col min-h-screen">
        
        {/* Main Content Area (flex-1 pushes the bottom bar down) */}
        <div className="flex-1 flex flex-col justify-center max-w-3xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[1px] bg-gradient-to-r from-[#D4AF37] to-transparent" />
            <span className="text-[#D4AF37] text-xs font-outfit font-bold uppercase tracking-[0.3em] drop-shadow-md">
              Cinematic Travel & History
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-cinzel text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight mb-8 drop-shadow-lg"
          >
            Unveiling <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] italic font-medium pr-4">Ancient</span> Echoes
          </motion.h1>

          {/* Kannada & English tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-kannada text-stone-200 text-lg sm:text-xl font-light mb-12 max-w-xl leading-relaxed border-l-2 border-[#D4AF37]/50 pl-6 drop-shadow-md"
          >
            ನಿಮ್ಮ ಹುಡುಕಾಟ ಇಲ್ಲಿಗೆ ಮುಗಿಯುತ್ತದೆ. <br/>
            Join the expedition to discover India's forgotten temples, breathtaking monuments, and untold stories.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <a 
              href="https://youtube.com/@contenthunter-o8n" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#B8860B] hover:bg-[#8B6508] text-white font-outfit font-bold uppercase tracking-widest text-xs rounded-full transition-all duration-300 hover:scale-105 shadow-[0_4px_20px_rgba(184,134,11,0.3)] hover:shadow-[0_4px_25px_rgba(184,134,11,0.5)] border border-[#D4AF37]/20"
            >
              <Play className="w-4 h-4 fill-white text-white" /> Watch Latest Expedition
            </a>
          </motion.div>
        </div>

        {/* ── Bottom Bar (Badges & Scroll) ───────────────── */}
        <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
          
          {/* Feature badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4"
          >
            {[
              { icon: Landmark, label: 'Historical Places'       },
              { icon: Camera,   label: '4K Cinematic Quality'      },
              { icon: MapPin,   label: 'Hidden Stories Unfolded' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="relative z-20 inline-flex items-center justify-center gap-3 px-5 py-3 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-stone-200 hover:text-white hover:border-[#D4AF37]/50 hover:bg-black/60 transition-colors text-xs font-outfit font-semibold tracking-wider shadow-lg"
              >
                <Icon className="w-4 h-4 text-[#D4AF37]" />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            onClick={scrollDown}
            className="relative z-20 flex flex-col items-center gap-2 text-stone-400 hover:text-[#D4AF37] transition-colors group shrink-0"
            aria-label="Scroll down"
          >
            <span className="text-[9px] font-outfit uppercase tracking-[0.3em] font-bold rotate-90 mb-6 origin-center translate-y-2 drop-shadow-md">Scroll</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </motion.button>
        </div>
        
      </div>
    </section>
  );
}
