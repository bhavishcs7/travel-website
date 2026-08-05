import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import { Mail, Trash2, CheckCircle } from 'lucide-react';
import api from '../../services/api';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await api.get('/messages');
      setMessages(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/messages/${id}/read`);
      fetchMessages();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete message?')) {
      try {
        await api.delete(`/messages/${id}`);
        fetchMessages();
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-bg text-slate-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar title="Manage Contact Messages" />

        <main className="p-8 space-y-6 flex-1">
          <div>
            <h2 className="text-xl font-bold text-white font-serif">Collaboration Requests</h2>
            <p className="text-xs text-slate-400">Incoming contact form submissions from brands, fans, & sponsors.</p>
          </div>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="glass-panel p-8 text-center text-slate-500 text-xs rounded-2xl">
                No contact form submissions found.
              </div>
            ) : (
              messages.map((m) => (
                <div
                  key={m._id}
                  className={`glass-panel p-6 rounded-3xl border transition-all ${
                    m.isRead ? 'border-white/5 bg-slate-900/40' : 'border-brand-500/40 bg-slate-900/80 shadow-glow'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-brand-500/20 text-brand-400 font-bold flex items-center justify-center text-sm">
                        {m.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{m.name}</div>
                        <div className="text-xs text-brand-400">{m.email}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="text-[10px] text-slate-500">{new Date(m.createdAt).toLocaleString()}</span>
                      {!m.isRead && (
                        <button
                          onClick={() => markAsRead(m._id)}
                          className="px-2.5 py-1 rounded-lg bg-brand-500/20 text-brand-400 text-[10px] font-bold flex items-center space-x-1"
                        >
                          <CheckCircle className="w-3 h-3" />
                          <span>Mark Read</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(m._id)}
                        className="p-1.5 rounded-lg bg-slate-900 text-red-400 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-3 space-y-2">
                    <div className="text-xs font-bold text-white">{m.subject}</div>
                    <p className="text-xs text-slate-300 leading-relaxed">{m.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>

        </main>
      </div>
    </div>
  );
};

export default AdminMessages;
