# Fika Coffee POS - Deploy Kılavuzu

Production build başarıyla oluşturuldu! `dist` klasöründe hazır dosyalar var.

## 🚀 Deploy Seçenekleri

### 1. Netlify (Ücretsiz - Önerilen)

**Adımlar:**
1. [Netlify.com](https://netlify.com) hesabı oluşturun
2. "Add new site" > "Import an existing project"
3. GitHub'a push edip bağlayın VEYA
4. "Deploy manually" seçip `dist` klasörünü sürükleyin
5. Site otomatik yayınlanır!

**Veya Netlify CLI ile:**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

### 2. Vercel (Ücretsiz - Önerilen)

**Adımlar:**
1. [Vercel.com](https://vercel.com) hesabı oluşturun
2. "New Project" tıklayın
3. GitHub repo'nuzu bağlayın VEYA
4. `dist` klasörünü sürükleyin
5. Deploy butonuna tıklayın!

**Veya Vercel CLI ile:**
```bash
npm install -g vercel
vercel --prod
```

### 3. GitHub Pages

**Adımlar:**
1. GitHub'da repo oluşturun
2. `dist` klasöründeki dosyaları `gh-pages` branch'ine push edin
3. GitHub Settings > Pages > Source: `gh-pages` branch seçin

**Otomatik script:**
```bash
npm install -g gh-pages
gh-pages -d dist
```

### 4. Kendi Sunucunuza Yükleme

#### Nginx ile:

1. `dist` klasörünü sunucuya yükleyin:
```bash
scp -r dist/* kullanici@sunucu:/var/www/fika-coffee-pos/dist/
```

2. `nginx.conf` dosyasını sunucuya kopyalayın:
```bash
sudo cp nginx.conf /etc/nginx/sites-available/fika-coffee-pos
sudo ln -s /etc/nginx/sites-available/fika-coffee-pos /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### Apache ile:

`.htaccess` dosyası oluşturun:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### 5. FTP ile Yükleme

1. `dist` klasöründeki tüm dosyaları seçin
2. FTP istemcinizle (FileZilla, WinSCP) sunucuya bağlanın
3. `public_html` veya `www` klasörüne yükleyin
4. `.htaccess` dosyasını da ekleyin (Apache için)

## 📦 Build Dosyaları

Production build `dist` klasöründe hazır:
- `dist/index.html` - Ana HTML dosyası
- `dist/assets/` - CSS ve JS dosyaları

## ⚙️ Otomatik Deploy Script

`package.json`'a deploy script'i ekleyebilirsiniz:

```json
"scripts": {
  "deploy": "npm run build && netlify deploy --prod --dir=dist"
}
```

## 🔒 HTTPS

Tüm modern hosting servisleri otomatik HTTPS sağlar. Kendi sunucunuzda Let's Encrypt kullanabilirsiniz.

## 📱 Tablet/Mobil Erişim

Deploy sonrası uygulama herhangi bir cihazdan (tablet, telefon, bilgisayar) erişilebilir olacak!

## 🆘 Sorun Giderme

- **404 hatası**: SPA routing için tüm istekler `index.html`'e yönlendirilmeli
- **Beyaz ekran**: Console'da hata var mı kontrol edin
- **Yavaş yükleme**: CDN kullanın veya gzip compression açın

