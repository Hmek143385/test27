// Hook d'authentification exemple
import { useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const profile = localStorage.getItem('profile');
    return token && profile ? { token, ...JSON.parse(profile) } : null;
  });

  const login = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Login failed');
    const data = await res.json();
    localStorage.setItem('token', data.token);
    // Récupérer le profil utilisateur (ex: /api/me)
    const meRes = await fetch('/api/me', {
      headers: { Authorization: 'Bearer ' + data.token }
    });
    const profile = meRes.ok ? await meRes.json() : {};
    localStorage.setItem('profile', JSON.stringify(profile));
    setUser({ token: data.token, ...profile });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    setUser(null);
  };

  return { user, login, logout };
}