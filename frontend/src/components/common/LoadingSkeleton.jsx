import React from 'react';

export const CardSkeleton = () => (
  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-4 animate-pulse">
    <div className="w-full h-52 bg-slate-800 rounded-xl"></div>
    <div className="h-5 bg-slate-800 rounded w-3/4"></div>
    <div className="h-4 bg-slate-800 rounded w-1/2"></div>
    <div className="h-16 bg-slate-800 rounded w-full"></div>
  </div>
);

export const DetailSkeleton = () => (
  <div className="max-w-5xl mx-auto px-4 py-24 space-y-8 animate-pulse">
    <div className="w-full h-96 bg-slate-800 rounded-3xl"></div>
    <div className="h-8 bg-slate-800 rounded w-2/3"></div>
    <div className="h-4 bg-slate-800 rounded w-1/3"></div>
    <div className="space-y-3">
      <div className="h-4 bg-slate-800 rounded w-full"></div>
      <div className="h-4 bg-slate-800 rounded w-full"></div>
      <div className="h-4 bg-slate-800 rounded w-4/5"></div>
    </div>
  </div>
);

export default CardSkeleton;
