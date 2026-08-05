import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, DollarSign, Calendar, Star, Youtube, Instagram, ArrowLeft, Image as ImageIcon, Map } from 'lucide-react';
import api from '../../services/api';
import { DetailSkeleton } from '../../components/common/LoadingSkeleton';
import Lightbox from '../../components/common/Lightbox';

const DestinationDetails = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    api.get(`/destinations/${id}`)
      .then(res => setDestination(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <DetailSkeleton />;

  if (!destination) {
    return (
      <div className="pt-32 pb-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Destination Not Found</h2>
        <Link to="/destinations" className="text-brand-500 hover:underline">Back to Destinations</Link>
      </div>
    );
  }

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const youtubeEmbed = getYoutubeEmbedUrl(destination.youtubeUrl);

  return (
    <div className="pt-24 pb-20 bg-dark-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back Link */}
        <Link
          to="/destinations"
          className="inline-flex items-center space-x-2 text-slate-400 hover:text-brand-500 text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Destinations</span>
        </Link>

        {/* Hero Cover Header */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 h-[450px]">
          <img
            src={destination.coverImage}
            alt={destination.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent"></div>

          <div className="absolute bottom-8 left-8 right-8 space-y-3">
            <div className="flex items-center space-x-3">
              <span className="px-3.5 py-1 rounded-full bg-brand-500 text-dark-bg text-xs font-bold uppercase tracking-wider">
                {destination.category}
              </span>
              <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-slate-950/80 text-amber-400 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{destination.rating || 4.9}</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
              {destination.title}
            </h1>

            <div className="flex items-center space-x-2 text-slate-300 text-sm font-medium">
              <MapPin className="w-4 h-4 text-brand-500" />
              <span>{destination.country} {destination.state ? `• ${destination.state}` : ''}</span>
            </div>
          </div>
        </div>

        {/* Key Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl border-white/10 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <div className="text-slate-400 text-xs font-semibold uppercase">Estimated Budget</div>
              <div className="text-white font-bold text-base">{destination.travelBudget}</div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border-white/10 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="text-slate-400 text-xs font-semibold uppercase">Best Season</div>
              <div className="text-white font-bold text-base">{destination.bestTime}</div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border-white/10 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <Map className="w-6 h-6" />
            </div>
            <div>
              <div className="text-slate-400 text-xs font-semibold uppercase">Google Location</div>
              <a
                href={destination.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(destination.title)}`}
                target="_blank"
                rel="noreferrer"
                className="text-brand-400 hover:underline font-bold text-sm"
              >
                Open Google Maps 🗺️
              </a>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10 space-y-4">
          <h2 className="font-serif text-2xl font-bold text-white">About {destination.title}</h2>
          <p className="text-slate-300 text-base leading-relaxed whitespace-pre-line">
            {destination.description}
          </p>
        </div>

        {/* Media Embeds: YouTube & Instagram */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* YouTube Video */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center space-x-2 text-red-500 font-bold text-sm">
              <Youtube className="w-5 h-5" />
              <span>YouTube Video Feature</span>
            </div>
            {youtubeEmbed ? (
              <div className="aspect-video rounded-2xl overflow-hidden bg-slate-950">
                <iframe
                  src={youtubeEmbed}
                  title={destination.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                ></iframe>
              </div>
            ) : (
              <div className="aspect-video rounded-2xl bg-slate-900 flex items-center justify-center text-slate-500 text-xs">
                No YouTube video linked yet.
              </div>
            )}
          </div>

          {/* Instagram Reel */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center space-x-2 text-pink-500 font-bold text-sm">
              <Instagram className="w-5 h-5" />
              <span>Instagram Reel Preview</span>
            </div>
            {destination.instagramReelUrl ? (
              <div className="aspect-video rounded-2xl bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-4">
                <Instagram className="w-12 h-12 text-pink-500 animate-bounce" />
                <p className="text-slate-300 text-xs">Watch our viral reel from {destination.title}</p>
                <a
                  href={destination.instagramReelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-2.5 rounded-xl bg-pink-500 text-white font-bold text-xs hover:bg-pink-600 transition-colors shadow-glow"
                >
                  Watch Reel on Instagram
                </a>
              </div>
            ) : (
              <div className="aspect-video rounded-2xl bg-slate-900 flex items-center justify-center text-slate-500 text-xs">
                No Instagram reel linked yet.
              </div>
            )}
          </div>
        </div>

        {/* Destination Image Gallery */}
        {destination.images && destination.images.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-white font-serif text-2xl font-bold">
              <ImageIcon className="w-6 h-6 text-brand-500" />
              <span>Photo Gallery</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {destination.images.map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage({ imageUrl: imgUrl, title: destination.title, location: destination.country })}
                  className="group rounded-2xl overflow-hidden cursor-pointer aspect-video bg-slate-900 border border-white/10"
                >
                  <img
                    src={imgUrl}
                    alt={`${destination.title} photo ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <Lightbox item={selectedImage} onClose={() => setSelectedImage(null)} />
      </div>
    </div>
  );
};

export default DestinationDetails;
