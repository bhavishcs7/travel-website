import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Destinations from './pages/public/Destinations';
import DestinationDetails from './pages/public/DestinationDetails';
import Blogs from './pages/public/Blogs';
import BlogDetails from './pages/public/BlogDetails';
import Videos from './pages/public/Videos';
import Gallery from './pages/public/Gallery';
import Contact from './pages/public/Contact';
import NotFound from './pages/public/NotFound';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminDestinations from './pages/admin/AdminDestinations';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminVideos from './pages/admin/AdminVideos';
import AdminGallery from './pages/admin/AdminGallery';
import AdminMessages from './pages/admin/AdminMessages';
import AdminSettings from './pages/admin/AdminSettings';

import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-dark-bg flex items-center justify-center text-white">Loading Admin Session...</div>;
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return children;
};

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {!isAdminRoute && <Navbar />}
      <div className="flex-1">{children}</div>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:id" element={<DestinationDetails />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/destinations" element={<ProtectedRoute><AdminDestinations /></ProtectedRoute>} />
        <Route path="/admin/blogs" element={<ProtectedRoute><AdminBlogs /></ProtectedRoute>} />
        <Route path="/admin/videos" element={<ProtectedRoute><AdminVideos /></ProtectedRoute>} />
        <Route path="/admin/gallery" element={<ProtectedRoute><AdminGallery /></ProtectedRoute>} />
        <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />

        {/* 404 Catch All */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
