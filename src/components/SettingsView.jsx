import React from 'react';
import { Settings, RotateCcw, Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function SettingsView({
  settingsTab,
  setSettingsTab,
  sections,
  tables,
  categories,
  products,
  newItemName,
  setNewItemName,
  newPrice,
  setNewPrice,
  selectedParentId,
  setSelectedParentId,
  handleAddSection,
  handleAddTable,
  handleAddCategory,
  handleAddProduct,
  handleDeleteSection,
  deleteItem,
  setTables,
  setCategories,
  setProducts,
  clearAllData
}) {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto h-full overflow-y-auto pb-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="text-stone-600"/> Ayarlar
        </h1>
        <button 
          onClick={clearAllData}
          className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-red-100 transition-colors"
        >
          <RotateCcw size={16}/> Verileri Sıfırla
        </button>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
        {[
          { id: 'sections', label: '1. Bölümler' }, 
          { id: 'tables', label: '2. Masalar' }, 
          { id: 'categories', label: '3. Kategoriler' }, 
          { id: 'products', label: '4. Ürünler' }
        ].map(tab => (
          <button 
            key={tab.id} 
            onClick={() => { 
              setSettingsTab(tab.id); 
              setNewItemName(''); 
              setNewPrice(''); 
              setSelectedParentId(''); 
            }} 
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              settingsTab === tab.id 
                ? 'bg-stone-800 text-white' 
                : 'bg-white border border-stone-200 text-stone-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
        <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-stone-50 rounded-xl border border-stone-100">
          <input 
            type="text" 
            placeholder={settingsTab === 'products' ? "Ürün Adı" : "İsim Giriniz"} 
            className="flex-1 px-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-500" 
            value={newItemName} 
            onChange={(e) => setNewItemName(e.target.value)} 
          />
          {settingsTab === 'tables' && (
            <select 
              className="flex-1 px-4 py-2 rounded-lg border border-stone-300 focus:outline-none" 
              value={selectedParentId} 
              onChange={(e) => setSelectedParentId(e.target.value)}
            >
              <option value="">Bölüm Seçiniz (Zorunlu)</option>
              {sections.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          )}
          {settingsTab === 'products' && (
            <>
              <input 
                type="number" 
                placeholder="Fiyat" 
                className="w-24 px-4 py-2 rounded-lg border border-stone-300 focus:outline-none" 
                value={newPrice} 
                onChange={(e) => setNewPrice(e.target.value)} 
              />
              <select 
                className="flex-1 px-4 py-2 rounded-lg border border-stone-300 focus:outline-none" 
                value={selectedParentId} 
                onChange={(e) => setSelectedParentId(e.target.value)}
              >
                <option value="">Kategori Seçiniz (Zorunlu)</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </>
          )}
          <button 
            onClick={() => { 
              if(settingsTab === 'sections') handleAddSection(); 
              if(settingsTab === 'tables') handleAddTable(); 
              if(settingsTab === 'categories') handleAddCategory(); 
              if(settingsTab === 'products') handleAddProduct(); 
            }} 
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 flex items-center justify-center gap-2"
          >
            <Plus size={18} /> Ekle
          </button>
        </div>

        {settingsTab === 'tables' && sections.length === 0 && (
          <div className="text-center p-4 text-amber-600 bg-amber-50 rounded-lg mb-4 text-sm">
            Masa eklemek için önce "Bölümler" sekmesinden bir bölüm oluşturmalısınız.
          </div>
        )}
        {settingsTab === 'products' && categories.length === 0 && (
          <div className="text-center p-4 text-amber-600 bg-amber-50 rounded-lg mb-4 text-sm">
            Ürün eklemek için önce "Kategoriler" sekmesinden bir kategori oluşturmalısınız.
          </div>
        )}

        <div className="divide-y divide-stone-100">
          {settingsTab === 'sections' && sections.map(item => (
            <div key={item.id} className="py-3 flex justify-between items-center">
              <span className="font-medium">{item.name}</span>
              <button 
                onClick={() => handleDeleteSection(item.id)} 
                className="text-red-500 hover:bg-red-50 p-2 rounded"
              >
                <Trash2 size={18}/>
              </button>
            </div>
          ))}
          {settingsTab === 'tables' && tables.map(item => (
            <div key={item.id} className="py-3 flex justify-between items-center">
              <div>
                <span className="font-medium">{item.name}</span>
                <span className="text-sm text-stone-400 ml-2">
                  ({sections.find(s => s.id === item.sectionId)?.name || 'Bölüm Silinmiş'})
                </span>
              </div>
              <button 
                onClick={() => deleteItem(tables, setTables, item.id, 'masa')} 
                className="text-red-500 hover:bg-red-50 p-2 rounded"
              >
                <Trash2 size={18}/>
              </button>
            </div>
          ))}
          {settingsTab === 'categories' && categories.map(item => (
            <div key={item.id} className="py-3 flex justify-between items-center">
              <span className="font-medium">{item.name}</span>
              <button 
                onClick={() => deleteItem(categories, setCategories, item.id, 'kategori')} 
                className="text-red-500 hover:bg-red-50 p-2 rounded"
              >
                <Trash2 size={18}/>
              </button>
            </div>
          ))}
          {settingsTab === 'products' && products.map(item => (
            <div key={item.id} className="py-3 flex justify-between items-center">
              <div>
                <span className="font-medium">{item.name}</span>
                <span className="text-orange-600 font-bold text-sm ml-2">
                  {formatCurrency(item.price)}
                </span>
                <span className="text-xs text-stone-400 block">
                  ({categories.find(c => c.id === item.categoryId)?.name || 'Kategori Silinmiş'})
                </span>
              </div>
              <button 
                onClick={() => deleteItem(products, setProducts, item.id, 'ürün')} 
                className="text-red-500 hover:bg-red-50 p-2 rounded"
              >
                <Trash2 size={18}/>
              </button>
            </div>
          ))}
          {((settingsTab === 'sections' && sections.length === 0) || 
            (settingsTab === 'tables' && tables.length === 0) || 
            (settingsTab === 'categories' && categories.length === 0) || 
            (settingsTab === 'products' && products.length === 0)) && (
            <div className="py-8 text-center text-stone-400 italic">Liste boş.</div>
          )}
        </div>
      </div>
    </div>
  );
}

