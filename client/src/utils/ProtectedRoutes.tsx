import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';

export default function ProtectedRoutes() {
  const { currentUser, loading } = useAuth();

  // Prevents redirection to /register when refreshing page and auth state hasn't been able to load yet
  if (loading) {
    return;
  }

  return currentUser ? <Outlet /> : <Navigate to="/register" />;
}