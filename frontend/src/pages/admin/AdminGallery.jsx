import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import { Plus, Trash2, Image, X } from 'lucide-react';
import api from '../../services/api';

const AdminGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    imageUrl: '',
    location: 'Worldwide',
    country: 'Global',
    category: 'Landscape',
    aspectRatio: 'portrait'
  });

  const categories = ['Landscape', 'Wildlife', 'Culture', 'Portrait', 'Aerial', 'Urban'];

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await api.get('/gallery');
      setGallery(res.data.data || res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.post('/gallery', form);
      setIsModalOpen(false);
      fetchGallery();
    } catch (err) {
      alert('Error uploading photo to gallery');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete photo?')) {
      try {
        await api.delete(`/gallery/${id}`);
        fetchGallery();
      } catch (err) {
        alert('Error deleting photo');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-bg text-slate-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar title="Manage Photo Gallery" />

        <main className="p-8 space-y-6 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white font-serif">Photo Portfolio</h2>
              <p className="text-xs text-slate-400">Upload high-res travel photographs for the masonry gallery.</p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-brand-500 text-dark-bg font-bold text-xs shadow-glow">
              <Plus className="w-4 h-4" />
              <span>Upload Photo</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {gallery.map((g) => (
              <div key={g._id} className="relative group rounded-2xl overflow-hidden aspect-square border border-white/10 bg-slate-900">
                <img src={g.imageUrl} alt={g.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
                  <button onClick={() => handleDelete(g._id)} className="self-end p-1.5 rounded-lg bg-red-500 text-white">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div>
                    <div className="text-[10px] text-brand-400 font-bold uppercase">{g.category}</div>
                    <div className="text-xs font-bold text-white line-clamp-1">{g.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="glass-panel max-w-md w-full p-6 rounded-3xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-white">Upload New Photo</h3>
                  <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
                </div>

                <form onSubmit={handleSave} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Title</label>
                    <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white" />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Image URL</label>
                    <input type="url" required value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://images.unsplash.com/..." className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">Location</label>
                      <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white" />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">Category</label>
                      <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white">
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end space-x-2">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-900 rounded-xl font-bold">Cancel</button>
                    <button type="submit" className="px-5 py-2 bg-brand-500 text-dark-bg rounded-xl font-bold">Add to Gallery</button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default AdminGallery;
