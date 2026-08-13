import React, { useState, useEffect } from 'react';
import { Camera, Maximize2, Tag } from 'lucide-react';
import api from '../../services/api';
import Lightbox from '../../components/common/Lightbox';

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const categories = ['All', 'Landscape', 'Culture', 'Aerial', 'Urban', 'Wildlife', 'Portrait'];

  useEffect(() => {
    fetchGallery();
  }, [selectedCategory]);

  const fetchGallery = () => {
    let url = '/gallery';
    if (selectedCategory !== 'All') url += `?category=${selectedCategory}`;
    api.get(url)
      .then(res => setItems(res.data.data || res.data))
      .catch(err => console.error(err));
  };

  return (
    <div className="pt-28 pb-20 bg-dark-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Photography Collection</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white">
            High Resolution Photo Gallery
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            Click on any photo to launch the full-screen interactive lightbox viewer.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-brand-500 text-dark-bg shadow-glow'
                  : 'glass-panel text-slate-300 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Masonry Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {items.map((item) => (
            <div
              key={item._id}
              onClick={() => setSelectedPhoto(item)}
              className="break-inside-avoid relative group rounded-3xl overflow-hidden cursor-pointer bg-slate-900 border border-white/10 shadow-lg"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                <div className="self-end p-2.5 rounded-2xl bg-slate-950/80 text-white">
                  <Maximize2 className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-brand-400 font-bold uppercase tracking-wider">
                    {item.category} • {item.location}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Lightbox item={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      </div>
    </div>
  );
};

export default Gallery;
