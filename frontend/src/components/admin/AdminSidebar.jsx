import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MapPin, BookOpen, Video, Image, Mail, Settings, LogOut, Landmark } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const links = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Manage Destinations', path: '/admin/destinations', icon: MapPin },
    { name: 'Manage Blogs', path: '/admin/blogs', icon: BookOpen },
    { name: 'Manage Videos', path: '/admin/videos', icon: Video },
    { name: 'Manage Gallery', path: '/admin/gallery', icon: Image },
    { name: 'Manage Messages', path: '/admin/messages', icon: Mail },
    { name: 'Profile & Settings', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-black border-r border-red-900/30 min-h-screen p-6 flex flex-col justify-between shrink-0">
      <div className="space-y-8">
        
        {/* Brand */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(220,38,38,0.6)]">
            <Video className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="font-sans font-black text-base text-white block uppercase leading-none">
              CONTENT <span className="text-red-600">HUNTER</span>
            </span>
            <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">
              Admin Portal
            </span>
          </div>
        </Link>

        {/* Nav list */}
        <nav className="space-y-1.5">
          {links.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${
                  active
                    ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="pt-6 border-t border-slate-900">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold uppercase text-red-500 hover:bg-red-600/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout Admin</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
