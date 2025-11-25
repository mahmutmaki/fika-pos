# Fika Coffee POS Sistemi

Modern bir kafe POS (Point of Sale) uygulaması. React, Vite ve Tailwind CSS ile geliştirilmiştir.

## Özellikler

- 🍽️ **Masa Yönetimi**: Bölümler ve masalar oluşturma
- ☕ **Ürün Yönetimi**: Kategoriler ve ürünler ekleme
- 📊 **Satış İşlemleri**: Sipariş alma ve hesap kapatma
- 📈 **Raporlar**: Tarih aralığına göre satış analizi
- 💾 **Yerel Depolama**: Tüm veriler tarayıcıda saklanır

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

3. Tarayıcıda `http://localhost:5173` adresine gidin.

## Kullanım

### İlk Kurulum

1. **Ayarlar** sekmesine gidin
2. Sırasıyla:
   - Bölümler oluşturun (örn: Salon, Bahçe)
   - Masalar ekleyin
   - Kategoriler oluşturun (örn: Sıcak Kahveler)
   - Ürünler ekleyin

### Test Verisi

Hızlı başlamak için **Raporlar** sekmesinden "Test Verilerini Yükle" butonuna tıklayarak örnek veriler yükleyebilirsiniz.

## Teknolojiler

- React 18
- Vite
- Tailwind CSS
- Lucide React (İkonlar)

## Yapı

```
fikacoffeepos/
├── src/
│   ├── components/      # React bileşenleri
│   │   ├── POSView.jsx
│   │   ├── ReportsView.jsx
│   │   ├── OrderModal.jsx
│   │   ├── SettingsView.jsx
│   │   └── ConfirmationDialog.jsx
│   ├── utils/           # Yardımcı fonksiyonlar
│   │   └── formatters.js
│   ├── styles/          # CSS dosyaları
│   │   └── index.css
│   ├── App.jsx          # Ana uygulama
│   └── main.jsx         # Giriş noktası
├── index.html
├── package.json
└── vite.config.js
```

## Lisans

MIT

