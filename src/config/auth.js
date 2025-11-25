// Şifre yapılandırması
// Bu dosyayı düzenleyerek şifreyi değiştirebilirsiniz

// Şifreyi hash'leyerek saklıyoruz (güvenlik için)
// Varsayılan şifre: "fika2024"
// Şifreyi değiştirmek için:
// 1. Yeni şifrenizi belirleyin (örn: "yenisifre123")
// 2. Bu şifreyi SHA-256 ile hash'leyin: https://emn178.github.io/online-tools/sha256.html
// 3. Aşağıdaki DEFAULT_PASSWORD_HASH değerini yeni hash ile değiştirin

// Environment variable'dan şifre hash'i al, yoksa varsayılan kullan
// Varsayılan şifre: "fika2024" -> Hash: fdd4af830ea5e2864b7d5ac7d33aea7f70aa5c7ae784b5ce08b78f9ac12ce9a6
const DEFAULT_PASSWORD_HASH = 'fdd4af830ea5e2864b7d5ac7d33aea7f70aa5c7ae784b5ce08b78f9ac12ce9a6';

// Production'da environment variable kullan
const PASSWORD_HASH = import.meta.env.VITE_PASSWORD_HASH || DEFAULT_PASSWORD_HASH;

// Şifre hash'leme fonksiyonu (SHA-256)
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export const authConfig = {
  // Şifre hash'i (bu değiştirilebilir)
  passwordHash: PASSWORD_HASH,
  
  // Şifre hash'leme fonksiyonu
  hashPassword,
  
  // Şifre kontrolü
  async checkPassword(password) {
    const inputHash = await hashPassword(password);
    return inputHash.toLowerCase() === this.passwordHash.toLowerCase();
  }
};

