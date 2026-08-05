import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-hidden">
      {/* Back to Home Button */}
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-8 left-8 group flex items-center gap-2 text-stone-500 hover:text-[#B8860B] font-outfit text-xs font-bold uppercase tracking-widest transition-colors z-50 focus:outline-none"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
      </button>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[1000px] min-h-[600px] flex flex-col md:flex-row shadow-2xl rounded-sm overflow-hidden bg-white border border-stone-200 relative z-10"
      >
        {/* Left Side - Visual Illustration */}
        <div className="relative w-full md:w-1/2 bg-[#FAFAFA] hidden md:block z-20">
          <img 
            src="/assets/login_illustration.jpg"
            alt="Login Illustration"
            className="w-full h-full object-cover object-center absolute inset-0"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-6 sm:px-12 py-12 md:py-16 relative">
          
          {/* The White Login Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="w-full max-w-[380px] mx-auto bg-white border border-stone-200 rounded-xl shadow-md p-8 sm:p-10 relative z-30"
          >
            {/* Form Only - perfectly centered vertically via padding */}
            {/* Error Alert */}
            {error && (
              <div className="mb-6 p-3 rounded bg-red-50 border border-red-100 text-red-600 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-0">
              
              {/* Email Input */}
              <div className="relative border-b border-stone-200 group mb-6">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full h-14 bg-transparent text-sm font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:border-b-2 focus:border-[#B8860B] transition-colors px-1"
                />
              </div>

              {/* Password Input */}
              <div className="relative border-b border-stone-200 group mb-8">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-14 bg-transparent text-sm font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:border-b-2 focus:border-[#B8860B] transition-colors px-1"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 mt-8 bg-[#B8860B] hover:bg-[#8B6508] text-white text-[11px] font-bold tracking-widest uppercase rounded-sm flex items-center justify-center transition-colors shadow-md focus:outline-none"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
