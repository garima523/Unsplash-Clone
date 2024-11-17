import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../src/pages/home';
import Signup from './Components/LoginSignup/Signup';
import Login from '../src/pages/login';
import ErrorPage from '../src/pages/error';
import ProtectedRoutes from './Services/ProtectedRoutes';

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/home/:category" element={<Home />} />
          </Route>
          
          {/* Check the errorResolved flag and navigate to the error page if needed */}
          <Route path="/error" element={<ErrorPage />} />
          
          {/* Add a catch-all route for displaying "Page not found" error */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    );
  }
  
  export default App;