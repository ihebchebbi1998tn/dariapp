
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type PrivateRouteProps = {
  element: React.ReactNode;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // If authenticated, render the protected component
  return <>{element}</>;
};
