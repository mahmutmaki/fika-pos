import React from 'react';
import { Settings, ArrowRight, RefreshCw } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function POSView({ 
  sections, 
  tables, 
  activeSectionId, 
  setActiveSectionId, 
  setSelectedTable,
  setActiveTab,
  generateSampleData 
}) {
  if (sections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center text-stone-500">
        <div className="bg-stone-100 p-6 rounded-full mb-4">
          <Settings size={48} className="text-stone-400" />
        </div>
        <h3 className="text-xl font-bold text-stone-800 mb-2">Henüz Veri Yok</h3>
        <p className="max-w-xs mx-auto mb-6">Kullanmaya başlamak için Ayarlar menüsünden veri ekleyin veya Raporlar menüsünden test verisi yükleyin.</p>
        <div className="flex gap-4">
          <button 
            onClick={() => setActiveTab('settings')} 
            className="bg-orange-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-800 transition-colors"
          >
            Ayarlara Git <ArrowRight size={18} />
          </button>
          <button 
            onClick={generateSampleData} 
            className="bg-stone-200 text-stone-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-stone-300 transition-colors"
          >
            Test Verisi <RefreshCw size={18} />
          </button>
        </div>
      </div>
    );
  }

  const filteredTables = tables.filter(t => t.sectionId === activeSectionId);

  return (
    <div className="flex flex-col h-full">
      <div className="flex overflow-x-auto p-4 gap-2 bg-white shadow-sm no-scrollbar">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSectionId(section.id)}
            className={`px-6 py-3 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
              activeSectionId === section.id 
                ? 'bg-orange-900 text-white shadow-lg' 
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {section.name}
          </button>
        ))}
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-stone-50">
        {filteredTables.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-stone-400">
            <p>Bu bölümde henüz masa yok.</p>
            <p className="text-xs mt-2">Ayarlar menüsünden bu bölüme masa ekleyin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredTables.map(table => {
              const total = table.orders.reduce((acc, item) => acc + (item.price * item.count), 0);
              const isOccupied = table.orders.length > 0;
              return (
                <button
                  key={table.id}
                  onClick={() => setSelectedTable(table)}
                  className={`relative p-4 rounded-2xl flex flex-col justify-between h-32 md:h-40 transition-all transform hover:scale-105 ${
                    isOccupied 
                      ? 'bg-white border-2 border-orange-500 shadow-orange-100' 
                      : 'bg-white border-2 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex justify-between w-full items-start">
                    <span className={`font-bold text-lg ${isOccupied ? 'text-orange-900' : 'text-stone-700'}`}>
                      {table.name}
                    </span>
                    <div className={`w-3 h-3 rounded-full ${isOccupied ? 'bg-orange-500' : 'bg-green-400'}`} />
                  </div>
                  {isOccupied ? (
                    <div className="text-right w-full">
                      <div className="text-xs text-stone-500">{table.orders.length} Kalem</div>
                      <div className="text-xl font-bold text-orange-600">{formatCurrency(total)}</div>
                    </div>
                  ) : (
                    <div className="flex items-center text-stone-400 text-sm">
                      <span className="mr-1">+</span> Sipariş Gir
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

