import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, MapPin, Calendar, Video, Image as ImageIcon, ExternalLink, X } from 'lucide-react';
import placesApi from '../services/api';

const getImageUrl = (url) => {
  if (!url) return '/content_hunter_logo_transparent.png';
  if (url.startsWith('/uploads/')) {
    const baseUrl = (import.meta.env.VITE_API_URL || '/api').replace(/\/api$/, '');
    return `${baseUrl}${url}`;
  }
  return url;
};

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  let id = '';
  if (url.includes('youtube.com/watch?v=')) id = url.split('v=')[1]?.split('&')[0];
  else if (url.includes('youtu.be/'))       id = url.split('youtu.be/')[1]?.split('?')[0];
  else if (url.includes('youtube.com/embed/')) return url;
  return id ? `https://www.youtube.com/embed/${id}` : null;
};

function PlaceCard({ place, onView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col group h-full bg-white rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-xl border border-stone-100 hover:border-[#B8860B]/30"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F3F1ED]">
        <img
          src={getImageUrl(place.coverImage)}
          alt={place.placeName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
        
        {place.dateVisited && (
          <div className="absolute top-4 right-4 flex items-center gap-2 text-[10px] font-outfit uppercase tracking-widest font-bold bg-white/90 backdrop-blur-md text-[#B8860B] px-4 py-2 rounded-full border border-white/50 shadow-sm">
            <Calendar className="w-3 h-3" />
            {new Date(place.dateVisited).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-8 text-center relative z-20 -mt-12 bg-gradient-to-b from-transparent via-white to-white">
        <h3 className="font-cinzel text-2xl font-bold text-stone-900 group-hover:text-[#B8860B] transition-all duration-300 line-clamp-2 mb-3">
          {place.placeName}
        </h3>
        
        {place.description ? (
          <p className="text-stone-600 font-outfit text-sm font-light leading-[1.8] line-clamp-2 flex-1 mb-8">
            {place.description}
          </p>
        ) : (
          <div className="flex-1 mb-8" />
        )}

        <div className="mt-auto">
          <button
            onClick={() => onView(place)}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-[#B8860B]/50 text-[#B8860B] hover:bg-[#B8860B] hover:text-white font-outfit text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-md"
          >
            Explore
          </button>
        </div>
      </div>
    </motion.div>
  );
}



export default function PublicPlaces({ isHomePage = false }) {
  const navigate = useNavigate();
  const [places,   setPlaces]   = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [showAll,  setShowAll]  = useState(false);

  const fetchPlaces = useCallback(async () => {
    try {
      setLoading(true); setError(null);
      let res;
      try { res = await placesApi.getAll(); }
      catch { const r = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/places`); res = await r.json(); }
      if (res?.success) setPlaces(res.data || []);
      else setError(res?.message || 'Could not fetch places.');
    } catch { setError('Could not reach the server.'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchPlaces(); }, [fetchPlaces]);

  const displayPlaces = (isHomePage && !showAll) ? places.slice(0, 3) : places;

  return (
    <>
      <section id="places" className="relative w-full flex flex-col justify-center bg-[#FAFAFA] py-24 md:py-32 overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-[#B8860B]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#B8860B]" />
            <span className="text-[10px] font-outfit font-bold uppercase tracking-[0.3em] text-[#B8860B]">
              Chronicles
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#B8860B]" />
          </div>
          
          <h2 className="font-cinzel text-5xl sm:text-6xl lg:text-7xl font-black text-stone-900 leading-tight mb-8 drop-shadow-sm">
            Expedition <span className="text-gradient-gold italic">Archives</span>
          </h2>
          
          <p className="text-stone-600 font-outfit text-lg max-w-2xl font-light leading-relaxed">
            A carefully curated collection of our cinematic journeys through time and space. Discover the forgotten monuments and untold stories.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center gap-6 py-32">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-t-2 border-[#B8860B] animate-spin" />
              <div className="absolute inset-2 rounded-full border-b-2 border-stone-200 animate-spin-reverse" />
              <Compass className="absolute inset-0 m-auto w-6 h-6 text-[#B8860B]" />
            </div>
            <span className="text-stone-400 font-outfit uppercase tracking-widest text-xs font-bold animate-pulse">Unearthing Archives...</span>
          </div>
        ) : error ? (
          <div className="py-16 max-w-md mx-auto text-center p-8 rounded-2xl bg-white border border-red-200 shadow-sm">
            <p className="text-red-500 text-sm font-outfit font-medium mb-6">{error}</p>
            <button onClick={fetchPlaces} className="px-8 py-3 rounded-full border border-[#B8860B]/50 text-[#B8860B] hover:bg-[#B8860B] hover:text-white font-outfit text-xs font-bold uppercase tracking-widest transition-all shadow-sm">
              Retry Connection
            </button>
          </div>
        ) : places.length === 0 ? (
          <div className="flex flex-col items-center text-center py-20 px-4 bg-white rounded-3xl border border-stone-200 shadow-sm">
            <Compass className="w-16 h-16 text-stone-300 mb-6" />
            <h3 className="font-cinzel text-3xl font-bold text-stone-900 mb-4">Archives Empty</h3>
            <p className="text-stone-600 font-outfit max-w-md leading-relaxed">
              Our cinematic expeditions are currently underway. The archives will be updated shortly with new discoveries.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
              {displayPlaces.map((place) => (
                <PlaceCard key={place._id} place={place} onView={(p) => navigate('/place/' + p._id)} />
              ))}
            </div>

            {isHomePage && places.length > 3 && !showAll && (
              <div className="mt-20 flex justify-center">
                <button
                  onClick={() => {
                    if (showAll) {
                      setShowAll(false);
                      document.getElementById('places')?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      setShowAll(true);
                    }
                  }}
                  className="px-10 py-4 bg-[#B8860B] hover:bg-[#8B6508] text-white font-outfit text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 hover:scale-105 shadow-md inline-block text-center"
                >
                  {showAll ? 'View Less' : 'View Complete Archives'}
                </button>
              </div>
            )}
          </>
        )}
      </div>


    </section>
      
      {/* Floating View Less Button */}
      <AnimatePresence>
        {isHomePage && showAll && (
          <motion.button
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            onClick={() => {
              setShowAll(false);
              document.getElementById('places')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="fixed bottom-8 right-8 z-[100] px-6 py-4 bg-[#B8860B] hover:bg-[#8B6508] text-white font-outfit text-xs font-bold uppercase tracking-widest rounded-full transition-colors shadow-lg flex items-center gap-2"
          >
            <X className="w-4 h-4" /> View Less
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
