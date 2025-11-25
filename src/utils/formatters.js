// Para birimi formatlayıcı
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 2
  }).format(amount);
};

// Tarih formatlayıcı (YYYY-MM-DD formatı inputlar için)
export const formatDateInput = (date) => {
  return date.toISOString().split('T')[0];
};

