// @ts-nocheck
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ChannelDescription from './components/ChannelDescription';
import PublicPlaces from './components/PublicPlaces';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import PlaceDetails from './pages/PlaceDetails';

/* ── Public wrapper ─────────────────────────────────────── */
function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-stone-900 font-sans overflow-x-hidden w-full selection:bg-[#B8860B] selection:text-white">
      <Navbar />
      <main className="w-full flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}

/* ── Pages ──────────────────────────────────────────────── */
function PublicLanding() {
  return (
    <PublicLayout>
      <Hero />
      <ChannelDescription />
      <PublicPlaces isHomePage={true} />
      <ContactSection />
    </PublicLayout>
  );
}

function PublicPlacesPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <PublicLayout>
      <PublicPlaces />
    </PublicLayout>
  );
}

function PublicPlaceDetailsPage() {
  return (
    <PublicLayout>
      <PlaceDetails />
    </PublicLayout>
  );
}

function PublicAboutPage() {
  return (
    <PublicLayout>
      <div className="pt-20" />
      <ChannelDescription />
    </PublicLayout>
  );
}

function PublicContactPage() {
  return (
    <PublicLayout>
      <div className="pt-20" />
      <ContactSection />
    </PublicLayout>
  );
}

/* ── App ────────────────────────────────────────────────── */
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/"        element={<PublicLanding />} />
          <Route path="/about"   element={<PublicAboutPage />} />
          <Route path="/places"  element={<PublicPlacesPage />} />
          <Route path="/place/:id" element={<PublicPlaceDetailsPage />} />
          <Route path="/contact" element={<PublicContactPage />} />

          {/* Admin Auth */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route path="/admin/dashboard"       element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin"                  element={<Navigate to="/admin/dashboard" replace />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
