import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, Sparkles } from 'lucide-react';

const ContactCTA = () => {
  return (
    <section className="py-20 bg-dark-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel p-10 md:p-16 rounded-3xl border border-brand-500/30 text-center relative overflow-hidden bg-gradient-to-r from-slate-900 via-dark-card to-slate-900 shadow-glow">
          
          <div className="absolute top-0 left-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Let's Create Together</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
              Have a Destination or Campaign in Mind?
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              Available for tourism board collaborations, hotel & resort reviews, gear sponsorships, documentary filmmaking, and custom travel itineraries.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-500 to-teal-400 text-dark-bg font-bold text-base hover:shadow-glow transition-all hover:scale-105 flex items-center justify-center space-x-3"
              >
                <Mail className="w-5 h-5" />
                <span>Send Collaboration Request</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
