import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminNavbar = ({ title }) => {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-black/90 border-b border-red-900/30 px-8 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md">
      <div>
        <h1 className="text-lg font-black text-white font-sans uppercase tracking-wide">{title}</h1>
        <p className="text-xs text-slate-400">Content Hunter CMS</p>
      </div>

      <div className="flex items-center space-x-4">
        <Link
          to="/"
          target="_blank"
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold border border-slate-800"
        >
          <Globe className="w-3.5 h-3.5 text-red-500" />
          <span>View Live Site</span>
        </Link>

        <div className="flex items-center space-x-3 pl-4 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center font-bold text-xs text-white">
            CH
          </div>
          <div className="hidden sm:block">
            <div className="text-xs font-bold text-white">{user?.name || 'Content Hunter Admin'}</div>
            <div className="text-[10px] text-red-500 font-bold uppercase">Administrator</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
