import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Landmark } from 'lucide-react';
import api from '../../services/api';
import { CardSkeleton } from '../../components/common/LoadingSkeleton';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = () => {
    setLoading(true);
    api.get('/destinations')
      .then(res => setDestinations(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="pt-28 pb-20 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-500 text-xs font-bold uppercase tracking-wider">
            <Landmark className="w-4 h-4" />
            <span>Content Hunter Explorer</span>
          </div>
          <h1 className="font-sans font-black text-4xl sm:text-6xl uppercase tracking-tight text-white">
            Historical Places & Heritage
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Explore heritage spots, ancient architecture, and hidden stories added by Content Hunter.
          </p>
        </div>

        {/* Destinations Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : destinations.length === 0 ? (
          <div className="glass-panel p-16 rounded-3xl text-center space-y-4 border border-red-900/30 bg-black/80 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center mx-auto">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-wide">No Destinations Added Yet</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              The database is clean! Login as Admin at <code className="text-red-500">/admin/login</code> to add destination photos, names, and descriptions. They will automatically display here for users.
            </p>
            <Link
              to="/admin/login"
              className="inline-block px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-glow transition-all"
            >
              Login as Admin to Add Content
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinations.map((item) => (
              <div
                key={item._id}
                className="group glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-red-600/60 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between bg-black/90"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.coverImage || 'https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&q=80&w=800'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  
                  {item.category && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-red-500 text-xs font-bold uppercase">
                      {item.category}
                    </span>
                  )}
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-sans font-black text-xl text-white group-hover:text-red-500 transition-colors uppercase line-clamp-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <Link
                    to={`/destinations/${item._id}`}
                    className="w-full mt-4 py-3 rounded-xl bg-white/5 hover:bg-red-600 hover:text-white text-slate-200 font-bold text-xs uppercase tracking-wider text-center transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>View Destination</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Destinations;
