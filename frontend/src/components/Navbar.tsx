// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home',     href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Places',   href: '/places' },
  { name: 'Contact',  href: '/contact' },
  { name: 'Admin',    href: '/admin/login' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [activeLink, setActiveLink]     = useState(location.pathname);

  const isHome = location.pathname === '/';
  const isTransparentDark = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavigate = (href) => {
    setMobileOpen(false);
    setActiveLink(href);
    navigate(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-2 bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-sm' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between py-2 transition-all duration-500">
          {/* ── Logo ─────────────────────────── */}
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); handleNavigate('/'); }}
            className="flex items-center gap-4 group focus:outline-none"
          >
            <div className="flex flex-col leading-tight">
              <span className={`font-cinzel text-lg font-black tracking-widest transition-colors group-hover:text-[#B8860B] ${
                isTransparentDark ? 'text-white' : 'text-stone-900'
              }`}>
                CONTENT <span className="text-gradient-gold">HUNTER</span>
              </span>
              <span className={`font-kannada text-[9px] font-medium tracking-wider ${
                isTransparentDark ? 'text-stone-300' : 'text-[#8B6508]'
              }`}>
                ನಿಮ್ಮ ಹುಡುಕಾಟ ಇಲ್ಲಿಗೆ ಮುಗಿಯುತ್ತದೆ
              </span>
            </div>
          </a>

          {/* ── Desktop Nav ──────────────────── */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { 
                  e.preventDefault(); 
                  handleNavigate(link.href);
                }}
                className={`relative text-xs font-outfit uppercase tracking-[0.15em] font-bold transition-colors py-2 group ${
                  activeLink === link.href ? 'text-[#B8860B]' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#B8860B] to-transparent transition-all duration-300 ${activeLink === link.href ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-50'}`} />
              </a>
            ))}
          </nav>

          {/* ── Mobile Hamburger ─────────────── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-full border transition-all shadow-sm hover:shadow-md ${
              isTransparentDark 
                ? 'border-white/20 bg-white/10 text-white hover:bg-white/20' 
                : 'border-stone-300 bg-white text-stone-900 hover:bg-stone-50'
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-4 right-4 mt-2 rounded-2xl bg-white p-4 flex flex-col gap-2 shadow-xl border border-stone-200"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { 
                  e.preventDefault(); 
                  handleNavigate(link.href);
                }}
                className="py-4 px-4 text-sm font-outfit uppercase tracking-widest font-bold text-stone-700 hover:text-white hover:bg-[#B8860B] rounded-xl transition-all text-center shadow-sm"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
