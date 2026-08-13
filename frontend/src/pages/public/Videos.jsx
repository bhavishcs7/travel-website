import React, { useState, useEffect } from 'react';
import { Play, Youtube, Instagram, ExternalLink } from 'lucide-react';
import api from '../../services/api';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    api.get('/videos')
      .then(res => setVideos(res.data.data || res.data))
      .catch(err => console.error(err));
  }, []);

  const filtered = filterType === 'all' ? videos : videos.filter(v => v.type === filterType);

  return (
    <div className="pt-28 pb-20 bg-dark-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-semibold uppercase tracking-wider">
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Cinematic Showcase</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white">
            Travel Videos & Instagram Reels
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            Watch full 4K YouTube documentary vlogs and short viral Instagram Reels from high altitude drone angles.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-center space-x-3">
          <button
            onClick={() => setFilterType('all')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              filterType === 'all' ? 'bg-brand-500 text-dark-bg shadow-glow' : 'glass-panel text-slate-300 hover:text-white'
            }`}
          >
            All Videos ({videos.length})
          </button>
          <button
            onClick={() => setFilterType('youtube')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              filterType === 'youtube' ? 'bg-red-500 text-white shadow-glow' : 'glass-panel text-slate-300 hover:text-white'
            }`}
          >
            <Youtube className="w-4 h-4" />
            <span>YouTube Vlogs</span>
          </button>
          <button
            onClick={() => setFilterType('instagram')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              filterType === 'instagram' ? 'bg-pink-500 text-white shadow-glow' : 'glass-panel text-slate-300 hover:text-white'
            }`}
          >
            <Instagram className="w-4 h-4" />
            <span>Instagram Reels</span>
          </button>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((vid) => (
            <div
              key={vid._id}
              className="glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-brand-500/40 transition-all duration-300 group"
            >
              <div className="relative aspect-video bg-slate-950">
                {vid.type === 'youtube' ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${vid.embedId}`}
                    title={vid.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  ></iframe>
                ) : (
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-tr from-purple-900 via-pink-900 to-slate-950">
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-30"
                    />
                    <div className="relative z-10 space-y-3">
                      <Instagram className="w-12 h-12 text-pink-400 mx-auto animate-pulse" />
                      <h4 className="text-white font-bold text-base max-w-xs">{vid.title}</h4>
                      <a
                        href={vid.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block px-5 py-2 rounded-xl bg-pink-500 text-white text-xs font-bold hover:bg-pink-600 shadow-glow"
                      >
                        Play Reel on Instagram
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-brand-400">
                    {vid.location} • {vid.views}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-brand-400 transition-colors line-clamp-1 mt-1">
                    {vid.title}
                  </h3>
                </div>
                <a
                  href={vid.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white/5 hover:bg-brand-500 hover:text-dark-bg text-slate-300 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Videos;
