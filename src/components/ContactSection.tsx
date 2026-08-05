import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, Facebook, ExternalLink, Mail, Compass, MapPin } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function ContactSection() {
  return (
    <section id="contact" className="relative w-full flex items-center justify-center bg-[#F3F1ED] py-24 md:py-32 overflow-hidden border-t border-stone-200">
      {/* Cinematic Background Lighting (Gold) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-5xl h-[600px] bg-[#B8860B]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* ── Section header ───────────────────────────── */}
        <motion.div
          {...fadeUp(0)}
          className="flex flex-col items-start text-left mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[10px] font-outfit font-bold uppercase tracking-[0.3em] text-[#B8860B]">
              Connect & Subscribe
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-r from-[#B8860B] to-transparent" />
          </div>

          <h2 className="font-cinzel text-5xl sm:text-6xl lg:text-7xl font-black text-stone-900 leading-tight mb-8 drop-shadow-sm">
            Join the <span className="text-gradient-gold italic">Expedition</span>
          </h2>

          <p className="font-kannada text-xl text-[#8B6508] font-light mb-10 tracking-wide border-l-2 border-[#B8860B] pl-6">
            ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮಗಳಲ್ಲಿ ನಮ್ಮೊಂದಿಗೆ ಸಂಪರ್ಕದಲ್ಲಿರಿ.
          </p>

          <p className="text-stone-600 font-outfit text-base font-light leading-[1.9] max-w-2xl">
            Join our community of explorers and history enthusiasts to witness the untamed beauty of India.
          </p>
        </motion.div>

        {/* ── Social cards ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-16">

          {/* YouTube Card */}
          <motion.a
            href="https://youtube.com/@contenthunter-o8n"
            target="_blank"
            rel="noopener noreferrer"
            {...fadeUp(0.15)}
            className="group relative w-full rounded-3xl bg-white px-10 py-10 shadow-sm hover:shadow-xl border border-stone-100 hover:border-red-500/30 transition-all duration-500 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 w-full">
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#F3F1ED] border border-stone-200 flex items-center justify-center group-hover:bg-red-500/10 group-hover:border-red-500/30 transition-all duration-500">
                  <Youtube className="w-6 h-6 text-[#B8860B] group-hover:text-red-500 transition-colors duration-500" />
                </div>
                <div className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500 transition-all duration-300">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>

              <span className="text-[10px] uppercase font-outfit font-bold tracking-[0.2em] text-[#B8860B] group-hover:text-red-500 transition-colors duration-500 mb-3 block">
                Official YouTube
              </span>
              <h3 className="font-cinzel text-3xl font-bold text-stone-900 mb-2 group-hover:text-red-500 transition-colors duration-300">CONTENT HUNTER</h3>
              <p className="text-sm font-outfit text-stone-500 mb-6">@contenthunter-o8n</p>
              <p className="text-stone-600 font-outfit font-light text-sm leading-[1.8]">
                Watch 4K cinematic travel films, ancient monument discoveries, and authentic historical stories. Subscribe now to join every expedition!
              </p>
            </div>
          </motion.a>

          {/* Facebook Card */}
          <motion.a
            href="https://www.facebook.com/share/1EZ33PFmsk/"
            target="_blank"
            rel="noopener noreferrer"
            {...fadeUp(0.27)}
            className="group relative w-full rounded-3xl bg-white px-10 py-10 shadow-sm hover:shadow-xl border border-stone-100 hover:border-blue-500/30 transition-all duration-500 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 w-full">
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#F3F1ED] border border-stone-200 flex items-center justify-center group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all duration-500">
                  <Facebook className="w-6 h-6 text-[#B8860B] group-hover:text-blue-500 transition-colors duration-500" />
                </div>
                <div className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all duration-300">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>

              <span className="text-[10px] uppercase font-outfit font-bold tracking-[0.2em] text-[#B8860B] group-hover:text-blue-500 transition-colors duration-500 mb-3 block">
                Official Facebook
              </span>
              <h3 className="font-cinzel text-3xl font-bold text-stone-900 mb-2 group-hover:text-blue-500 transition-colors duration-300">CONTENT HUNTER</h3>
              <p className="text-sm font-outfit text-stone-500 mb-6">facebook.com/contenthunter</p>
              <p className="text-stone-600 font-outfit font-light text-sm leading-[1.8]">
                Follow our Facebook page for travel updates, behind-the-scenes photography, and upcoming expedition announcements straight to your feed.
              </p>
            </div>
          </motion.a>
        </div>

        {/* ── Minimal Quote banner ─────────────────────── */}
        <motion.div
          {...fadeUp(0.38)}
          className="relative w-full rounded-3xl bg-gradient-to-br from-white to-[#F3F1ED] border border-[#B8860B]/20 px-10 py-12 shadow-sm text-left overflow-hidden mt-4 group"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,134,11,0.05)_0%,transparent_100%)] pointer-events-none" />
          <Compass className="absolute -bottom-10 -right-10 w-48 h-48 text-[#B8860B]/5 rotate-12 pointer-events-none group-hover:scale-110 transition-transform duration-700" />
          
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-white border border-stone-200 flex items-center justify-center mb-8 shadow-sm group-hover:bg-[#B8860B]/10 group-hover:border-[#B8860B]/30 transition-all duration-500">
              <Mail className="w-6 h-6 text-[#B8860B]" />
            </div>
            <p className="font-kannada text-xl md:text-2xl text-stone-800 font-light leading-relaxed mb-6 max-w-3xl">
              &ldquo;ಇತಿಹಾಸದ ಕಥೆಗಳು, ಪುರಾತನ ದೇವಾಲಯಗಳು, ಕೋಟೆಗಳು ಮತ್ತು ಐತಿಹಾಸಿಕ ಸ್ಥಳಗಳ ನೈಜ ಅನ್ವೇಷಣೆ&rdquo;
            </p>
            <p className="font-kannada text-sm text-[#8B6508] font-medium">
              ಹೊಸ ಸ್ಥಳಗಳ ಮಾಹಿತಿಗಾಗಿ Content Hunter ಅನ್ನು Subscribe ಮಾಡಿ!
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

