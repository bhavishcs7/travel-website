import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070709] flex flex-col items-center justify-center text-white gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
        <span className="text-sm font-medium tracking-wider text-gray-400">Verifying Admin Session...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
