// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // TODO: Add real token validation later (JWT expiry check)
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Optional: You can role-protect here
  // Example:
  // if (role === 'Student' && isTryingToAccessInstructorOnlyRoute) {
  //   return <Navigate to="/dashboard" replace />;
  // }

  return element;
};

export default PrivateRoute;
