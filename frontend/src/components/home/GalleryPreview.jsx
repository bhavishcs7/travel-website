import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Maximize2, ArrowRight } from 'lucide-react';
import api from '../../services/api';
import Lightbox from '../common/Lightbox';

const GalleryPreview = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    api.get('/gallery')
      .then(res => setPhotos((res.data.data || res.data).slice(0, 6)))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="py-20 bg-dark-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>Visual Gallery</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
              Moments Frozen in Time
            </h2>
          </div>
          <Link
            to="/gallery"
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-brand-500 hover:text-teal-300 font-semibold text-sm transition-colors group"
          >
            <span>Explore Full Gallery</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Masonry Preview Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {photos.map((item) => (
            <div
              key={item._id}
              onClick={() => setSelectedPhoto(item)}
              className="relative group rounded-2xl overflow-hidden cursor-pointer aspect-square bg-slate-900 border border-white/10"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <div className="self-end p-2 rounded-xl bg-slate-950/80 text-white">
                  <Maximize2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-brand-400 font-bold uppercase tracking-wider">
                    {item.location}
                  </span>
                  <h4 className="font-serif text-base font-bold text-white line-clamp-1">
                    {item.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Lightbox item={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      </div>
    </section>
  );
};

export default GalleryPreview;
