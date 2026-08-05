import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import { Plus, Trash2, Video, X } from 'lucide-react';
import api from '../../services/api';

const AdminVideos = () => {
  const [videos, setVideos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    type: 'youtube',
    url: '',
    thumbnail: '',
    description: '',
    location: 'Global',
    isFeatured: true
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await api.get('/videos');
      setVideos(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.post('/videos', form);
      setIsModalOpen(false);
      fetchVideos();
    } catch (err) {
      alert('Error adding video');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete video?')) {
      try {
        await api.delete(`/videos/${id}`);
        fetchVideos();
      } catch (err) {
        alert('Error deleting video');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-bg text-slate-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar title="Manage Videos & Reels" />

        <main className="p-8 space-y-6 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white font-serif">Video Embeds</h2>
              <p className="text-xs text-slate-400">Manage YouTube vlogs and Instagram Reels links.</p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-brand-500 text-dark-bg font-bold text-xs shadow-glow">
              <Plus className="w-4 h-4" />
              <span>Add New Video</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((v) => (
              <div key={v._id} className="glass-panel p-4 rounded-2xl border border-white/10 flex space-x-4 items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-xl ${v.type === 'youtube' ? 'bg-red-500/20 text-red-500' : 'bg-pink-500/20 text-pink-500'}`}>
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm line-clamp-1">{v.title}</h4>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">{v.type} • {v.location}</span>
                  </div>
                </div>
                <button onClick={() => handleDelete(v._id)} className="p-2 rounded-lg bg-slate-900 text-red-400 hover:bg-red-500 hover:text-white">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="glass-panel max-w-md w-full p-6 rounded-3xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-white">Embed New Video</h3>
                  <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
                </div>

                <form onSubmit={handleSave} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Title</label>
                    <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white" />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Platform Type</label>
                    <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white">
                      <option value="youtube">YouTube Vlog</option>
                      <option value="instagram">Instagram Reel</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Video / Reel URL</label>
                    <input type="url" required value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://youtube.com/watch?v=..." className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white" />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Thumbnail URL</label>
                    <input type="url" value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} placeholder="https://images.unsplash.com/..." className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white" />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Location Tag</label>
                    <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white" />
                  </div>

                  <div className="pt-2 flex justify-end space-x-2">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-900 rounded-xl font-bold">Cancel</button>
                    <button type="submit" className="px-5 py-2 bg-brand-500 text-dark-bg rounded-xl font-bold">Save Embed</button>
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

export default AdminVideos;
