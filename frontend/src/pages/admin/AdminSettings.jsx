import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import { useAuth } from '../../context/AuthContext';
import { User, Save, CheckCircle2 } from 'lucide-react';

const AdminSettings = () => {
  const { user, updateProfile } = useAuth();

  const [form, setForm] = useState({
    name: user?.name || 'Alex Rivera',
    bio: user?.bio || 'Full-time travel creator, filmmaker, and adventurer.',
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    youtube: user?.socials?.youtube || 'https://youtube.com',
    instagram: user?.socials?.instagram || 'https://instagram.com',
    twitter: user?.socials?.twitter || 'https://twitter.com',
    tiktok: user?.socials?.tiktok || 'https://tiktok.com'
  });

  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    try {
      await updateProfile({
        name: form.name,
        bio: form.bio,
        avatar: form.avatar,
        socials: {
          youtube: form.youtube,
          instagram: form.instagram,
          twitter: form.twitter,
          tiktok: form.tiktok
        }
      });
      setSuccess('Profile and site settings updated successfully!');
    } catch (e) {
      alert('Error updating settings');
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-bg text-slate-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar title="Profile & Site Settings" />

        <main className="p-8 space-y-6 max-w-4xl flex-1">
          <div>
            <h2 className="text-xl font-bold text-white font-serif">Admin Creator Settings</h2>
            <p className="text-xs text-slate-400">Update creator details, avatar, and social handle links.</p>
          </div>

          {success && (
            <div className="p-4 rounded-2xl bg-brand-500/20 border border-brand-500 text-brand-400 text-xs flex items-center space-x-2 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6 text-xs">
            <div className="flex items-center space-x-4 pb-6 border-b border-slate-800">
              <img
                src={form.avatar}
                alt="Creator Avatar"
                className="w-16 h-16 rounded-full object-cover border-2 border-brand-500 shadow-glow"
              />
              <div>
                <div className="text-sm font-bold text-white">{form.name}</div>
                <div className="text-[10px] text-brand-400 font-bold uppercase">Administrator</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Creator Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Avatar Image URL</label>
                <input
                  type="url"
                  value={form.avatar}
                  onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Creator Bio</label>
              <textarea
                rows="3"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
              ></textarea>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-4">
              <h4 className="font-bold text-white text-sm">Social Media Links</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">YouTube URL</label>
                  <input
                    type="url"
                    value={form.youtube}
                    onChange={(e) => setForm({ ...form, youtube: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Instagram URL</label>
                  <input
                    type="url"
                    value={form.instagram}
                    onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Twitter / X URL</label>
                  <input
                    type="url"
                    value={form.twitter}
                    onChange={(e) => setForm({ ...form, twitter: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">TikTok URL</label>
                  <input
                    type="url"
                    value={form.tiktok}
                    onChange={(e) => setForm({ ...form, tiktok: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-3 rounded-2xl bg-brand-500 text-dark-bg font-bold text-xs shadow-glow hover:scale-105 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Settings</span>
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AdminSettings;
