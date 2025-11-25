# 🔧 Sorun Giderme - Boş Sayfa

## Olası Nedenler ve Çözümler

### 1. Dosyalar Yanlış Yerde

**Kontrol:**
- GitHub repo'nuzda `index.html` dosyası root'ta mı? (https://github.com/mahmutmaki/fika-coffee-pos)
- Yoksa `dist/index.html` şeklinde mi?

**Çözüm:**
- Eğer `dist/` klasörü içindeyse, GitHub Pages'de Folder: `/dist` seçin
- Veya `dist/` içindeki dosyaları root'a taşıyın

### 2. Asset Dosyaları Yolu Yanlış

**Kontrol:**
- `index.html` dosyasını açın
- `<script>` ve `<link>` tag'lerinde yollar nasıl?
- `/assets/` şeklinde mi yoksa `./assets/` şeklinde mi?

**Çözüm:**
- Eğer `/assets/` şeklindeyse, repo adını ekleyin: `/fika-coffee-pos/assets/`
- Veya `vite.config.js`'de base path ayarlayın

### 3. GitHub Pages Base Path Sorunu

**Çözüm:**
`vite.config.js` dosyasını güncelleyin:

```js
export default defineConfig({
  plugins: [react()],
  base: '/fika-coffee-pos/', // Repo adınız
})
```

Sonra yeniden build edin ve yükleyin.

### 4. Dosya Yapısı Kontrolü

GitHub'da şu yapı olmalı:
```
fika-coffee-pos/
  ├── index.html
  ├── assets/
  │   ├── index-xxxxx.js
  │   └── index-xxxxx.css
```

**YANLIŞ:**
```
fika-coffee-pos/
  ├── dist/
  │   ├── index.html
  │   └── assets/
```

---

## Hızlı Çözüm

1. **GitHub'da dosya yapısını kontrol edin**
2. **`index.html` root'ta mı?**
3. **Settings > Pages'de Folder ayarı doğru mu?**

