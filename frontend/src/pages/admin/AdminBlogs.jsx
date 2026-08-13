import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import { Plus, Edit, Trash2, BookOpen, X } from 'lucide-react';
import api from '../../services/api';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [form, setForm] = useState({
    title: '',
    category: 'Guides',
    coverImage: '',
    excerpt: '',
    content: '',
    readTime: '5 min read',
    tagsStr: 'Travel, Guides',
    status: 'published'
  });

  const categories = ['Guides', 'Gear & Tech', 'Budgeting', 'Culture'];

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await api.get('/blogs');
      setBlogs(res.data.data || res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setForm({
        ...item,
        tagsStr: item.tags ? item.tags.join(', ') : ''
      });
    } else {
      setEditingItem(null);
      setForm({
        title: '',
        category: 'Guides',
        coverImage: '',
        excerpt: '',
        content: '',
        readTime: '5 min read',
        tagsStr: 'Travel, Guides',
        status: 'published'
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tagsStr.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      if (editingItem) {
        await api.put(`/blogs/${editingItem._id}`, payload);
      } else {
        await api.post('/blogs', payload);
      }
      setIsModalOpen(false);
      fetchBlogs();
    } catch (err) {
      alert('Error saving blog post');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this blog post?')) {
      try {
        await api.delete(`/blogs/${id}`);
        fetchBlogs();
      } catch (err) {
        alert('Error deleting post');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-bg text-slate-100">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar title="Manage Travel Blogs" />

        <main className="p-8 space-y-6 flex-1">
          
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white font-serif">Blog Posts</h2>
              <p className="text-xs text-slate-400">Publish guides, travel tips, and equipment reviews.</p>
            </div>

            <button
              onClick={() => handleOpenModal()}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-brand-500 text-dark-bg font-bold text-xs shadow-glow hover:scale-105 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Write Blog Article</span>
            </button>
          </div>

          <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 font-semibold uppercase border-b border-slate-800">
                  <tr>
                    <th className="p-4">Article</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Read Time</th>
                    <th className="p-4">Views</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {blogs.map((b) => (
                    <tr key={b._id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <img src={b.coverImage} alt={b.title} className="w-12 h-12 rounded-xl object-cover border border-slate-800 shrink-0" />
                          <div>
                            <div className="font-bold text-white text-sm line-clamp-1">{b.title}</div>
                            <div className="text-[10px] text-slate-500">{new Date(b.createdAt).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full bg-slate-900 text-teal-400 font-bold text-[10px]">
                          {b.category}
                        </span>
                      </td>
                      <td className="p-4 text-slate-300">{b.readTime}</td>
                      <td className="p-4 text-slate-300">{b.views || 0}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button onClick={() => handleOpenModal(b)} className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:bg-brand-500 hover:text-dark-bg">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(b._id)} className="p-2 rounded-lg bg-slate-900 text-red-400 hover:bg-red-500 hover:text-white">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
              <div className="glass-panel max-w-2xl w-full p-8 rounded-3xl border border-white/10 space-y-6 my-8">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-bold text-white">{editingItem ? 'Edit Blog' : 'New Blog'}</h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
                </div>

                <form onSubmit={handleSave} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Title</label>
                    <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">Category</label>
                      <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white">
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">Read Time</label>
                      <input type="text" value={form.readTime} onChange={(e) => setForm({ ...form, readTime: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Cover Image URL</label>
                    <input type="url" required value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white" />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Excerpt Summary</label>
                    <textarea rows="2" required value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"></textarea>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Content (Markdown supported)</label>
                    <textarea rows="6" required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"></textarea>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Tags (Comma separated)</label>
                    <input type="text" value={form.tagsStr} onChange={(e) => setForm({ ...form, tagsStr: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white" />
                  </div>

                  <div className="pt-4 flex justify-end space-x-3">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-900 rounded-xl font-bold">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-brand-500 text-dark-bg rounded-xl font-bold">Save Article</button>
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

export default AdminBlogs;
