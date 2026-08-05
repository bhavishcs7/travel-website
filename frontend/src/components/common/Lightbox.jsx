import React, { useEffect } from 'react';
import { X, MapPin, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Lightbox = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative max-w-5xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-950/70 text-slate-200 hover:text-white hover:bg-brand-500 hover:text-dark-bg transition-all shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="md:w-2/3 max-h-[75vh] bg-slate-950 flex items-center justify-center overflow-hidden">
            <img
              src={item.imageUrl || item.coverImage}
              alt={item.title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Info Side */}
          <div className="md:w-1/3 p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-brand-500 font-semibold text-xs uppercase tracking-wider mb-2">
                <Tag className="w-3.5 h-3.5" />
                <span>{item.category || 'Travel Photo'}</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-3 leading-snug">
                {item.title}
              </h3>
              <div className="flex items-center space-x-2 text-slate-400 text-sm mb-4">
                <MapPin className="w-4 h-4 text-brand-500" />
                <span>{item.location || item.country}</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {item.description || 'Captured during sunrise golden hour with high altitude drone perspective and long exposure.'}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>Resolution: Ultra HD</span>
              <span>Camera: Sony A7S III</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Lightbox;
