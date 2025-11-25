# 🚀 Fika Coffee POS - Yayınlama Kılavuzu

## 📋 Genel Bakış

Uygulama 2 parçadan oluşuyor:
1. **Frontend** (React) - Kullanıcı arayüzü
2. **Backend** (Express.js) - Şifre yönetimi API'si

## 🎯 Hızlı Deploy Seçenekleri

### Seçenek 1: Ücretsiz Hosting (Önerilen - En Kolay)

#### Frontend: Netlify/Vercel
#### Backend: Railway/Render

**Adımlar:**

#### 1. Frontend'i Netlify'a Yükleyin

```bash
# Build oluştur
npm run build

# Netlify CLI ile (opsiyonel)
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

**VEYA** Netlify web sitesinden:
1. https://app.netlify.com adresine gidin
2. "Add new site" > "Deploy manually"
3. `dist` klasörünü sürükleyip bırakın
4. Site yayınlanır! (örn: `https://fika-coffee-pos.netlify.app`)

#### 2. Backend'i Railway'a Yükleyin

1. https://railway.app adresine gidin
2. "New Project" > "Deploy from GitHub repo" VEYA "Empty Project"
3. GitHub repo'nuzu bağlayın
4. Settings'den:
   - **Root Directory**: `/` (kök dizin)
   - **Start Command**: `node server.js`
   - **Port**: `3001` (otomatik algılanır)
5. Deploy edin!

Railway otomatik olarak bir URL verir: `https://your-app.railway.app`

#### 3. Frontend'i Backend'e Bağlayın

Netlify'da:
1. Site Settings > Environment Variables
2. Yeni variable ekleyin:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-app.railway.app` (Railway'dan aldığınız URL)
3. Site'ı yeniden deploy edin

**VEYA** build öncesi `.env` dosyası oluşturun:

```bash
# .env.production
VITE_API_URL=https://your-app.railway.app
```

Sonra build edin:
```bash
npm run build
```

---

### Seçenek 2: Render (Her İkisi İçin)

#### Frontend + Backend Aynı Platform

1. https://render.com adresine gidin
2. İki ayrı servis oluşturun:

**Backend Service:**
- **Name**: `fika-backend`
- **Environment**: `Node`
- **Build Command**: (boş bırakın)
- **Start Command**: `node server.js`
- **Port**: `3001`

**Frontend Service:**
- **Name**: `fika-frontend`
- **Environment**: `Static Site`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`

3. Backend URL'ini alın ve frontend'e environment variable olarak ekleyin

---

### Seçenek 3: Kendi Sunucunuz (VPS)

#### Nginx + PM2 ile

**1. Sunucuya Bağlanın:**
```bash
ssh kullanici@sunucu-ip
```

**2. Projeyi Yükleyin:**
```bash
git clone your-repo-url
cd fikacoffeepos
npm install
```

**3. Backend'i PM2 ile Çalıştırın:**
```bash
npm install -g pm2
pm2 start server.js --name fika-backend
pm2 save
pm2 startup  # Otomatik başlatma için
```

**4. Frontend Build Edin:**
```bash
npm run build
```

**5. Nginx Yapılandırması:**

`/etc/nginx/sites-available/fika-coffee-pos`:
```nginx
server {
    listen 80;
    server_name your-domain.com;

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
        root /path/to/fikacoffeepos/dist;
        try_files $uri $uri/ /index.html;
    }
}
```

**6. Nginx'i Aktifleştirin:**
```bash
sudo ln -s /etc/nginx/sites-available/fika-coffee-pos /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

**7. SSL Sertifikası (Let's Encrypt):**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 🔧 Environment Variables

### Frontend (.env.production)
```env
VITE_API_URL=https://your-backend-url.com
```

### Backend (Railway/Render'da)
```env
PORT=3001
NODE_ENV=production
```

---

## 📝 Deploy Checklist

### Frontend
- [ ] `npm run build` başarılı
- [ ] `dist` klasörü oluşturuldu
- [ ] Environment variable ayarlandı (`VITE_API_URL`)
- [ ] Site yayınlandı
- [ ] HTTPS aktif

### Backend
- [ ] Backend deploy edildi
- [ ] Port ayarlandı (3001)
- [ ] CORS ayarları yapıldı (production domain)
- [ ] `.password` dosyası güvenli (Git'e commit edilmedi)
- [ ] Health check çalışıyor (`/api/health`)

### Test
- [ ] Frontend açılıyor
- [ ] Backend API çalışıyor
- [ ] Şifre belirleme çalışıyor
- [ ] Giriş yapılabiliyor
- [ ] Farklı cihazdan test edildi

---

## 🆘 Sorun Giderme

### Frontend Backend'e Bağlanamıyor
- `VITE_API_URL` doğru mu?
- CORS hatası var mı? (Backend CORS ayarlarını kontrol edin)
- Network tab'ında istekleri kontrol edin

### Backend Çalışmıyor
- Port doğru mu?
- Logları kontrol edin
- Environment variables doğru mu?

### Şifre Çalışmıyor
- Backend çalışıyor mu?
- `.password` dosyası var mı?
- Fallback localStorage'a düşüyor mu?

---

## 💡 Öneriler

1. **Domain Kullanın**: Ücretsiz domain (Freenom) veya kendi domain'iniz
2. **HTTPS Zorunlu**: Şifreler HTTP üzerinden gönderilmemeli
3. **Yedekleme**: `.password` dosyasını güvenli yerde saklayın
4. **Monitoring**: PM2 veya hosting servisinin monitoring özelliklerini kullanın

---

## 🎉 Başarılı Deploy Sonrası

1. İlk açılışta şifre belirleyin
2. Tüm cihazlardan aynı şifreyle giriş yapabilmelisiniz
3. Uygulama kullanıma hazır!

