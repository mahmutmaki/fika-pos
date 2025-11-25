// API yapılandırması
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const api = {
  // Şifre kontrolü
  checkPassword: async (password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      return await response.json();
    } catch (error) {
      console.error('API hatası:', error);
      // Backend yoksa localStorage'a geri dön
      return { fallback: true };
    }
  },

  // Şifre belirleme
  setPassword: async (password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/set`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      return await response.json();
    } catch (error) {
      console.error('API hatası:', error);
      return { error: 'Bağlantı hatası' };
    }
  },

  // Şifre sıfırlama
  resetPassword: async (newPassword, currentPassword = null) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword, currentPassword })
      });
      return await response.json();
    } catch (error) {
      console.error('API hatası:', error);
      return { error: 'Bağlantı hatası' };
    }
  },

  // Şifre durumu
  checkPasswordExists: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/status`);
      return await response.json();
    } catch (error) {
      console.error('API hatası:', error);
      // Backend yoksa localStorage kontrolü yap
      return { exists: !!localStorage.getItem('fika_auth_hash'), fallback: true };
    }
  }
};

