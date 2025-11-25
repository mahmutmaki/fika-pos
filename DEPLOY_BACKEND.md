# 🔒 Backend Deploy Kılavuzu

## Merkezi Şifre Sistemi

Backend ile artık **tüm cihazlarda aynı şifre** kullanılabilir!

## 🚀 Hızlı Başlangıç

### 1. Bağımlılıkları Yükle

```bash
npm install
```

### 2. Backend ve Frontend'i Birlikte Çalıştır

```bash
npm run dev:full
```

Bu komut hem backend (port 3001) hem de frontend (port 5173) sunucularını başlatır.

### 3. Sadece Backend Çalıştır

```bash
npm run server
```

## 📦 Production Deploy

### Seçenek 1: Aynı Sunucuda (Önerilen)

Frontend ve backend'i aynı sunucuda çalıştırın:

1. **Backend'i çalıştırın:**
```bash
node server.js
# veya PM2 ile:
pm2 start server.js --name fika-backend
```

2. **Frontend build edin:**
```bash
npm run build
```

3. **Nginx yapılandırması:**

```nginx
# Backend API
location /api {
    proxy_pass http://localhost:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}

# Frontend
location / {
    root /var/www/fika-coffee-pos/dist;
    try_files $uri $uri/ /index.html;
}
```

### Seçenek 2: Ayrı Sunucular

**Backend Sunucusu:**
- Node.js sunucusu (port 3001)
- `.password` dosyası burada saklanır

**Frontend Sunucusu:**
- Static dosyalar (Netlify, Vercel, vb.)
- Environment variable: `VITE_API_URL=https://api.yoursite.com`

### Seçenek 3: Heroku/Railway/Render

**Backend için:**

1. Heroku'ya deploy edin:
```bash
heroku create fika-coffee-backend
git push heroku main
```

2. Environment variable ekleyin:
```bash
heroku config:set PORT=3001
```

3. Frontend'de API URL'i ayarlayın:
```env
VITE_API_URL=https://fika-coffee-backend.herokuapp.com
```

## 🔐 Güvenlik

### Şifre Dosyası

- `.password` dosyası otomatik oluşturulur
- Bu dosya **asla** Git'e commit edilmemeli (`.gitignore`'da)
- Şifre hash'lenerek saklanır (SHA-256)

### HTTPS

**Mutlaka HTTPS kullanın!** Şifreler HTTP üzerinden gönderilmemeli.

### CORS

Backend CORS ayarları yapılmıştır. Production'da sadece frontend domain'ine izin verin:

```javascript
// server.js'de
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
```

## 📝 API Endpoints

### POST `/api/auth/check`
Şifre kontrolü
```json
{ "password": "şifre123" }
```

### POST `/api/auth/set`
İlk şifre belirleme
```json
{ "password": "şifre123" }
```

### POST `/api/auth/reset`
Şifre sıfırlama
```json
{ 
  "password": "yenişifre123",
  "currentPassword": "eskisifre123" // opsiyonel
}
```

### GET `/api/auth/status`
Şifre durumu kontrolü

## 🔄 Fallback Sistemi

Backend'e erişilemezse sistem otomatik olarak **localStorage**'a geri döner:
- Her cihaz kendi şifresini belirler
- Cihazlar arası senkron yok
- Backend çalışmaya başlayınca otomatik merkezi sisteme geçer

## 🆘 Sorun Giderme

**Backend çalışmıyor:**
- Port 3001 kullanımda mı kontrol edin
- `npm install` yaptınız mı?
- Node.js versiyonu 14+ olmalı

**Frontend backend'e bağlanamıyor:**
- `VITE_API_URL` environment variable'ı doğru mu?
- CORS hatası alıyorsanız backend CORS ayarlarını kontrol edin
- Network tab'ında istekleri kontrol edin

**Şifre çalışmıyor:**
- `.password` dosyası var mı?
- Dosya izinleri doğru mu?
- Backend loglarını kontrol edin

## 📊 Monitoring

PM2 ile monitoring:
```bash
pm2 start server.js --name fika-backend
pm2 logs fika-backend
pm2 monit
```

## 🔄 Güncelleme

Backend güncellemesi:
```bash
git pull
npm install
pm2 restart fika-backend
```

Frontend güncellemesi:
```bash
npm run build
# dist klasörünü sunucuya yükleyin
```

