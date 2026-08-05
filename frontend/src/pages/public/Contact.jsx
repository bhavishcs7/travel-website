import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Youtube, Instagram, Twitter, MessageSquare, CheckCircle2 } from 'lucide-react';
import api from '../../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg('');

    try {
      await api.post('/messages', formData);
      setSuccessMsg('Thank you! Your message has been sent successfully. I will get back to you within 24 hours.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      alert('Error sending message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20 bg-dark-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white">
            Let's Work Together
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            For brand sponsorships, tourism board campaigns, video licensing, or just to say hello!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Form Side */}
          <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-white flex items-center space-x-2">
              <MessageSquare className="w-6 h-6 text-brand-500" />
              <span>Send a Message</span>
            </h2>

            {successMsg && (
              <div className="p-4 rounded-2xl bg-brand-500/20 border border-brand-500 text-brand-400 text-sm flex items-start space-x-2">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="sarah@brand.com"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Brand Campaign Partnership"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Message</label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, timeline, and budget..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-500 to-teal-400 text-dark-bg font-bold text-base hover:shadow-glow transition-all hover:scale-[1.02] flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>{submitting ? 'Sending Message...' : 'Send Message'}</span>
              </button>
            </form>
          </div>

          {/* Social Links & Google Maps Embed Side */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
              <h3 className="font-serif text-xl font-bold text-white">Direct Contacts</h3>
              
              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Email Inquiry</div>
                    <div className="font-bold text-white">alex@wanderlustcreator.com</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Base Studio Location</div>
                    <div className="font-bold text-white">Canggu, Bali & Zurich, Switzerland</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="text-xs text-slate-400 font-semibold uppercase">Follow On Socials</div>
                <div className="flex space-x-3">
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors text-xs font-bold">
                    <Youtube className="w-4 h-4" />
                    <span>YouTube</span>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-pink-500/20 text-pink-400 hover:bg-pink-500 hover:text-white transition-colors text-xs font-bold">
                    <Instagram className="w-4 h-4" />
                    <span>Instagram</span>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-sky-500/20 text-sky-400 hover:bg-sky-500 hover:text-white transition-colors text-xs font-bold">
                    <Twitter className="w-4 h-4" />
                    <span>Twitter</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="glass-panel p-3 rounded-3xl border border-white/10 overflow-hidden h-64">
              <iframe
                title="Creator Base Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126214.3481230193!2d115.11652194335938!3d-8.64781799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd238692740a6b7%3A0xd8e82a201b16c801!2sCanggu%2C%20North%20Kuta%2C%20Badung%20Regency%2C%20Bali!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                className="w-full h-full rounded-2xl border-0 filter invert contrast-125 saturate-50"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
