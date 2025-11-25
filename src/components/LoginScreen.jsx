import React, { useState } from 'react';
import { Coffee, Lock, Eye, EyeOff } from 'lucide-react';
import { authConfig } from '../config/auth';

export default function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Şifre koda gömülü, şifre belirleme ekranına gerek yok

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!password) {
      setError('Şifre giriniz!');
      setIsLoading(false);
      return;
    }

    try {
      // Koda gömülü şifre ile karşılaştır
      const isValid = await authConfig.checkPassword(password);
      
      if (isValid) {
        localStorage.setItem('fika_authenticated', 'true');
        onLogin();
      } else {
        setError('Hatalı şifre!');
        setPassword('');
      }
    } catch (error) {
      setError('Giriş hatası. Lütfen tekrar deneyin.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-orange-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-orange-600 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <Coffee size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-stone-800 mb-2">Fika Coffee POS</h1>
          <p className="text-stone-600">Güvenli giriş yapın</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Şifre
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 pr-12 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Şifrenizi giriniz"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
              <Lock size={16} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-900 text-white py-3 rounded-lg font-bold text-lg hover:bg-orange-800 transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Lock size={20} />
            {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
          <p className="text-xs text-green-600 text-center mt-2">
            ✓ Merkezi şifre sistemi (Tüm cihazlarda aynı şifre)
          </p>
        </form>
      </div>
    </div>
  );
}

