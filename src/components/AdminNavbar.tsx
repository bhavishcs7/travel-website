import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, LogOut, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminNavbar() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 shadow-sm bg-white/95 border-b border-stone-200 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col text-left">
            <span className="font-cinzel text-lg font-black tracking-widest text-stone-900">
              CONTENT <span className="text-[#B8860B]">HUNTER</span>
            </span>
            <span className="text-[10px] font-outfit text-stone-500 font-semibold uppercase tracking-[0.2em] flex items-center gap-1">
              <Shield className="w-3 h-3 text-[#B8860B]" /> Admin Portal
            </span>
          </div>
        </div>

        {/* Admin Actions & Logout */}
        <div className="flex items-center gap-6">
          {admin && (
            <span className="hidden sm:inline-block text-xs font-semibold text-stone-500 font-outfit">
              Logged in as <strong className="text-stone-900">{admin.email}</strong>
            </span>
          )}

          <button
            onClick={() => navigate('/')}
            className="px-5 py-2.5 rounded-xl bg-transparent hover:bg-stone-50 border border-transparent hover:border-stone-200 text-stone-500 hover:text-stone-900 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">View Site</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-xl bg-[#F3F1ED] hover:bg-stone-100 border border-[#B8860B]/30 text-[#B8860B] text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow-md"
          >
            <LogOut className="w-4 h-4 text-[#B8860B]" />
            <span>Logout</span>
          </button>
        </div>

      </div>
    </header>
  );
}
