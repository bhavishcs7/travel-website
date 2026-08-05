import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Tag, Search, ArrowRight, User } from 'lucide-react';
import api from '../../services/api';
import { CardSkeleton } from '../../components/common/LoadingSkeleton';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Guides', 'Gear & Tech', 'Budgeting', 'Culture'];

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory]);

  const fetchBlogs = () => {
    setLoading(true);
    let url = `/blogs?category=${selectedCategory}`;
    if (searchQuery) url += `&search=${searchQuery}`;
    api.get(url)
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="pt-28 pb-20 bg-dark-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Travel Stories & Advice</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white">
            Travel Articles & Guides
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            In-depth itineraries, packing breakdowns, budgeting strategies, and camera gear tutorials.
          </p>
        </div>

        {/* Search & Categories */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <form onSubmit={(e) => { e.preventDefault(); fetchBlogs(); }} className="w-full md:w-96 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </form>

          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-500 text-dark-bg font-bold shadow-glow'
                    : 'bg-slate-900 text-slate-300 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((b) => (
              <article
                key={b._id}
                className="group glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-brand-500/50 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={b.coverImage}
                    alt={b.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-brand-400 text-xs font-bold uppercase">
                    {b.category}
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 text-slate-400 text-xs font-medium">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-brand-500" />
                        <span>{b.readTime || '5 min read'}</span>
                      </span>
                      <span>•</span>
                      <span>{new Date(b.createdAt).toLocaleDateString()}</span>
                    </div>

                    <h2 className="font-serif text-xl font-bold text-white group-hover:text-brand-400 transition-colors line-clamp-2">
                      {b.title}
                    </h2>

                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                      {b.excerpt}
                    </p>
                  </div>

                  <Link
                    to={`/blogs/${b.slug || b._id}`}
                    className="w-full mt-4 py-3 rounded-xl bg-white/5 hover:bg-brand-500 hover:text-dark-bg text-white font-semibold text-xs text-center transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Blogs;
