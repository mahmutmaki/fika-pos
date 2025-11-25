# 🔐 Şifre Yapılandırması

## Mevcut Şifre

**Varsayılan şifre:** `fika2024`

Bu şifre tüm cihazlarda geçerlidir. Herhangi bir cihazdan bu şifreyle giriş yapabilirsiniz.

## Şifre Değiştirme

Şifreyi değiştirmek için:

### 1. Yeni Şifre Belirleyin
Örneğin: `yenisifre123`

### 2. Şifreyi Hash'leyin
1. https://emn178.github.io/online-tools/sha256.html adresine gidin
2. Yeni şifrenizi yazın
3. SHA-256 hash'ini kopyalayın

**VEYA** Terminal'de:
```bash
node -e "const crypto = require('crypto'); console.log(crypto.createHash('sha256').update('yenisifre123').digest('hex'));"
```

### 3. Hash'i Koda Ekleyin

`src/config/auth.js` dosyasını açın ve şu satırı bulun:
```javascript
const DEFAULT_PASSWORD_HASH = 'fdd4af830ea5e2864b7d5ac7d33aea7f70aa5c7ae784b5ce08b78f9ac12ce9a6';
```

Yeni hash ile değiştirin:
```javascript
const DEFAULT_PASSWORD_HASH = 'YENI_HASH_BURAYA';
```

### 4. Build ve Deploy

```bash
npm run build
# Sonra deploy edin
```

## Environment Variable ile (Opsiyonel)

Production'da environment variable kullanmak isterseniz:

1. `.env.production` dosyası oluşturun:
```env
VITE_PASSWORD_HASH=fdd4af830ea5e2864b7d5ac7d33aea7f70aa5c7ae784b5ce08b78f9ac12ce9a6
```

2. Build edin:
```bash
npm run build
```

3. Deploy ederken environment variable'ı ekleyin (Netlify/Vercel'de)

## Güvenlik Notları

⚠️ **ÖNEMLİ:**
- Şifre hash'i kodda görünür (build dosyalarında)
- Bu yüzden çok hassas uygulamalar için backend kullanın
- Ancak basit kullanım için yeterli güvenlik sağlar
- Şifreyi düzenli olarak değiştirin

## Test

Şifreyi değiştirdikten sonra:
1. Build edin: `npm run build`
2. Test edin: `npm run preview`
3. Yeni şifreyle giriş yapın

