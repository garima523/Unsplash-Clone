import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
    const auth = localStorage.getItem('loggedin');
    return auth === 'true' ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
