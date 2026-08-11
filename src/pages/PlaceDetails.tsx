// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Video, Image as ImageIcon, MapPin, ExternalLink, ChevronLeft, ChevronRight, Map, Compass, Clock, History, Loader2, ArrowLeft } from 'lucide-react';

const API_PLACES = `${import.meta.env.VITE_API_URL || '/api'}/places`;

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

export default function PlaceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPlace = async () => {
      try {
        const res = await fetch(`${API_PLACES}/${id}`);
        const data = await res.json();
        if (data.success) {
          setPlace(data.data);
        } else {
          setError(data.message || 'Place not found');
        }
      } catch (err) {
        setError('Error connecting to the server');
      } finally {
        setLoading(false);
      }
    };
    fetchPlace();
  }, [id]);

  const handlePrevImg = React.useCallback(() => {
    if (!place) return;
    const allImages = [place.coverImage, ...(place.galleryImages || [])].filter(Boolean);
    if (allImages.length <= 1) return;
    setActiveImg((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  }, [place]);

  const handleNextImg = React.useCallback(() => {
    if (!place) return;
    const allImages = [place.coverImage, ...(place.galleryImages || [])].filter(Boolean);
    if (allImages.length <= 1) return;
    setActiveImg((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  }, [place]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrevImg();
      if (e.key === 'ArrowRight') handleNextImg();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevImg, handleNextImg]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center pt-20">
        <Loader2 className="w-10 h-10 animate-spin text-[#B8860B] mb-4" />
        <span className="text-[#B8860B] font-outfit uppercase tracking-widest text-sm font-bold">Unearthing Data...</span>
      </div>
    );
  }

  if (error || !place) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center pt-20 px-4 text-center">
        <Compass className="w-16 h-16 text-red-500 mb-6" />
        <h2 className="font-cinzel text-3xl text-stone-900 font-bold mb-4">Discovery Failed</h2>
        <p className="text-stone-600 font-outfit mb-8 max-w-md leading-relaxed">{error || 'The requested archive could not be located.'}</p>
        <button onClick={() => navigate('/places')} className="px-8 py-3 rounded-full border border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-white font-outfit text-xs font-bold uppercase tracking-widest transition-all">
          Return to Archives
        </button>
      </div>
    );
  }

  const allImages = [place.coverImage, ...(place.galleryImages || [])].filter(Boolean);
  const embedUrl  = getYouTubeEmbedUrl(place.youtubeLink);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-stone-900 pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-10">
          <button onClick={() => navigate('/')} className="group flex items-center gap-2 text-stone-500 hover:text-[#B8860B] font-outfit text-xs font-bold uppercase tracking-widest transition-colors mb-8 focus:outline-none">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
          </button>
          
          <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl font-black text-stone-900 leading-tight mb-6 drop-shadow-sm">
            {place.placeName}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-xs font-outfit uppercase tracking-widest font-bold text-[#B8860B]">
            {place.dateVisited && (
              <span className="flex items-center gap-2 bg-[#F3F1ED] px-4 py-2 rounded-full border border-stone-200 shadow-sm">
                <Calendar className="w-4 h-4" />
                {new Date(place.dateVisited).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            )}
            {place.category && (
              <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-200 text-stone-600">
                <Compass className="w-4 h-4" />
                {place.category}
              </span>
            )}
          </div>
        </motion.div>

        {/* Hero Media Gallery */}
        {allImages.length > 0 && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="space-y-6 mb-16">
            <div className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden bg-[#F3F1ED] shadow-md border border-stone-200 group">
              <img src={getImageUrl(allImages[activeImg])} alt={place.placeName} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              
              {allImages.length > 1 && (
                <>
                  <button onClick={handlePrevImg} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-white/60 hover:bg-[#B8860B] border border-white/50 hover:border-[#B8860B] text-stone-900 hover:text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none shadow-sm">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button onClick={handleNextImg} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-white/60 hover:bg-[#B8860B] border border-white/50 hover:border-[#B8860B] text-stone-900 hover:text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none shadow-sm">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
            
            {allImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative w-32 md:w-40 h-20 md:h-24 rounded-2xl overflow-hidden shrink-0 border-2 transition-all duration-300 snap-start focus:outline-none ${
                      activeImg === i ? 'border-[#B8860B] shadow-sm scale-100' : 'border-transparent opacity-50 hover:opacity-100 hover:border-stone-400 scale-95 hover:scale-100'
                    }`}
                  >
                    <img src={getImageUrl(img)} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            
            {place.description && (
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <h3 className="font-outfit uppercase tracking-[0.2em] font-bold text-[#B8860B] text-sm mb-6 flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-[#B8860B]" /> Description
                </h3>
                <p className="text-stone-700 font-outfit text-lg font-light leading-[2] whitespace-pre-line bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
                  {place.description}
                </p>
              </motion.section>
            )}

            {place.history && (
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
                <h3 className="font-outfit uppercase tracking-[0.2em] font-bold text-[#B8860B] text-sm mb-6 flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-[#B8860B]" /> History
                </h3>
                <p className="text-stone-700 font-outfit text-lg font-light leading-[2] whitespace-pre-line bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
                  {place.history}
                </p>
              </motion.section>
            )}

            {place.youtubeLink && (
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
                <h3 className="font-outfit uppercase tracking-[0.2em] font-bold text-[#B8860B] text-sm mb-6 flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-[#B8860B]" /> Cinematic Feature
                </h3>
                {embedUrl ? (
                  <div className="relative aspect-video rounded-3xl overflow-hidden shadow-md border border-stone-200">
                    <iframe src={embedUrl} title={place.placeName} className="absolute inset-0 w-full h-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  </div>
                ) : (
                  <a href={place.youtubeLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-8 py-6 rounded-3xl bg-white border border-stone-200 hover:border-red-500/50 hover:bg-red-50 text-stone-900 transition-all group shadow-sm focus:outline-none">
                    <span className="font-outfit font-bold uppercase tracking-widest text-sm flex items-center gap-4">
                      <Video className="w-6 h-6 text-red-500" /> Watch Full Video on YouTube
                    </span>
                    <ExternalLink className="w-5 h-5 group-hover:text-red-500 transition-colors" />
                  </a>
                )}
              </motion.section>
            )}

          </div>

          {/* Sidebar Area */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="space-y-8">
            
            {/* Essential Info Card */}
            <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
              <h3 className="font-outfit uppercase tracking-[0.2em] font-bold text-stone-900 text-xs mb-8 flex items-center gap-3 pb-4 border-b border-stone-100">
                <Compass className="w-4 h-4 text-[#B8860B]" /> Essential Information
              </h3>
              
              <ul className="space-y-6">
                {(place.state || place.district) && (
                  <li className="flex items-start gap-4">
                    <Map className="w-5 h-5 text-[#B8860B] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest mb-1">Location</p>
                      <p className="text-stone-700 font-outfit text-sm font-light">
                        {[place.district, place.state].filter(Boolean).join(', ')}
                      </p>
                    </div>
                  </li>
                )}
                {place.bestTimeToVisit && (
                  <li className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-[#B8860B] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest mb-1">Best Time To Visit</p>
                      <p className="text-stone-700 font-outfit text-sm font-light">{place.bestTimeToVisit}</p>
                    </div>
                  </li>
                )}
              </ul>
            </div>

            {/* External Links */}
            {(place.googleMapsLink || place.instagramLink) && (
              <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
                {place.googleMapsLink && (
                  <a href={place.googleMapsLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-6 py-4 rounded-2xl bg-[#F3F1ED] hover:bg-blue-50 hover:border-blue-200 border border-stone-200 text-stone-600 hover:text-stone-900 transition-all group focus:outline-none">
                    <span className="flex items-center gap-3 font-outfit font-bold uppercase tracking-widest text-[11px]">
                      <MapPin className="w-4 h-4 group-hover:text-blue-500 transition-colors" /> View on Maps
                    </span>
                    <ExternalLink className="w-3 h-3 group-hover:text-blue-500" />
                  </a>
                )}
                {place.instagramLink && (
                  <a href={place.instagramLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-6 py-4 rounded-2xl bg-[#F3F1ED] hover:bg-pink-50 hover:border-pink-200 border border-stone-200 text-stone-600 hover:text-stone-900 transition-all group focus:outline-none">
                    <span className="flex items-center gap-3 font-outfit font-bold uppercase tracking-widest text-[11px]">
                      <ImageIcon className="w-4 h-4 group-hover:text-pink-500 transition-colors" /> View Reel
                    </span>
                    <ExternalLink className="w-3 h-3 group-hover:text-pink-500" />
                  </a>
                )}
              </div>
            )}
            
          </motion.div>

        </div>
      </div>
    </div>
  );
}
