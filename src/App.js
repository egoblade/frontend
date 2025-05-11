import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Visualization from './pages/Visualization';
import ManagerPanel from './pages/ManagerPanel';
import Contacts from './pages/Contacts';
import About from './pages/About';

export default function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/visualization"
          element={
            <ProtectedRoute>
              <Visualization />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager"
          element={
            <ProtectedRoute roles={[ 'manager', 'director' ]}>
              <ManagerPanel />
            </ProtectedRoute>
          }
        />

        <Route path="/contacts" element={<Contacts />} />
        <Route path="/about"    element={<About />} />
      </Routes>
    </AuthProvider>
  );
}