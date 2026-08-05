import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-dark-bg flex items-center justify-center text-center p-4">
      <div className="glass-panel p-12 rounded-3xl border border-white/10 max-w-md w-full space-y-6">
        <Compass className="w-16 h-16 text-brand-500 mx-auto animate-spin-slow" />
        <h1 className="font-serif text-4xl font-bold text-white">404 - Page Off The Map</h1>
        <p className="text-slate-400 text-xs">Looks like you wandered into uncharted territory. Let's get you back to civilization!</p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-brand-500 text-dark-bg font-bold text-sm hover:scale-105 transition-transform"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
