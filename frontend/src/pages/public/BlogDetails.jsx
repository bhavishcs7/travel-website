import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Eye, ArrowLeft, Tag, Share2, User } from 'lucide-react';
import api from '../../services/api';
import { DetailSkeleton } from '../../components/common/LoadingSkeleton';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/blogs/${id}`)
      .then(res => setBlog(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <DetailSkeleton />;

  if (!blog) {
    return (
      <div className="pt-32 pb-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Blog Article Not Found</h2>
        <Link to="/blogs" className="text-brand-500 hover:underline">Back to Blogs</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-dark-bg min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <Link
          to="/blogs"
          className="inline-flex items-center space-x-2 text-slate-400 hover:text-brand-500 text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Blogs</span>
        </Link>

        {/* Title & Metadata */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <span className="px-3.5 py-1 rounded-full bg-brand-500 text-dark-bg text-xs font-bold uppercase tracking-wider">
              {blog.category}
            </span>
            <div className="flex items-center space-x-2 text-slate-400 text-xs">
              <Clock className="w-3.5 h-3.5 text-brand-400" />
              <span>{blog.readTime || '5 min read'}</span>
              <span>•</span>
              <Eye className="w-3.5 h-3.5 text-sky-400" />
              <span>{blog.views || 0} views</span>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
            {blog.title}
          </h1>

          {/* Author info */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <div className="flex items-center space-x-3">
              <img
                src={blog.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'}
                alt={blog.author?.name || 'Alex Rivera'}
                className="w-10 h-10 rounded-full object-cover border border-brand-500"
              />
              <div>
                <h4 className="text-white font-bold text-sm">{blog.author?.name || 'Alex Rivera'}</h4>
                <p className="text-slate-400 text-xs">{new Date(blog.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Article link copied to clipboard!');
              }}
              className="p-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white hover:bg-brand-500/20 transition-all flex items-center space-x-2 text-xs font-semibold"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share Article</span>
            </button>
          </div>
        </div>

        {/* Cover Image */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 h-[400px]">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Excerpt Lead */}
        <div className="p-6 rounded-2xl glass-panel border-l-4 border-brand-500 italic text-slate-200 text-base leading-relaxed">
          "{blog.excerpt}"
        </div>

        {/* Main Content Body */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 prose prose-invert max-w-none text-slate-300 space-y-6 leading-relaxed">
          <div className="whitespace-pre-line text-base leading-relaxed">
            {blog.content}
          </div>
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex items-center space-x-2 pt-4">
            <Tag className="w-4 h-4 text-brand-500" />
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((t, idx) => (
                <span key={idx} className="px-3 py-1 rounded-xl bg-slate-900 text-slate-300 text-xs font-medium border border-slate-800">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BlogDetails;
