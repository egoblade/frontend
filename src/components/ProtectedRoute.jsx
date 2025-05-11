import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function ProtectedRoute({ children, roles }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    // сохраним, откуда пришли
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
}
