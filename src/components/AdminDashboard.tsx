// @ts-nocheck
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Plus, Edit2, Trash2, X, Upload, CheckCircle2, AlertCircle,
  ImageIcon, Video, MapPin, Calendar, Map, Link2, 
  Settings, Image as LucideImage, Globe, Check,
  Search, Shield, LayoutDashboard, Compass, Loader2
} from 'lucide-react';
import AdminNavbar from './AdminNavbar';

const API_PLACES = 'http://localhost:5000/api/places';
const API_CONFIG = 'http://localhost:5000/api/config';

const getImageUrl = (url) => {
  if (!url) return '/content_hunter_logo_transparent.png';
  if (url.startsWith('/uploads/')) return `http://localhost:5000${url}`;
  return url;
};

// ─── Toast Component ────────────────────────────────────────────────────────
function Toast({ toast, onClose }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, y: -16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          className={`fixed top-24 right-6 z-[200000] flex items-center gap-3 px-5 py-4 rounded-xl border backdrop-blur-xl text-sm font-bold tracking-wide shadow-xl max-w-sm w-full
            ${toast.type === 'error'
              ? 'bg-white/95 border-red-500/50 text-red-500'
              : 'bg-white/95 border-stone-200 text-[#B8860B]'}`}
          role="alert"
        >
          {toast.type === 'error'
            ? <AlertCircle className="w-5 h-5 shrink-0" />
            : <CheckCircle2 className="w-5 h-5 shrink-0" />}
          <span className="flex-1 text-stone-900">{toast.message}</span>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-stone-100 transition-colors text-stone-400 hover:text-stone-600">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Field Components ───────────────────────────────────────────────────────
const fieldBase =
  'w-full h-12 rounded-lg border bg-white text-stone-900 text-sm placeholder-stone-400 outline-none transition-all duration-200 focus:ring-1 focus:ring-[#B8860B]/50 shadow-sm';
const fieldNormal = `${fieldBase} border-stone-200 focus:border-[#B8860B] px-4`;
const fieldError  = `${fieldBase} border-red-500/70 focus:border-red-500 px-4`;

function FormLabel({ children, optional = false, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest text-[#B8860B]">
      {children}
      {optional && <span className="text-[9px] font-normal tracking-normal text-stone-400 border border-stone-200 rounded-full px-2 py-0.5">Optional</span>}
    </label>
  );
}

function FormGroup({ children, className = '' }) {
  return <div className={`flex flex-col ${className}`}>{children}</div>;
}

function UploadField({ label, icon: Icon, accept, multiple, onChange, preview, selectedCount }) {
  return (
    <FormGroup>
      <FormLabel optional>{label}</FormLabel>
      <label className={`relative flex items-center gap-3 h-12 w-full rounded-lg border border-stone-200 bg-white hover:border-[#B8860B] px-4 cursor-pointer transition-all duration-200 group shadow-sm`}>
        <Icon className="w-4 h-4 shrink-0 text-[#B8860B]" />
        <span className="text-sm text-stone-500 truncate flex-1">
          {selectedCount > 0
            ? <span className="font-medium text-stone-900">{selectedCount} file{selectedCount > 1 ? 's' : ''} selected</span>
            : <span>Choose {label.toLowerCase()}...</span>
          }
        </span>
        <Upload className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#B8860B] shrink-0" />
        <input type="file" accept={accept} multiple={multiple} onChange={onChange} className="hidden" />
      </label>
      {preview && (
        <div className="mt-2.5 flex items-center gap-3 px-3 py-2 rounded-lg bg-stone-50 border border-stone-200">
          <img src={preview} alt="preview" className="w-10 h-8 object-cover rounded border border-stone-200 shrink-0" />
          <span className="text-[11px] text-[#B8860B] uppercase tracking-wider font-bold">Cover ready</span>
        </div>
      )}
    </FormGroup>
  );
}

// ─── Site Settings Form ─────────────────────────────────────────────────────
function SettingsForm({ showToast }) {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(API_CONFIG)
      .then(res => res.json())
      .then(data => {
        if (data.success) setConfig(data.data);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setConfig(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(API_CONFIG, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(config)
      });
      const data = await res.json();
      if (data.success) {
        showToast('Settings saved successfully!');
      } else {
        showToast(data.message || 'Error saving settings', 'error');
      }
    } catch {
      showToast('Network error saving settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-[#B8860B] py-20 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto" /></div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8 pb-20">
      
      {/* About Section Config */}
      <div className="bg-white border border-stone-200 shadow-sm rounded-2xl p-6 sm:p-8">
        <h2 className="font-cinzel text-xl font-bold text-[#B8860B] mb-6 flex items-center gap-2">
          <Settings className="w-5 h-5" /> About Section Config
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormGroup>
            <FormLabel htmlFor="aboutTitle">About Title</FormLabel>
            <input name="aboutTitle" value={config?.aboutTitle || ''} onChange={handleChange} className={fieldNormal} />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="aboutSubtitle">About Subtitle</FormLabel>
            <input name="aboutSubtitle" value={config?.aboutSubtitle || ''} onChange={handleChange} className={fieldNormal} />
          </FormGroup>
          <FormGroup className="md:col-span-2">
            <FormLabel htmlFor="aboutDescription1">Paragraph 1</FormLabel>
            <textarea name="aboutDescription1" rows={3} value={config?.aboutDescription1 || ''} onChange={handleChange} className={`${fieldNormal} py-3 h-auto resize-none`} />
          </FormGroup>
          <FormGroup className="md:col-span-2">
            <FormLabel htmlFor="aboutDescription2">Paragraph 2</FormLabel>
            <textarea name="aboutDescription2" rows={3} value={config?.aboutDescription2 || ''} onChange={handleChange} className={`${fieldNormal} py-3 h-auto resize-none`} />
          </FormGroup>
        </div>
      </div>

      {/* Contact Links */}
      <div className="bg-white border border-stone-200 shadow-sm rounded-2xl p-6 sm:p-8">
        <h2 className="font-cinzel text-xl font-bold text-[#B8860B] mb-6 flex items-center gap-2">
          <Link2 className="w-5 h-5" /> Contact & Social Links
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormGroup>
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <input name="email" value={config?.email || ''} onChange={handleChange} className={fieldNormal} />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="phone">Phone Number</FormLabel>
            <input name="phone" value={config?.phone || ''} onChange={handleChange} className={fieldNormal} />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="youtubeLink">YouTube URL</FormLabel>
            <input name="youtubeLink" value={config?.youtubeLink || ''} onChange={handleChange} className={fieldNormal} />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="instagramLink">Instagram URL</FormLabel>
            <input name="instagramLink" value={config?.instagramLink || ''} onChange={handleChange} className={fieldNormal} />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="facebookLink">Facebook URL</FormLabel>
            <input name="facebookLink" value={config?.facebookLink || ''} onChange={handleChange} className={fieldNormal} />
          </FormGroup>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="h-12 px-10 rounded-lg bg-[#B8860B] hover:bg-[#8B6508] text-white font-bold uppercase tracking-widest text-xs transition-colors flex items-center gap-2 shadow-md"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
          Save Configuration
        </button>
      </div>

    </form>
  );
}

// ─── Add/Edit Place Modal ───────────────────────────────────────────────────
function PlaceModal({ editingPlace, onClose, onSuccess }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(editingPlace ? { ...editingPlace, dateVisited: editingPlace.dateVisited ? new Date(editingPlace.dateVisited).toISOString().split('T')[0] : '' } : {
    placeName: '', description: '', state: '', district: '', category: '', history: '', bestTimeToVisit: '',
    youtubeLink: '', instagramLink: '', googleMapsLink: '', dateVisited: '', isPublished: true, isFeatured: false
  });
  
  const [nameError, setNameError] = useState('');
  const [coverFile, setCoverFile] = useState(null);
  const [galleryFiles, setGallery] = useState([]);
  const [coverPreview, setPreview] = useState(editingPlace?.coverImage || '');
  const [submitting, setSubmitting] = useState(false);

  const set = (key) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: val }));
    if (key === 'placeName' && nameError) setNameError('');
  };

  const handleCover = (e) => {
    const f = e.target.files[0];
    if (f) { setCoverFile(f); setPreview(URL.createObjectURL(f)); }
  };
  const handleGallery = (e) => setGallery(Array.from(e.target.files));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.placeName.trim()) { setNameError('Place Name is required.'); return; }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const body = new FormData();

      Object.keys(form).forEach(key => {
        if (key !== 'coverImage' && key !== 'galleryImages' && form[key] !== null && form[key] !== undefined) {
          body.append(key, form[key]);
        }
      });
      if (coverFile) body.append('coverImage', coverFile);
      galleryFiles.forEach((f) => body.append('galleryImages', f));

      const url = editingPlace ? `${API_PLACES}/${editingPlace._id}` : API_PLACES;
      const method = editingPlace ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { Authorization: `Bearer ${token}` }, body });
      const data = await res.json();

      if (res.ok && data.success) {
        onSuccess(editingPlace ? 'Place updated successfully!' : 'Place saved successfully!');
      } else if (res.status === 401 || res.status === 403) {
        onSuccess(null, 'Session expired. Redirecting to login...', 'error');
        setTimeout(() => navigate('/admin/login'), 1800);
      } else {
        onSuccess(null, data.message || 'Server error.', 'error');
      }
    } catch {
      onSuccess(null, 'Network error.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-6" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 20 }}
        className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-xl border border-stone-200 bg-white shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-stone-200 shrink-0 bg-stone-50">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#B8860B] mb-1">Content Hunter CMS</p>
            <h2 className="font-cinzel text-2xl font-black text-stone-900">{editingPlace ? 'Edit Place' : 'Add New Place'}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form id="place-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 space-y-8 custom-scrollbar">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormGroup>
              <FormLabel htmlFor="placeName">Place Name <span className="text-red-500">*</span></FormLabel>
              <input id="placeName" value={form.placeName} onChange={set('placeName')} className={nameError ? fieldError : fieldNormal} autoFocus />
              {nameError && <p className="mt-1 text-xs text-red-400">{nameError}</p>}
            </FormGroup>
            
            <div className="flex items-center gap-6 mt-6">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" checked={form.isPublished} onChange={set('isPublished')} className="hidden" />
                <div className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${form.isPublished ? 'bg-[#B8860B]' : 'bg-stone-200'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${form.isPublished ? 'translate-x-6' : 'translate-x-0'} shadow-sm`} />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-stone-600 group-hover:text-stone-900">Published</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" checked={form.isFeatured} onChange={set('isFeatured')} className="hidden" />
                <div className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${form.isFeatured ? 'bg-amber-500' : 'bg-stone-200'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${form.isFeatured ? 'translate-x-6' : 'translate-x-0'} shadow-sm`} />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-stone-600 group-hover:text-amber-600">Featured</span>
              </label>
            </div>

            <FormGroup>
              <FormLabel htmlFor="category" optional>Category</FormLabel>
              <input id="category" value={form.category} onChange={set('category')} placeholder="e.g. Temple, Waterfall" className={fieldNormal} />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="state" optional>State</FormLabel>
              <input id="state" value={form.state} onChange={set('state')} placeholder="e.g. Karnataka" className={fieldNormal} />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="district" optional>District</FormLabel>
              <input id="district" value={form.district} onChange={set('district')} placeholder="e.g. Bellary" className={fieldNormal} />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="bestTimeToVisit" optional>Best Time to Visit</FormLabel>
              <input id="bestTimeToVisit" value={form.bestTimeToVisit} onChange={set('bestTimeToVisit')} placeholder="e.g. Oct - Mar" className={fieldNormal} />
            </FormGroup>
          </div>

          <FormGroup>
            <FormLabel htmlFor="description" optional>Description</FormLabel>
            <textarea id="description" rows={3} value={form.description} onChange={set('description')} className={`${fieldNormal} py-3 h-auto resize-none`} />
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="history" optional>History</FormLabel>
            <textarea id="history" rows={3} value={form.history} onChange={set('history')} className={`${fieldNormal} py-3 h-auto resize-none`} />
          </FormGroup>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UploadField label="Cover Image" icon={LucideImage} accept="image/*" onChange={handleCover} preview={coverPreview} selectedCount={coverFile ? 1 : 0} />
            <UploadField label="Gallery Images" icon={ImageIcon} accept="image/*" multiple onChange={handleGallery} selectedCount={galleryFiles.length} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
            <FormGroup>
              <FormLabel htmlFor="youtubeLink" optional><Video className="w-3 h-3 inline mr-1 text-red-500"/> YouTube Link</FormLabel>
              <input id="youtubeLink" type="url" value={form.youtubeLink} onChange={set('youtubeLink')} className={fieldNormal} />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="googleMapsLink" optional><MapPin className="w-3 h-3 inline mr-1 text-amber-500"/> Google Maps</FormLabel>
              <input id="googleMapsLink" type="url" value={form.googleMapsLink} onChange={set('googleMapsLink')} className={fieldNormal} />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="instagramLink" optional>Instagram Reel</FormLabel>
              <input id="instagramLink" type="url" value={form.instagramLink} onChange={set('instagramLink')} className={fieldNormal} />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="dateVisited" optional>Date Visited</FormLabel>
              <input id="dateVisited" type="date" value={form.dateVisited} onChange={set('dateVisited')} className={`${fieldNormal} color-white`} style={{ colorScheme: 'dark' }} />
            </FormGroup>
          </div>
        </form>

        <div className="flex justify-end gap-3 px-8 py-5 border-t border-stone-200 bg-stone-50 shrink-0">
          <button type="button" onClick={onClose} className="h-10 px-6 rounded-lg border border-stone-200 hover:bg-stone-200 text-stone-600 text-xs font-bold uppercase transition-all">
            Cancel
          </button>
          <button type="submit" form="place-form" disabled={submitting} className="h-10 px-8 rounded-lg bg-[#B8860B] hover:bg-[#8B6508] text-white text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 shadow-sm">
            {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving</> : <>{editingPlace ? 'Update Place' : 'Save Place'}</>}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main AdminDashboard ────────────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('places');
  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4500);
  }, []);

  const fetchPlaces = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_PLACES}/admin`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) setPlaces(data.data || []);
      else if (res.status === 401) navigate('/admin/login');
    } catch {
      showToast('Could not reach backend API.', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast, navigate]);

  useEffect(() => { if (tab === 'places') fetchPlaces(); }, [tab, fetchPlaces]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this place permanently?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_PLACES}/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) { showToast('Place deleted.'); fetchPlaces(); }
      else showToast(data.message, 'error');
    } catch { showToast('Error deleting place.', 'error'); }
  };

  const filteredPlaces = places.filter(p => p.placeName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-stone-900 font-sans selection:bg-[#B8860B] selection:text-white">
      <AdminNavbar />
      <Toast toast={toast} onClose={() => setToast(null)} />

      <div className="flex h-screen pt-[72px] overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-stone-200 bg-white hidden md:flex flex-col shrink-0">
          <div className="p-6">
            <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest mb-4">Dashboard Menu</p>
            <nav className="space-y-2">
              <button onClick={() => setTab('places')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${tab === 'places' ? 'bg-[#B8860B] text-white shadow-sm' : 'text-stone-500 hover:text-stone-900 hover:bg-stone-50'}`}>
                <Compass className="w-5 h-5" /> Places
              </button>
              <button onClick={() => setTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${tab === 'settings' ? 'bg-[#B8860B] text-white shadow-sm' : 'text-stone-500 hover:text-stone-900 hover:bg-stone-50'}`}>
                <Settings className="w-5 h-5" /> Settings
              </button>
            </nav>
          </div>
        </aside>

        {/* Mobile Tabs */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 z-40 flex">
           <button onClick={() => setTab('places')} className={`flex-1 py-4 flex flex-col items-center gap-1 ${tab === 'places' ? 'text-[#B8860B]' : 'text-stone-400'}`}>
             <Compass className="w-5 h-5" /> <span className="text-[10px] uppercase font-bold tracking-widest">Places</span>
           </button>
           <button onClick={() => setTab('settings')} className={`flex-1 py-4 flex flex-col items-center gap-1 ${tab === 'settings' ? 'text-[#B8860B]' : 'text-stone-400'}`}>
             <Settings className="w-5 h-5" /> <span className="text-[10px] uppercase font-bold tracking-widest">Settings</span>
           </button>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#FAFAFA] p-4 sm:p-10">
          {tab === 'places' ? (
            <div className="max-w-7xl mx-auto pb-20">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
                <div>
                  <h1 className="font-cinzel text-3xl font-bold text-stone-900 mb-2">Places Library</h1>
                  <p className="text-stone-500 text-sm">{places.length} destination(s) managed.</p>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input type="text" placeholder="Search places..." value={search} onChange={e => setSearch(e.target.value)} className="w-full h-10 pl-10 pr-4 bg-white border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-[#B8860B] shadow-sm text-stone-900" />
                  </div>
                  <button onClick={() => { setEditing(null); setModal(true); }} className="h-10 px-5 rounded-lg bg-[#B8860B] hover:bg-[#8B6508] text-white text-xs font-bold uppercase tracking-widest shrink-0 flex items-center gap-2 shadow-sm">
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center py-20 text-[#B8860B]"><Loader2 className="w-8 h-8 animate-spin" /></div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredPlaces.map(p => (
                    <div key={p._id} className="bg-white border border-stone-200 rounded-xl overflow-hidden hover:border-[#B8860B] transition-colors group shadow-sm">
                      <div className="relative h-48 overflow-hidden bg-stone-100">
                        <img src={getImageUrl(p.coverImage)} alt={p.placeName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" />
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {p.isFeatured && <span className="bg-amber-500 text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded shadow-sm">Featured</span>}
                          {!p.isPublished && <span className="bg-red-500 text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded shadow-sm">Draft</span>}
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-cinzel text-xl font-bold text-stone-900 truncate">{p.placeName}</h3>
                        <p className="text-stone-500 text-xs mt-1 truncate">{p.state} {p.district ? `- ${p.district}` : ''}</p>
                        
                        <div className="flex gap-3 mt-6">
                          <button onClick={() => { setEditing(p); setModal(true); }} className="flex-1 h-9 rounded bg-stone-50 hover:bg-[#B8860B] border border-stone-200 hover:border-[#B8860B] text-stone-600 hover:text-white text-[11px] font-bold uppercase tracking-widest transition-colors flex justify-center items-center gap-2">
                            <Edit2 className="w-3 h-3" /> Edit
                          </button>
                          <button onClick={() => handleDelete(p._id)} className="h-9 px-4 rounded bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-200 hover:border-red-500 text-[11px] font-bold uppercase transition-colors">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-7xl mx-auto pb-20">
              <div className="mb-10">
                <h1 className="font-cinzel text-3xl font-bold text-stone-900 mb-2">Site Settings</h1>
                <p className="text-stone-500 text-sm">Manage public website configurations.</p>
              </div>
              <SettingsForm showToast={showToast} />
            </div>
          )}
        </main>
      </div>

      <AnimatePresence>
        {modalOpen && <PlaceModal editingPlace={editing} onClose={() => setModal(false)} onSuccess={(msg, err) => {
          if (msg) { setModal(false); showToast(msg); fetchPlaces(); } else if (err) showToast(err, 'error');
        }} />}
      </AnimatePresence>
    </div>
  );
}
