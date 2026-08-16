import React from 'react';
import { motion } from 'framer-motion';
import { Castle, Landmark, Feather, Sparkles } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 bg-[#F3F1ED] text-stone-900 overflow-hidden border-t border-stone-200">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#B8860B]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#B8860B]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-stone-200 text-[#B8860B] text-xs font-semibold uppercase tracking-widest mb-4 shadow-sm"
          >
            <Feather className="w-3.5 h-3.5" />
            <span>The Creator Mission</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-cinzel text-4xl sm:text-5xl font-extrabold tracking-wide mb-6"
          >
            Unearthing <span className="text-[#B8860B]">History</span> Through The Lens
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 ornament-line mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-kannada text-xl md:text-2xl text-[#8B6508] font-semibold mb-4 leading-relaxed"
          >
            ನಿಮ್ಮ ಹುಡುಕಾಟ ಇಲ್ಲಿಗೆ ಮುಗಿಯುತ್ತದೆ - ಚರಿತ್ರೆಯ ಪುಟಗಳ ನೈಜ ಪಯಣ
          </motion.p>
        </div>

        {/* Feature Cards Grid - Vision Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-white rounded-2xl p-8 flex flex-col items-start relative group transition-all duration-300 shadow-sm hover:shadow-xl border border-stone-100"
          >
            <div className="w-14 h-14 rounded-xl bg-[#F3F1ED] border border-stone-200 flex items-center justify-center text-[#B8860B] mb-6 group-hover:scale-110 group-hover:bg-[#B8860B] group-hover:text-white transition-all duration-300 shadow-sm">
              <Landmark className="w-7 h-7" />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-stone-900 mb-3 group-hover:text-[#B8860B] transition-colors">
              Ancient Architecture
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed font-light">
              Documenting intricate stone carvings, royal forts, and majestic temple structures with cinematic photography and accurate historical context.
            </p>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 flex flex-col items-start relative group transition-all duration-300 shadow-sm hover:shadow-xl border border-stone-100"
          >
            <div className="w-14 h-14 rounded-xl bg-[#F3F1ED] border border-stone-200 flex items-center justify-center text-[#B8860B] mb-6 group-hover:scale-110 group-hover:bg-[#B8860B] group-hover:text-white transition-all duration-300 shadow-sm">
              <Castle className="w-7 h-7" />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-stone-900 mb-3 group-hover:text-[#B8860B] transition-colors">
              Forgotten Empires
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed font-light">
              Traversing forgotten capital cities and ancient battlegrounds to retell authentic stories of dynasties that shaped civilization.
            </p>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-white rounded-2xl p-8 flex flex-col items-start relative group transition-all duration-300 shadow-sm hover:shadow-xl border border-stone-100"
          >
            <div className="w-14 h-14 rounded-xl bg-[#F3F1ED] border border-stone-200 flex items-center justify-center text-[#B8860B] mb-6 group-hover:scale-110 group-hover:bg-[#B8860B] group-hover:text-white transition-all duration-300 shadow-sm">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-stone-900 mb-3 group-hover:text-[#B8860B] transition-colors">
              Cinematic Expeditions
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed font-light">
              Combining visual artistry, ultra-wide drone perspectives, and immersive soundscapes to bring heritage sites to life.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
