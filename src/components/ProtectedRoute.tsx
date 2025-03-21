import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
  public?: boolean;
}

export function ProtectedRoute({ children, adminOnly = false, public: isPublic = false }: ProtectedRouteProps) {
  const { user, loading } = useAuthStore();

  // Skip loading check for non-admin routes
  if (loading && adminOnly) {
    return <div>Loading...</div>;
  }

  // Allow public routes to pass through
  if (isPublic) {
    return <>{children}</>;
  }

  // Only check authentication for admin routes
  if (adminOnly) {
    if (!user) {
      return <Navigate to="/login" />;
    }
    if (user.role !== 'admin') {
      return <Navigate to="/" />;
    }
  }

  // Allow access to regular routes without authentication
  return <>{children}</>;
}