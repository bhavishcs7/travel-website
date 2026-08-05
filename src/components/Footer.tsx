import React from 'react';
import { Youtube, Facebook, ArrowUp } from 'lucide-react';

const footerLinks = [
  { name: 'Home',     href: '#home'    },
  { name: 'About Us', href: '#about'   },
  { name: 'Places',   href: '#places'  },
  { name: 'Contact',  href: '#contact' },
];

export default function Footer() {
  const goTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="w-full bg-[#FAFAFA] text-stone-900 border-t border-stone-200 relative overflow-hidden">
      
      {/* ── Background decoration ────────────────────── */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(184,134,11,0.03)_0%,transparent_70%)] pointer-events-none" />

      {/* ── Main footer body ─────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">

        {/* Brand */}
        <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex flex-col leading-tight">
              <span className="font-cinzel text-xl font-black tracking-widest text-stone-900">
                CONTENT <span className="text-gradient-gold">HUNTER</span>
              </span>
              <span className="font-kannada text-[10px] font-medium text-[#B8860B] tracking-wider drop-shadow-md">
                ನಿಮ್ಮ ಹುಡುಕಾಟ ಇಲ್ಲಿಗೆ ಮುಗಿಯುತ್ತದೆ
              </span>
            </div>
          <p className="text-stone-600 text-sm leading-relaxed font-outfit font-light max-w-sm mt-6">
            Preserving history, exploring heritage, and bringing ancient stories to life through cinematic exploration.
          </p>
        </div>

        {/* Quick links */}
        <div className="md:col-span-3 lg:col-start-7">
          <h4 className="text-xs font-outfit uppercase tracking-[0.2em] font-bold text-[#B8860B] mb-6">Navigation</h4>
          <ul className="space-y-4">
            {footerLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); goTo(link.href); }}
                  className="text-stone-600 hover:text-stone-900 text-sm font-outfit uppercase tracking-wider font-medium transition-colors hover:text-gradient-gold inline-block duration-300"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div className="md:col-span-4 lg:col-span-3">
          <h4 className="text-xs font-outfit uppercase tracking-[0.2em] font-bold text-[#B8860B] mb-6">Expeditions & Updates</h4>
          <div className="flex flex-col gap-4">
            <a
              href="https://youtube.com/@contenthunter-o8n"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 text-stone-600 hover:text-stone-900 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F3F1ED] group-hover:bg-red-500/10 flex items-center justify-center transition-colors border border-transparent group-hover:border-red-500/30">
                <Youtube className="w-4 h-4 group-hover:text-red-500 transition-colors" />
              </div>
              <span className="text-sm font-outfit">Subscribe on YouTube</span>
            </a>
            <a
              href="https://www.facebook.com/share/1EZ33PFmsk/"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 text-stone-600 hover:text-stone-900 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F3F1ED] group-hover:bg-blue-500/10 flex items-center justify-center transition-colors border border-transparent group-hover:border-blue-500/30">
                <Facebook className="w-4 h-4 group-hover:text-blue-500 transition-colors" />
              </div>
              <span className="text-sm font-outfit">Follow on Facebook</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────── */}
      <div className="relative z-10 border-t border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-500 text-xs font-outfit tracking-wide">
            © {new Date().getFullYear()} CONTENT HUNTER. All rights reserved.
          </p>
          <button
            onClick={scrollTop}
            className="flex items-center gap-2 text-stone-500 hover:text-[#B8860B] text-[10px] font-outfit font-bold tracking-widest uppercase transition-colors group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
