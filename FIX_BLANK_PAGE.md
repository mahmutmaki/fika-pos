# 🔧 Boş Sayfa Sorunu - Çözüm

## Sorun
GitHub Pages'de repo adı URL'de olduğu için (`/fika-pos/`) dosya yolları yanlış.

## Çözüm Adımları

### 1. Yeni Build Oluşturun

PowerShell'de şu komutu çalıştırın:
```bash
cd C:\fikacoffeepos
npm run build
```

### 2. Yeni dist Klasörünü GitHub'a Yükleyin

1. **GitHub repo sayfanıza gidin:**
   https://github.com/mahmutmaki/fika-pos

2. **Eski `dist` dosyalarını silin:**
   - `index.html` dosyasına tıklayın
   - Sağ üstte çöp kutusu ikonuna tıklayın
   - "Commit changes" yapın
   - `assets/` klasörünü de silin (aynı şekilde)

3. **Yeni dosyaları yükleyin:**
   - "Add file" > "Upload files"
   - `C:\fikacoffeepos\dist\` klasöründeki TÜM dosyaları seçin
   - Commit yapın

### 3. Kontrol Edin

1. **Settings > Pages** sayfasına gidin
2. **Folder:** `/ (root)` olduğundan emin olun
3. **Site URL:** https://mahmutmaki.github.io/fika-pos/
4. Birkaç dakika bekleyin ve tekrar deneyin

---

## Alternatif: Eğer Hala Çalışmazsa

GitHub'da `index.html` dosyasını açın ve şu satırları kontrol edin:

**DOĞRU:**
```html
<script src="/fika-pos/assets/index-xxxxx.js"></script>
<link href="/fika-pos/assets/index-xxxxx.css">
```

**YANLIŞ:**
```html
<script src="/assets/index-xxxxx.js"></script>
```

Eğer `/assets/` şeklindeyse, build düzgün yapılmamış demektir.

