import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import { MapPin, Plus, RefreshCw, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    destinationsCount: 0,
    messagesCount: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [destRes, msgRes] = await Promise.all([
        api.get('/destinations'),
        api.get('/messages')
      ]);

      setStats({
        destinationsCount: destRes.data.length,
        messagesCount: msgRes.data.length
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-slate-100">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar title="Admin Dashboard" />

        <main className="p-8 space-y-8 flex-1">
          
          {/* Top Actions */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black font-sans uppercase tracking-wide text-white">
                Content Hunter <span className="text-red-600">Portal</span>
              </h2>
              <p className="text-xs text-slate-400">Add destinations with photos, names, and descriptions for users.</p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={fetchStats}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                title="Refresh Stats"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <Link
                to="/admin/destinations"
                className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs uppercase shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:scale-105 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Destination</span>
              </Link>
            </div>
          </div>

          {/* Clean Metric Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/admin/destinations"
              className="glass-panel p-6 rounded-3xl border border-red-900/30 hover:border-red-600/60 transition-all space-y-4 group bg-black/80"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-red-600/20 text-red-500">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-xs text-red-500 font-bold uppercase">Active Inventory</span>
              </div>
              <div>
                <div className="text-4xl font-black text-white font-sans">{stats.destinationsCount}</div>
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">
                  Published Destinations
                </div>
              </div>
              <div className="text-xs text-red-500 font-bold group-hover:underline flex items-center space-x-1">
                <span>Manage & Add New Places →</span>
              </div>
            </Link>

            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 bg-black/80 flex flex-col justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-red-600/20 text-red-500">
                  <Landmark className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm uppercase">Clean Foundation Ready</h3>
                  <p className="text-xs text-slate-400">All old sample data cleared out.</p>
                </div>
              </div>

              <Link
                to="/admin/destinations"
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider text-center transition-all shadow-glow block"
              >
                Add Your First Heritage Spot
              </Link>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
