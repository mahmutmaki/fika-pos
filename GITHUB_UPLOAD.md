# 📤 GitHub'a Yükleme Kılavuzu

## Yöntem 1: GitHub Desktop (En Kolay - Önerilen)

### Adım 1: GitHub Desktop İndirin
1. https://desktop.github.com adresine gidin
2. "Download for Windows" butonuna tıklayın
3. İndirilen dosyayı çalıştırıp kurun

### Adım 2: GitHub Hesabı Oluşturun (Yoksa)
1. https://github.com adresine gidin
2. "Sign up" tıklayın
3. Email, kullanıcı adı ve şifre belirleyin
4. Email doğrulaması yapın

### Adım 3: GitHub Desktop'ta Giriş Yapın
1. GitHub Desktop'u açın
2. "Sign in to GitHub.com" tıklayın
3. GitHub hesabınızla giriş yapın

### Adım 4: Repo Oluşturun
1. GitHub Desktop'ta "File" > "New Repository" tıklayın
2. **Name:** `fika-coffee-pos` (veya istediğiniz isim)
3. **Description:** "Fika Coffee POS Sistemi"
4. **Local Path:** `C:\fikacoffeepos` (mevcut klasörünüz)
5. **Git ignore:** `.gitignore` seçin (otomatik algılanır)
6. **License:** None (veya istediğiniz)
7. "Create Repository" tıklayın

### Adım 5: Dosyaları Yükleyin
1. Sol tarafta değişiklikler görünecek
2. Alt kısımda "Summary" alanına: `Initial commit` yazın
3. "Commit to main" butonuna tıklayın
4. Sağ üstte "Publish repository" butonuna tıklayın
5. "Keep this code private" seçeneğini işaretleyin (isterseniz)
6. "Publish repository" tıklayın

### Adım 6: GitHub Pages'i Aktifleştirin
1. https://github.com/KULLANICI-ADI/fika-coffee-pos adresine gidin
2. "Settings" sekmesine tıklayın
3. Sol menüden "Pages" seçin
4. "Source" altında "GitHub Actions" seçin
5. Birkaç dakika bekleyin, site yayınlanacak!

**Site URL:** `https://KULLANICI-ADI.github.io/fika-coffee-pos/`

---

## Yöntem 2: Git Komut Satırı

### Adım 1: Git İndirin
1. https://git-scm.com/download/win adresine gidin
2. İndirip kurun (varsayılan ayarlarla)

### Adım 2: GitHub'da Repo Oluşturun
1. https://github.com/new adresine gidin
2. **Repository name:** `fika-coffee-pos`
3. **Description:** "Fika Coffee POS Sistemi"
4. **Public** veya **Private** seçin
5. "Create repository" tıklayın

### Adım 3: Terminal'de Komutları Çalıştırın

**PowerShell veya Command Prompt'u açın ve şu komutları sırayla çalıştırın:**

```bash
cd C:\fikacoffeepos
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/KULLANICI-ADI/fika-coffee-pos.git
git push -u origin main
```

**Not:** `KULLANICI-ADI` yerine GitHub kullanıcı adınızı yazın!

### Adım 4: GitHub Pages'i Aktifleştirin
(Yukarıdaki Yöntem 1, Adım 6 ile aynı)

---

## 🎯 Hangi Yöntemi Seçmeliyim?

- **GitHub Desktop:** Hiç bilmiyorsanız, en kolay yol
- **Git Komut Satırı:** Daha hızlı, daha kontrollü

Her ikisi de aynı sonucu verir!

---

## ✅ Yükleme Sonrası

1. Site otomatik yayınlanır (birkaç dakika sürebilir)
2. URL: `https://KULLANICI-ADI.github.io/fika-coffee-pos/`
3. Her değişiklikte otomatik güncellenir!

---

## 🔄 Güncelleme

Kod değişikliği yaptığınızda:

**GitHub Desktop:**
1. Değişiklikleri görün
2. Commit mesajı yazın
3. "Commit to main" tıklayın
4. "Push origin" tıklayın

**Git Komut Satırı:**
```bash
git add .
git commit -m "Değişiklik açıklaması"
git push
```

