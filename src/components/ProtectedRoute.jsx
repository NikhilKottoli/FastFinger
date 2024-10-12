import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />; // Redirect to login page
  }

  return children; // Render the protected route
};

export default ProtectedRoute;