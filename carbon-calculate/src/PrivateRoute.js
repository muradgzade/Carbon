// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const userId = localStorage.getItem("userId");

  // Eğer kullanıcı login olmamışsa, login sayfasına yönlendir
  if (!userId) {
    // return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
