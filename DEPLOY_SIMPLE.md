# 🚀 Basit Deploy Kılavuzu (Backend Olmadan)

Backend olmadan, sadece frontend'i deploy ediyoruz. Her cihaz kendi şifresini belirleyecek (localStorage).

## 📦 GitHub Pages ile Deploy

### Yöntem 1: GitHub Actions (Otomatik)

1. **GitHub'da repo oluşturun:**
   - https://github.com/new
   - Repo adı: `fika-coffee-pos` (veya istediğiniz isim)
   - Public veya Private seçin

2. **Kodu GitHub'a yükleyin:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/kullanici-adi/fika-coffee-pos.git
git push -u origin main
```

3. **GitHub Pages'i aktifleştirin:**
   - Repo'da Settings > Pages
   - Source: "GitHub Actions" seçin
   - `.github/workflows/deploy.yml` dosyası otomatik çalışacak

4. **Site yayınlanır:**
   - URL: `https://kullanici-adi.github.io/fika-coffee-pos/`
   - Her push'ta otomatik güncellenir!

### Yöntem 2: Manuel Deploy

```bash
# Build oluştur
npm run build

# gh-pages branch'ine deploy
npm install -g gh-pages
gh-pages -d dist
```

Sonra GitHub Settings > Pages > Source: `gh-pages` branch seçin.

---

## 🌐 Netlify ile Deploy (Daha Kolay)

### Yöntem 1: Drag & Drop

1. **Build oluşturun:**
```bash
npm run build
```

2. **Netlify'a gidin:**
   - https://app.netlify.com/drop
   - `dist` klasörünü sürükleyip bırakın
   - Site otomatik yayınlanır!

### Yöntem 2: GitHub Bağlantısı

1. **GitHub'a push edin** (yukarıdaki adımlar)

2. **Netlify'da:**
   - "Add new site" > "Import an existing project"
   - GitHub repo'nuzu seçin
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Deploy!

3. **Otomatik güncelleme:**
   - Her GitHub push'unda otomatik deploy olur
   - URL: `https://random-name.netlify.app`
   - Custom domain ekleyebilirsiniz!

---

## ⚡ Vercel ile Deploy

1. **GitHub'a push edin**

2. **Vercel'de:**
   - https://vercel.com
   - "New Project"
   - GitHub repo'nuzu seçin
   - Otomatik algılar (Vite + React)
   - Deploy!

3. **URL:** `https://your-project.vercel.app`

---

## 📝 Önemli Notlar

### GitHub Pages için Base Path

Eğer repo adı ile URL kullanmak istiyorsanız (`/fika-coffee-pos/`):

`vite.config.js` dosyasında:
```js
base: '/fika-coffee-pos/'
```

### Şifre Sistemi

- Backend olmadan her cihaz kendi şifresini belirler
- Şifre localStorage'da saklanır
- Cihazlar arası senkron yok
- Tarayıcı verilerini temizlerseniz şifre sıfırlanır

### HTTPS

Tüm bu servisler otomatik HTTPS sağlar!

---

## 🎯 Hangi Yöntemi Seçmeliyim?

- **GitHub Pages**: Ücretsiz, GitHub ile entegre, otomatik deploy
- **Netlify**: En kolay, drag & drop, custom domain kolay
- **Vercel**: Hızlı, modern, geliştirici dostu

Hepsi ücretsiz ve kolay! İstediğinizi seçin.

---

## ✅ Deploy Sonrası

1. Site URL'inizi açın
2. İlk açılışta şifre belirleyin
3. Uygulama kullanıma hazır!
4. Her cihazdan erişebilirsiniz (her cihaz kendi şifresini belirler)

