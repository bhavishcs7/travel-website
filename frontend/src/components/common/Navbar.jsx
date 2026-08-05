import React from 'react';
import { Link } from 'react-router-dom';
import { Video, User, Youtube, Instagram } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo - Content Hunter Style */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-2xl bg-red-600 border-2 border-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.6)] group-hover:scale-105 transition-transform duration-300">
            <Video className="w-5 h-5 text-white fill-current" />
          </div>
          <div>
            <div className="font-sans font-black tracking-wider text-lg sm:text-xl text-white uppercase flex items-center leading-none">
              <span>CONTENT</span>
              <span className="text-red-600 ml-1.5 font-black">HUNTER</span>
            </div>
            <span className="block text-[9px] tracking-widest text-slate-400 font-bold uppercase mt-1">
              ನಿಮ್ಮ ಹುಡುಕಾಟ ಇಲ್ಲಿಗೆ ಮುಗಿಯುತ್ತದೆ
            </span>
          </div>
        </Link>

        {/* Right Action Controls */}
        <div className="flex items-center space-x-3">
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl text-slate-300 hover:text-red-500 hover:bg-white/10 transition-colors"
            title="YouTube Channel"
          >
            <Youtube className="w-5 h-5" />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl text-slate-300 hover:text-pink-500 hover:bg-white/10 transition-colors"
            title="Instagram Reels"
          >
            <Instagram className="w-5 h-5" />
          </a>

          <Link
            to="/admin/dashboard"
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all hover:scale-105"
          >
            <User className="w-3.5 h-3.5" />
            <span>Admin</span>
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
