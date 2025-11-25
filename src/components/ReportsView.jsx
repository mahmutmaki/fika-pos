import React, { useMemo } from 'react';
import { TrendingUp, FileText, Calendar, PieChart, RefreshCw } from 'lucide-react';
import { formatCurrency, formatDateInput } from '../utils/formatters';

export default function ReportsView({ 
  salesHistory, 
  reportDateRange, 
  setReportDateRange, 
  generateSampleData 
}) {
  // Filtreleme Mantığı
  const filteredSales = useMemo(() => {
    return salesHistory.filter(sale => {
      const saleDate = sale.date.split('T')[0];
      return saleDate >= reportDateRange.start && saleDate <= reportDateRange.end;
    });
  }, [salesHistory, reportDateRange]);

  // İstatistikler
  const totalRevenue = filteredSales.reduce((acc, sale) => acc + sale.total, 0);
  const totalOrders = filteredSales.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Ürün Bazlı Analiz
  const productStats = useMemo(() => {
    const stats = {};
    filteredSales.forEach(sale => {
      sale.items.forEach(item => {
        if (!stats[item.name]) {
          stats[item.name] = { count: 0, revenue: 0 };
        }
        stats[item.name].count += item.count;
        stats[item.name].revenue += item.count * item.price;
      });
    });
    return Object.entries(stats)
      .sort(([, a], [, b]) => b.revenue - a.revenue)
      .map(([name, data]) => ({ name, ...data }));
  }, [filteredSales]);

  // Maksimum gelir (bar grafik için)
  const maxRevenue = productStats.length > 0 ? productStats[0].revenue : 0;

  return (
    <div className="flex flex-col h-full bg-stone-50">
      {/* Üst Filtre Barı */}
      <div className="bg-white p-4 shadow-sm z-10">
        <h1 className="text-2xl font-bold text-stone-800 flex items-center gap-2 mb-4">
          <TrendingUp className="text-orange-600" /> Raporlar
        </h1>
        <div className="flex flex-col md:flex-row gap-4 items-end md:items-center justify-between">
          <div className="flex gap-2 w-full md:w-auto">
            <div className="flex flex-col">
              <span className="text-xs text-stone-500 font-bold ml-1">Başlangıç</span>
              <input 
                type="date" 
                className="bg-stone-100 border border-stone-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={reportDateRange.start}
                onChange={(e) => setReportDateRange(prev => ({ ...prev, start: e.target.value }))}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-stone-500 font-bold ml-1">Bitiş</span>
              <input 
                type="date" 
                className="bg-stone-100 border border-stone-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={reportDateRange.end}
                onChange={(e) => setReportDateRange(prev => ({ ...prev, end: e.target.value }))}
              />
            </div>
          </div>
          
          {salesHistory.length === 0 && (
            <button 
              onClick={generateSampleData} 
              className="w-full md:w-auto bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
            >
              <RefreshCw size={16} /> Test Verilerini Yükle
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24">
        {/* Özet Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-orange-800 to-orange-900 text-white p-6 rounded-2xl shadow-lg">
            <div className="text-orange-200 text-sm mb-1 font-medium">Toplam Ciro</div>
            <div className="text-3xl font-bold tracking-tight">{formatCurrency(totalRevenue)}</div>
            <div className="text-xs text-orange-300 mt-2 opacity-80">Seçili tarih aralığı için</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
            <div className="text-stone-500 text-sm mb-1 font-medium">Toplam Sipariş</div>
            <div className="text-3xl font-bold text-stone-800">{totalOrders}</div>
            <div className="text-xs text-green-600 mt-2 font-bold flex items-center gap-1">
              <FileText size={12}/> Adet İşlem
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
            <div className="text-stone-500 text-sm mb-1 font-medium">Ortalama Sepet</div>
            <div className="text-3xl font-bold text-stone-800">{formatCurrency(averageOrderValue)}</div>
            <div className="text-xs text-stone-400 mt-2">İşlem başına düşen gelir</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ürün Satış Analizi */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="p-4 border-b bg-stone-50 flex justify-between items-center">
              <h3 className="font-bold text-stone-700 flex items-center gap-2">
                <PieChart size={18}/> Ürün Bazlı Satışlar
              </h3>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              {productStats.length === 0 ? (
                <div className="text-center text-stone-400 py-8">Veri bulunamadı.</div>
              ) : (
                productStats.map((item, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-stone-700">{item.name}</span>
                      <span className="font-bold text-stone-900">{formatCurrency(item.revenue)}</span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="bg-orange-500 h-2.5 rounded-full" 
                        style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-stone-400 mt-1 text-right">{item.count} Adet satıldı</div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Geçmiş İşlemler Listesi */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="p-4 border-b bg-stone-50 font-bold text-stone-700 flex items-center gap-2">
              <Calendar size={18}/> İşlem Geçmişi
            </div>
            <div className="divide-y divide-stone-100 max-h-96 overflow-y-auto">
              {filteredSales.length === 0 ? (
                <div className="p-8 text-center text-stone-400">Bu tarih aralığında satış yok.</div>
              ) : (
                filteredSales.slice().reverse().map((sale) => (
                  <div key={sale.id} className="p-4 flex justify-between items-center hover:bg-stone-50 transition-colors">
                    <div>
                      <div className="font-bold text-stone-800">{sale.tableName}</div>
                      <div className="text-xs text-stone-500 flex items-center gap-2">
                        {new Date(sale.date).toLocaleString('tr-TR')}
                      </div>
                      <div className="text-xs text-stone-400 mt-1 line-clamp-1">
                        {sale.items.map(i => `${i.count}x ${i.name}`).join(', ')}
                      </div>
                    </div>
                    <div className="font-bold text-orange-700 text-lg whitespace-nowrap ml-4">
                      {formatCurrency(sale.total)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

