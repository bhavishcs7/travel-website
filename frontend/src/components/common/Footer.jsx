import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, Youtube, Instagram, Twitter, Mail, Landmark, Compass, Send } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-black text-slate-300 border-t border-red-900/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-red-600 border border-white/20 flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.6)]">
                <Video className="w-5 h-5 text-white fill-current" />
              </div>
              <div>
                <span className="font-sans font-black text-xl text-white uppercase leading-none block">
                  CONTENT <span className="text-red-600">HUNTER</span>
                </span>
              </div>
            </Link>
            <p className="text-red-500 font-bold text-xs">
              ನಿಮ್ಮ ಹುಡುಕಾಟ ಇಲ್ಲಿಗೆ ಮುಗಿಯುತ್ತದೆ
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              Unfolding hidden historical stories, exploring heritage, and documenting ancient architectural marvels.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-black text-xs uppercase tracking-wider border-b border-red-900/40 pb-2">
              Heritage Navigation
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li><Link to="/destinations" className="hover:text-red-500 transition-colors">Historical Places</Link></li>
              <li><Link to="/about" className="hover:text-red-500 transition-colors">About Content Hunter</Link></li>
              <li><Link to="/blogs" className="hover:text-red-500 transition-colors">Heritage Blogs & Guides</Link></li>
              <li><Link to="/videos" className="hover:text-red-500 transition-colors">YouTube Vlogs & Reels</Link></li>
              <li><Link to="/gallery" className="hover:text-red-500 transition-colors">Photo Portfolio</Link></li>
            </ul>
          </div>

          {/* Pillars */}
          <div className="space-y-3">
            <h4 className="text-white font-black text-xs uppercase tracking-wider border-b border-red-900/40 pb-2">
              Core Pillars
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-300">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                <span>🏛️ Historical Places</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                <span>📷 Exploring Heritage</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                <span>📍 Hidden Stories Unfolded</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Sub */}
          <div className="space-y-3">
            <h4 className="text-white font-black text-xs uppercase tracking-wider border-b border-red-900/40 pb-2">
              Heritage Dispatch
            </h4>
            <p className="text-slate-400 text-xs">
              Subscribe to get notified when new historical vlogs & articles are published.
            </p>
            {subscribed ? (
              <div className="p-3 rounded-xl bg-red-600/20 text-red-400 text-xs font-bold border border-red-500/40">
                ✓ Subscribed! Welcome to the Content Hunter trail.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-glow transition-all"
                >
                  Join The Journey
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} <span className="text-white font-bold">CONTENT HUNTER</span>. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-red-500">YouTube</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500">Instagram</a>
            <Link to="/admin/login" className="hover:text-white">Admin Portal</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
