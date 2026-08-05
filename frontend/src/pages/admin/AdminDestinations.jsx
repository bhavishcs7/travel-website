import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import { Plus, Edit, Trash2, MapPin, X, Landmark } from 'lucide-react';
import api from '../../services/api';

const AdminDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [form, setForm] = useState({
    title: '',
    coverImage: '',
    description: '',
    category: 'Historical',
    country: 'India',
    status: 'published'
  });

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const res = await api.get('/destinations');
      setDestinations(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setForm({ ...item });
    } else {
      setEditingItem(null);
      setForm({
        title: '',
        coverImage: '',
        description: '',
        category: 'Historical',
        country: 'India',
        status: 'published'
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.put(`/destinations/${editingItem._id}`, form);
      } else {
        await api.post('/destinations', form);
      }
      setIsModalOpen(false);
      fetchDestinations();
    } catch (err) {
      alert('Error saving destination: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      try {
        await api.delete(`/destinations/${id}`);
        fetchDestinations();
      } catch (err) {
        alert('Error deleting destination');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-slate-100">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar title="Manage Destinations" />

        <main className="p-8 space-y-6 flex-1">
          
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white font-sans uppercase">Add & Manage Places</h2>
              <p className="text-xs text-slate-400">Enter destination photo, name, and short description to publish to users.</p>
            </div>

            <button
              onClick={() => handleOpenModal()}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs uppercase shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:scale-105 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Destination</span>
            </button>
          </div>

          {/* Table */}
          <div className="glass-panel rounded-3xl border border-red-900/30 overflow-hidden bg-black/80">
            {destinations.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <Landmark className="w-10 h-10 text-red-500 mx-auto" />
                <h3 className="text-base font-bold text-white uppercase">No Places Added Yet</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Click the "Add Destination" button above to enter photo, name, and details for a historical place.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-4">Photo & Destination Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Description</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {destinations.map((item) => (
                      <tr key={item._id} className="hover:bg-slate-900/50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={item.coverImage}
                              alt={item.title}
                              className="w-14 h-14 rounded-xl object-cover border border-slate-800 shrink-0"
                            />
                            <div>
                              <div className="font-bold text-white text-sm uppercase line-clamp-1">{item.title}</div>
                              <span className="text-[10px] text-red-500 font-bold uppercase">{item.country || 'India'}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full bg-slate-900 text-red-500 font-bold text-[10px] uppercase">
                            {item.category || 'Historical'}
                          </span>
                        </td>
                        <td className="p-4 text-slate-300 max-w-xs line-clamp-2">
                          {item.description}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => handleOpenModal(item)}
                              className="p-2 rounded-lg bg-slate-900 hover:bg-red-600 hover:text-white text-slate-300 transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="p-2 rounded-lg bg-slate-900 hover:bg-red-600 hover:text-white text-red-400 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
              <div className="glass-panel max-w-lg w-full p-6 sm:p-8 rounded-3xl border border-red-900/40 space-y-6 bg-black/95 my-8">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans font-black text-lg uppercase tracking-wide text-white">
                    {editingItem ? 'Edit Destination' : 'Add New Destination'}
                  </h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSave} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1 uppercase">Destination Name / Title</label>
                    <input
                      type="text"
                      required
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="e.g. Hampi Stone Chariot & Ruins"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1 uppercase">Photo URL</label>
                    <input
                      type="url"
                      required
                      value={form.coverImage}
                      onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1 uppercase">Category / Tag</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-red-500"
                    >
                      <option value="Historical">Historical Place</option>
                      <option value="Heritage">Heritage Site</option>
                      <option value="Architecture">Ancient Architecture</option>
                      <option value="Fort">Fort & Citadel</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1 uppercase">Explanation / Description</label>
                    <textarea
                      rows="4"
                      required
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="Enter details and historical backstory about this place..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-red-500"
                    ></textarea>
                  </div>

                  <div className="pt-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 font-bold uppercase"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold uppercase shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                    >
                      Save & Publish
                    </button>
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

export default AdminDestinations;
