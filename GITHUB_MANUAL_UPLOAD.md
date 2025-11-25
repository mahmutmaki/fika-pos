# 📤 GitHub'a Manuel Yükleme Kılavuzu

## Adım Adım Yükleme

### 1. GitHub Repo Sayfanıza Gidin
https://github.com/mahmutmaki/fika-coffee-pos

### 2. Dosya Yükleme
1. "Add file" butonuna tıklayın
2. "Upload files" seçeneğini seçin

### 3. Dosyaları Yükleyin
**ÖNEMLİ:** Aşağıdaki dosyaları yükleyin (hepsini seçin):

#### Kök Dizin Dosyaları:
- `package.json`
- `package-lock.json`
- `vite.config.js`
- `tailwind.config.js`
- `postcss.config.js`
- `index.html`
- `README.md`
- `.gitignore`
- `netlify.toml`
- `vercel.json`
- `nginx.conf`
- `.htaccess`
- `Procfile`
- `railway.json`

#### Klasörler:
- `src/` klasörünün TÜMÜ (içindeki tüm dosyalar)
- `.github/` klasörü (varsa)

#### YÜKLEMEYİN:
- `node_modules/` klasörü (çok büyük, gerek yok)
- `dist/` klasörü (build dosyaları, otomatik oluşturulur)

### 4. Commit Yapın
1. Alt kısımda "Commit changes" bölümüne gidin
2. "Commit message" alanına: `Initial commit` yazın
3. "Commit changes" butonuna tıklayın

### 5. Tüm Dosyalar Yüklendi mi?
Repo sayfanızda şu klasörler görünmeli:
- `src/`
- `.github/` (varsa)
- Kök dizinde dosyalar

---

## ⚠️ Önemli Notlar

1. **Tek seferde yükleyin:** Tüm dosyaları aynı anda seçip yükleyin
2. **Klasör yapısını koruyun:** `src/components/`, `src/utils/` gibi klasörler aynı kalmalı
3. **`.gitignore` dosyası:** Bu dosya önemli, mutlaka yükleyin

---

## ✅ Yükleme Sonrası

Dosyalar yüklendikten sonra:
1. Repo sayfanızda tüm dosyalar görünmeli
2. `package.json` dosyası görünmeli
3. `src/` klasörü ve içindeki dosyalar görünmeli

---

## 🚀 Sonraki Adımlar

Dosyalar yüklendikten sonra GitHub Pages'i aktifleştirebiliriz (otomatik deploy için).

