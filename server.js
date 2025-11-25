// Basit Express.js backend - Şifre yönetimi için
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const PASSWORD_FILE = path.join(__dirname, '.password');

app.use(cors());
app.use(express.json());

// Şifre hash'leme fonksiyonu
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Şifre dosyasını oku
function readPassword() {
  try {
    if (fs.existsSync(PASSWORD_FILE)) {
      return fs.readFileSync(PASSWORD_FILE, 'utf8').trim();
    }
    return null;
  } catch (error) {
    return null;
  }
}

// Şifre dosyasına yaz
function writePassword(hash) {
  try {
    fs.writeFileSync(PASSWORD_FILE, hash, 'utf8');
    return true;
  } catch (error) {
    return false;
  }
}

// Şifre kontrolü endpoint'i
app.post('/api/auth/check', (req, res) => {
  const { password } = req.body;
  
  if (!password) {
    return res.status(400).json({ error: 'Şifre gerekli' });
  }

  const savedHash = readPassword();
  
  if (!savedHash) {
    return res.json({ exists: false });
  }

  const inputHash = hashPassword(password);
  const isValid = inputHash === savedHash;

  res.json({ 
    exists: true, 
    valid: isValid 
  });
});

// Şifre belirleme endpoint'i
app.post('/api/auth/set', (req, res) => {
  const { password } = req.body;
  
  if (!password) {
    return res.status(400).json({ error: 'Şifre gerekli' });
  }

  if (password.length < 4) {
    return res.status(400).json({ error: 'Şifre en az 4 karakter olmalıdır' });
  }

  const savedHash = readPassword();
  
  if (savedHash) {
    return res.status(400).json({ error: 'Şifre zaten belirlenmiş. Sıfırlamak için /api/auth/reset endpoint\'ini kullanın' });
  }

  const hash = hashPassword(password);
  const success = writePassword(hash);

  if (success) {
    res.json({ success: true, message: 'Şifre başarıyla belirlendi' });
  } else {
    res.status(500).json({ error: 'Şifre kaydedilemedi' });
  }
});

// Şifre sıfırlama endpoint'i
app.post('/api/auth/reset', (req, res) => {
  const { password, currentPassword } = req.body;
  
  if (!password) {
    return res.status(400).json({ error: 'Yeni şifre gerekli' });
  }

  if (password.length < 4) {
    return res.status(400).json({ error: 'Şifre en az 4 karakter olmalıdır' });
  }

  const savedHash = readPassword();
  
  if (!savedHash) {
    return res.status(400).json({ error: 'Kayıtlı şifre bulunamadı' });
  }

  // Mevcut şifre kontrolü
  if (currentPassword) {
    const currentHash = hashPassword(currentPassword);
    if (currentHash !== savedHash) {
      return res.status(401).json({ error: 'Mevcut şifre hatalı' });
    }
  }

  const hash = hashPassword(password);
  const success = writePassword(hash);

  if (success) {
    res.json({ success: true, message: 'Şifre başarıyla sıfırlandı' });
  } else {
    res.status(500).json({ error: 'Şifre kaydedilemedi' });
  }
});

// Şifre durumu kontrolü
app.get('/api/auth/status', (req, res) => {
  const savedHash = readPassword();
  res.json({ exists: !!savedHash });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`🔒 Auth server çalışıyor: http://localhost:${PORT}`);
  console.log(`📝 Şifre dosyası: ${PASSWORD_FILE}`);
});

