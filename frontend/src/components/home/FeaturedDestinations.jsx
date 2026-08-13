import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Calendar, Star, ArrowRight } from 'lucide-react';
import api from '../../services/api';
import { CardSkeleton } from '../common/LoadingSkeleton';

const FeaturedDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/destinations?featured=true')
      .then(res => setDestinations((res.data.data || res.data).slice(0, 3)))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-slate-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>Handpicked Destinations</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
              Featured Travel Spotlights
            </h2>
          </div>
          <Link
            to="/destinations"
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-brand-500 hover:text-teal-300 font-semibold text-sm transition-colors group"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinations.map((item) => (
              <div
                key={item._id}
                className="group glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-brand-500/50 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-brand-400 text-xs font-bold uppercase tracking-wider">
                    {item.category}
                  </span>

                  {/* Rating */}
                  <div className="absolute top-4 right-4 flex items-center space-x-1 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{item.rating || 4.9}</span>
                  </div>

                  {/* Country */}
                  <div className="absolute bottom-4 left-4 flex items-center space-x-1.5 text-white font-medium text-sm">
                    <MapPin className="w-4 h-4 text-brand-500" />
                    <span>{item.country}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-brand-400 transition-colors line-clamp-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Budget & Best Time Indicators */}
                  <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center space-x-1.5 text-slate-300">
                      <DollarSign className="w-3.5 h-3.5 text-brand-500" />
                      <span className="truncate">{item.travelBudget}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-brand-500" />
                      <span className="truncate">{item.bestTime}</span>
                    </div>
                  </div>

                  <Link
                    to={`/destinations/${item.slug || item._id}`}
                    className="w-full mt-4 py-3 rounded-xl bg-white/5 hover:bg-brand-500 hover:text-dark-bg text-white font-semibold text-xs text-center transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Read Full Travel Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default FeaturedDestinations;
