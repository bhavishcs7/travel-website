// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Compass, MapPin, Sparkles } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
});

const features = [
  {
    icon: Compass,
    title: 'Authentic Stories',
    desc:  'Deep ground research uncovering forgotten legends, rich heritage and real cultural traditions passed down through generations.',
  },
  {
    icon: MapPin,
    title: 'Pan-India Exploration',
    desc:  (
      <>
        Traversing diverse regions — from ancient temple towns and coastal villages to<br className="hidden md:block" /> desert forts and hidden hill sanctuaries.
      </>
    ),
  },
];

export default function ChannelDescription() {
  return (
    <section
      id="about"
      className="relative w-full flex items-center justify-center bg-[#FAFAFA] py-24 md:py-32 overflow-hidden border-t border-stone-200"
    >
      {/* Cinematic Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-5xl h-[600px] bg-[#B8860B]/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Centered max-width container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── LEFT ──────────────────────────────────── */}
          <motion.div {...fadeUp(0)} className="flex flex-col items-start text-left">

            <div className="flex items-center gap-3 mb-8">
              <span className="text-[10px] font-outfit font-bold uppercase tracking-[0.3em] text-[#B8860B] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" /> About Content Hunter
              </span>
              <div className="w-12 h-[1px] bg-gradient-to-r from-[#B8860B] to-transparent" />
            </div>

            <h2 className="font-cinzel text-5xl sm:text-6xl lg:text-7xl font-black text-stone-900 leading-tight mb-8 drop-shadow-sm">
              About <span className="text-gradient-gold italic">Us</span>
            </h2>

            <p className="font-kannada text-xl text-[#8B6508] font-light mb-10 tracking-wide border-l-2 border-[#B8860B] pl-6">
              ಇತಿಹಾಸ ಮತ್ತು ಸಂಸ್ಕೃತಿಯ ನೈಜ ಅನಾವರಣ
            </p>

            <p className="text-stone-600 font-outfit text-base font-light leading-[1.9] mb-8 max-w-lg">
              <strong className="text-stone-900 font-medium font-cinzel tracking-wider">CONTENT HUNTER</strong> is a
              travel content creation channel dedicated to exploring every extraordinary place
              worth discovering — from ancient temple complexes and historic fortresses to
              undiscovered natural wonders and vibrant local traditions.
            </p>

            <p className="text-stone-600 font-outfit text-base font-light leading-[1.9] max-w-lg">
              Through cinematic films and on-ground exploration, our mission is to capture
              the true essence of every location and inspire travelers worldwide. We don&apos;t
              just visit places — we tell their stories.
            </p>

          </motion.div>

          {/* ── RIGHT ─────────────────────────────────── */}
          <div className="flex flex-col gap-6">

            {features.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                {...fadeUp(0.15 + i * 0.12)}
                className="group relative w-full rounded-3xl bg-white px-10 py-10 shadow-sm border border-stone-100 hover:border-[#B8860B]/30 hover:shadow-xl transition-all duration-500 flex flex-col items-start text-left overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#B8860B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-14 h-14 rounded-2xl bg-[#F3F1ED] border border-stone-200 flex items-center justify-center mb-8 group-hover:bg-[#B8860B]/10 group-hover:border-[#B8860B]/30 transition-all duration-500">
                  <Icon className="w-6 h-6 text-[#B8860B]" />
                </div>
                <h3 className="font-cinzel text-2xl font-bold text-stone-900 mb-4 tracking-wide group-hover:text-[#B8860B] transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-stone-600 font-outfit font-light text-sm leading-[1.8]">
                  {desc}
                </p>
              </motion.div>
            ))}

            <motion.div
              {...fadeUp(0.38)}
              className="relative w-full rounded-3xl bg-gradient-to-br from-white to-[#F3F1ED] border border-[#B8860B]/20 px-10 py-12 shadow-sm text-center overflow-hidden mt-4"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,134,11,0.05)_0%,transparent_100%)] pointer-events-none" />
              <p className="relative z-10 font-kannada text-stone-800 text-lg leading-loose font-light tracking-wide">
                &ldquo;ಇತಿಹಾಸದ ಕಥೆಗಳು, ಪುರಾತನ ದೇವಾಲಯಗಳು, ಕೋಟೆಗಳು ಮತ್ತು ಐತಿಹಾಸಿಕ<br className="hidden md:block" />
                ಸ್ಥಳಗಳ ನೈಜ ಅನ್ವೇಷಣೆ&rdquo;
              </p>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
