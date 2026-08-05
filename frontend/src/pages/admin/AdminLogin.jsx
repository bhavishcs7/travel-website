import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Video, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@contenthunter.com');
  const [password, setPassword] = useState('Password123!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="glass-panel max-w-md w-full p-8 md:p-10 rounded-3xl border border-red-900/30 space-y-6 relative z-10 shadow-2xl bg-black/90">
        
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-red-600 border-2 border-white/20 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(220,38,38,0.7)]">
            <Video className="w-7 h-7 text-white fill-current" />
          </div>
          <h1 className="font-sans font-black text-2xl uppercase tracking-wider text-white">
            CONTENT <span className="text-red-600">HUNTER</span> ADMIN
          </h1>
          <p className="text-slate-400 text-xs">Protected Admin Portal - Restricted Access</p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(220,38,38,0.6)] hover:scale-[1.02] flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In To Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <div className="flex items-center space-x-1 font-bold text-red-500">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Login Access:</span>
          </div>
          <div>Email: <code className="text-white">admin@contenthunter.com</code></div>
          <div>Password: <code className="text-white">Password123!</code></div>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
