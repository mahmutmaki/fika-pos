# 🔒 Güvenlik Kılavuzu

## Şifre Koruması Sistemi

Uygulama artık şifre koruması ile korunmaktadır. İlk açılışta şifre belirlemeniz gerekecektir.

## 🎯 Özellikler

- ✅ **Şifre Koruması**: Uygulamaya erişim için şifre gereklidir
- ✅ **İlk Kurulum**: İlk açılışta şifre belirleme ekranı
- ✅ **Şifre Sıfırlama**: "Şifremi Unuttum" ile tüm verileri sıfırlayıp yeni şifre belirleme
- ✅ **Oturum Yönetimi**: Giriş yaptıktan sonra tarayıcı kapatılsa bile oturum açık kalır
- ✅ **Güvenli Çıkış**: Header'daki çıkış butonu ile güvenli çıkış

## 🔐 Güvenlik Notları

### ⚠️ Önemli Uyarılar

1. **Şifre Güvenliği**:
   - Güçlü bir şifre seçin (en az 8 karakter, harf, rakam, özel karakter)
   - Şifrenizi kimseyle paylaşmayın
   - Şifrenizi düzenli olarak değiştirin

2. **Tarayıcı Güvenliği**:
   - Ortak bilgisayarlarda kullanmayın
   - Kullanımdan sonra mutlaka çıkış yapın
   - Tarayıcı şifre kaydetme özelliğini kullanmayın

3. **Veri Güvenliği**:
   - Tüm veriler tarayıcının localStorage'ında saklanır
   - Tarayıcı verilerini temizlerseniz tüm veriler silinir
   - Düzenli yedekleme yapın (verileri export edin)

4. **Sunucu Güvenliği**:
   - HTTPS kullanın (SSL sertifikası)
   - Güvenli hosting seçin
   - Düzenli güncellemeler yapın

## 🚀 Kullanım

### İlk Kurulum

1. Uygulamayı ilk açtığınızda şifre belirleme ekranı görünecek
2. En az 4 karakterlik bir şifre belirleyin
3. Şifreyi tekrar girin ve kaydedin
4. Artık uygulamaya erişebilirsiniz

### Giriş Yapma

1. Uygulamayı açın
2. Şifrenizi girin
3. "Giriş Yap" butonuna tıklayın

### Çıkış Yapma

1. Sağ üstteki "Çıkış" butonuna tıklayın
2. Onaylayın
3. Tekrar giriş yapmanız gerekecek

### Şifre Sıfırlama

1. Giriş ekranında "Şifremi Unuttum / Sıfırla" butonuna tıklayın
2. Onaylayın (⚠️ Tüm veriler silinecek!)
3. Yeni şifre belirleyin

## 🔧 Gelişmiş Güvenlik Önerileri

### 1. Sunucu Tarafı Authentication (Önerilen)

Daha güvenli bir sistem için backend ekleyebilirsiniz:

- JWT token tabanlı authentication
- Kullanıcı veritabanı
- Şifre hash'leme (bcrypt)
- Session yönetimi
- Rate limiting

### 2. IP Whitelist

Sadece belirli IP adreslerinden erişime izin verin (nginx/Apache yapılandırması)

### 3. 2FA (İki Faktörlü Doğrulama)

SMS veya Authenticator app ile ek güvenlik katmanı

### 4. Otomatik Oturum Kapatma

Belirli bir süre hareketsiz kalındığında otomatik çıkış

## 📝 Notlar

- Mevcut sistem **frontend-only** bir güvenlik sağlar
- Şifreler hash'lenerek saklanır (basit hash, production için daha güvenli yöntemler önerilir)
- Kritik uygulamalar için backend authentication şiddetle önerilir
- Veriler localStorage'da saklandığı için tarayıcı verilerini temizlemek tüm verileri siler

## 🆘 Sorun Giderme

**Şifremi unuttum:**
- "Şifremi Unuttum" butonunu kullanın (tüm veriler silinir)
- Veya tarayıcı localStorage'ını temizleyin

**Giriş yapamıyorum:**
- Şifrenizi kontrol edin
- Tarayıcı cache'ini temizleyin
- Farklı tarayıcı deneyin

**Oturum kapanmıyor:**
- Tarayıcı verilerini temizleyin
- Çıkış butonunu kullanın

