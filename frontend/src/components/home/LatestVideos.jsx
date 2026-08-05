import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Youtube, Instagram, ExternalLink } from 'lucide-react';
import api from '../../services/api';

const LatestVideos = () => {
  const [videos, setVideos] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    api.get('/videos')
      .then(res => setVideos(res.data.slice(0, 4)))
      .catch(err => console.error(err));
  }, []);

  const filteredVideos = activeTab === 'all' ? videos : videos.filter(v => v.type === activeTab);

  return (
    <section className="py-20 bg-dark-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Cinematic Media</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
              Latest Vlogs & Reels
            </h2>
          </div>

          <div className="flex items-center space-x-2 mt-6 md:mt-0 glass-panel p-1.5 rounded-2xl border-white/10">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all' ? 'bg-brand-500 text-dark-bg shadow-glow' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Media
            </button>
            <button
              onClick={() => setActiveTab('youtube')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'youtube' ? 'bg-red-500 text-white shadow-glow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Youtube className="w-4 h-4" />
              <span>YouTube</span>
            </button>
            <button
              onClick={() => setActiveTab('instagram')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'instagram' ? 'bg-pink-500 text-white shadow-glow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Instagram className="w-4 h-4" />
              <span>Reels</span>
            </button>
          </div>
        </div>

        {/* Video Embed Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredVideos.map((vid) => (
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
                  <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                      <a
                        href={vid.url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-16 h-16 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-glow hover:scale-110 transition-transform"
                      >
                        <Instagram className="w-8 h-8" />
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
                  title="Watch Source"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default LatestVideos;
