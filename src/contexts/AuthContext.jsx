import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('accessToken'));

  useEffect(() => {
    if (token) {
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      setUser({ id: payload.sub, role: payload.role });
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      setUser(null);
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = async (username, password) => {
    const { data } = await axios.post('/api/auth/login/', { username, password });
    localStorage.setItem('accessToken', data.access);
    setToken(data.access);
    return data;
  };
  const register = async (username, password, role) => {
    await axios.post('/api/auth/register/', { username, password, role });
  };
  const logout = () => {
    localStorage.removeItem('accessToken');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
