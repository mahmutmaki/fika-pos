# 🌿 Deploy from Branch Yöntemi

## Adım 1: dist Klasörünü GitHub'a Yükleyin

### Yöntem A: dist Klasörünü main Branch'ine Yükleyin

1. **GitHub repo sayfanıza gidin:**
   https://github.com/mahmutmaki/fika-coffee-pos

2. **"Add file" > "Upload files" tıklayın**

3. **`dist` klasöründeki TÜM dosyaları seçin:**
   - `index.html`
   - `assets/` klasörü (içindeki tüm dosyalarla)

4. **Commit yapın:**
   - Commit message: `Add dist files`
   - "Commit changes" tıklayın

### Yöntem B: gh-pages Branch Oluşturun (Önerilen)

Git kullanmadan branch oluşturmak zor, bu yüzden:
- `dist` klasörünü `main` branch'ine yükleyin
- GitHub Pages'de `main` branch'ini seçin
- Root directory: `/` (veya `/dist` yoksa)

---

## Adım 2: GitHub Pages Ayarları

1. **Settings > Pages** sayfasına gidin

2. **"Source" bölümünde:**
   - **"Deploy from a branch"** seçin

3. **Branch seçin:**
   - Branch: `main`
   - Folder: `/ (root)` veya `/dist` (eğer dist klasörünü yüklediyseniz)

4. **Save** tıklayın

---

## ⚠️ Önemli Not

`dist` klasörünü `main` branch'ine yüklerseniz:
- Kaynak kodlar ve build dosyaları aynı yerde olur
- Bu normaldir, çalışır
- Daha temiz olması için `gh-pages` branch'i oluşturulabilir (ama Git gerekir)

---

## ✅ Kontrol

1. `dist` klasörü GitHub'da görünüyor mu?
2. Settings > Pages'de `main` branch seçili mi?
3. Site URL'i çalışıyor mu?

