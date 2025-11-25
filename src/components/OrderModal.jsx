import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Trash2, CreditCard, ShoppingBag } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function OrderModal({ 
  selectedTable, 
  setSelectedTable, 
  tables, 
  categories, 
  products, 
  addToOrder, 
  removeFromOrder, 
  closeTable 
}) {
  if (!selectedTable) return null;

  const currentTable = tables.find(t => t.id === selectedTable.id);
  const total = currentTable.orders.reduce((acc, item) => acc + (item.price * item.count), 0);
  const [activeCategory, setActiveCategory] = useState(categories.length > 0 ? categories[0].id : null);

  useEffect(() => {
    if (!activeCategory && categories.length > 0) setActiveCategory(categories[0].id);
  }, [categories, activeCategory]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-stone-50 md:flex-row">
      <div className="md:hidden flex justify-between items-center p-4 bg-white border-b">
        <h2 className="font-bold text-lg">{currentTable.name}</h2>
        <button onClick={() => setSelectedTable(null)} className="p-2 bg-stone-100 rounded-full">
          <X size={20} />
        </button>
      </div>
      
      <div className="flex-1 flex flex-col bg-white border-r border-stone-200 md:w-1/3 max-h-[50vh] md:max-h-full overflow-hidden order-2 md:order-1">
        <div className="hidden md:flex justify-between items-center p-6 border-b bg-stone-50">
          <div>
            <h2 className="text-2xl font-bold text-stone-800">{currentTable.name}</h2>
            <p className="text-sm text-stone-500">Adisyon Detayı</p>
          </div>
          <button onClick={() => setSelectedTable(null)} className="p-2 hover:bg-stone-200 rounded-full">
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {currentTable.orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-stone-400">
              <ShoppingBag size={48} className="mb-2 opacity-20" />
              <p>Henüz sipariş eklenmedi.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {currentTable.orders.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-stone-50 p-3 rounded-lg border border-stone-100">
                  <div>
                    <div className="font-medium text-stone-800">{item.name}</div>
                    <div className="text-xs text-stone-500">
                      {formatCurrency(item.price)} x {item.count}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-stone-700">
                      {formatCurrency(item.price * item.count)}
                    </div>
                    <div className="flex items-center gap-1 bg-white border rounded-lg p-1">
                      <button 
                        onClick={() => removeFromOrder(currentTable.id, item.id)} 
                        className="p-1 hover:bg-red-50 hover:text-red-500 rounded transition-colors"
                      >
                        {item.count === 1 ? <Trash2 size={16} /> : <Minus size={16} />}
                      </button>
                      <span className="w-6 text-center text-sm font-bold">{item.count}</span>
                      <button 
                        onClick={() => addToOrder(currentTable.id, item)} 
                        className="p-1 hover:bg-green-50 hover:text-green-500 rounded transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-4 border-t bg-stone-50 shadow-lg z-10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-stone-600">Toplam Tutar</span>
            <span className="text-2xl font-bold text-orange-900">{formatCurrency(total)}</span>
          </div>
          <button 
            onClick={() => closeTable(currentTable.id)} 
            disabled={currentTable.orders.length === 0} 
            className="w-full py-4 bg-orange-900 text-white rounded-xl font-bold text-lg hover:bg-orange-800 disabled:bg-stone-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl transition-all active:scale-95"
          >
            <CreditCard size={20} /> Hesabı Kapat
          </button>
        </div>
      </div>

      <div className="flex-[2] flex flex-col bg-stone-50 md:w-2/3 h-full overflow-hidden order-1 md:order-2">
        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-stone-400">
            <p>Henüz kategori ve ürün eklenmemiş.</p>
          </div>
        ) : (
          <>
            <div className="flex overflow-x-auto p-4 gap-2 bg-white border-b no-scrollbar sticky top-0 z-10">
              {categories.map(cat => (
                <button 
                  key={cat.id} 
                  onClick={() => setActiveCategory(cat.id)} 
                  className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat.id 
                      ? 'bg-stone-800 text-white' 
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {products.filter(p => p.categoryId === activeCategory).map(product => (
                  <button 
                    key={product.id} 
                    onClick={() => addToOrder(currentTable.id, product)} 
                    className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 hover:border-orange-300 hover:shadow-md transition-all flex flex-col items-start h-28 justify-between active:bg-orange-50 text-left"
                  >
                    <span className="font-bold text-stone-800 line-clamp-2">{product.name}</span>
                    <div className="w-full flex justify-between items-center mt-2">
                      <span className="text-orange-700 font-semibold bg-orange-50 px-2 py-1 rounded text-sm">
                        {formatCurrency(product.price)}
                      </span>
                      <div className="w-6 h-6 bg-stone-100 rounded-full flex items-center justify-center text-stone-600">
                        <Plus size={14} />
                      </div>
                    </div>
                  </button>
                ))}
                {products.filter(p => p.categoryId === activeCategory).length === 0 && (
                  <div className="col-span-full text-center py-10 text-stone-400">
                    Bu kategoride ürün yok.
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

