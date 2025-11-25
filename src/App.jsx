import React, { useState, useEffect } from 'react';
import { Coffee, LayoutGrid, Settings, FileText, LogOut } from 'lucide-react';
import POSView from './components/POSView';
import ReportsView from './components/ReportsView';
import OrderModal from './components/OrderModal';
import ConfirmationDialog from './components/ConfirmationDialog';
import SettingsView from './components/SettingsView';
import LoginScreen from './components/LoginScreen';
import { formatDateInput } from './utils/formatters';

export default function App() {
  // --- Authentication State ---
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('fika_authenticated') === 'true';
  });

  // --- State Yönetimi (Veriler) ---
  const [activeTab, setActiveTab] = useState('pos');
  
  // Ayarlar Sayfası State'leri
  const [settingsTab, setSettingsTab] = useState('sections');
  const [newItemName, setNewItemName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [selectedParentId, setSelectedParentId] = useState('');

  // Rapor Filtre State'leri
  const [reportDateRange, setReportDateRange] = useState({
    start: formatDateInput(new Date(new Date().setDate(new Date().getDate() - 30))),
    end: formatDateInput(new Date())
  });

  // Onay Modalı State'i
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null
  });

  // Veri State'leri
  const [sections, setSections] = useState(() => {
    const saved = localStorage.getItem('fika_sections');
    return saved ? JSON.parse(saved) : []; 
  });

  const [tables, setTables] = useState(() => {
    const saved = localStorage.getItem('fika_tables');
    return saved ? JSON.parse(saved) : [];
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('fika_categories');
    return saved ? JSON.parse(saved) : [];
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('fika_products');
    return saved ? JSON.parse(saved) : [];
  });

  const [salesHistory, setSalesHistory] = useState(() => {
    const saved = localStorage.getItem('fika_sales');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedTable, setSelectedTable] = useState(null);
  const [activeSectionId, setActiveSectionId] = useState(0);

  // Bölümler değiştiğinde aktif bölümü güncelle
  useEffect(() => {
    if (sections.length > 0 && activeSectionId === 0) {
      setActiveSectionId(sections[0].id);
    }
  }, [sections, activeSectionId]);

  // --- Veri Kalıcılığı ---
  useEffect(() => { 
    localStorage.setItem('fika_sections', JSON.stringify(sections)); 
  }, [sections]);
  
  useEffect(() => { 
    localStorage.setItem('fika_tables', JSON.stringify(tables)); 
  }, [tables]);
  
  useEffect(() => { 
    localStorage.setItem('fika_categories', JSON.stringify(categories)); 
  }, [categories]);
  
  useEffect(() => { 
    localStorage.setItem('fika_products', JSON.stringify(products)); 
  }, [products]);
  
  useEffect(() => { 
    localStorage.setItem('fika_sales', JSON.stringify(salesHistory)); 
  }, [salesHistory]);

  // --- Yardımcı Fonksiyonlar ---
  const triggerConfirm = (title, message, action) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        action();
        setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: null });
      }
    });
  };

  // VERİLERİ SIFIRLAMA
  const clearAllData = () => {
    triggerConfirm(
      'Tüm Verileri Sıfırla',
      'DİKKAT: Kategoriler, ürünler, masalar ve tüm satış geçmişi kalıcı olarak silinecektir. Uygulama tamamen boş hale dönecektir. Onaylıyor musunuz?',
      () => {
        setSections([]);
        setTables([]);
        setCategories([]);
        setProducts([]);
        setSalesHistory([]);
        localStorage.removeItem('fika_sections');
        localStorage.removeItem('fika_tables');
        localStorage.removeItem('fika_categories');
        localStorage.removeItem('fika_products');
        localStorage.removeItem('fika_sales');
        setActiveTab('pos');
      }
    );
  };

  // Örnek Veri Oluşturucu
  const generateSampleData = () => {
    triggerConfirm(
      'Örnek Veri Yükle',
      'Mevcut tüm veriler silinecek ve yerine örnek test verileri yüklenecektir. Onaylıyor musunuz?',
      () => {
        const newCats = [
          { id: 1, name: 'Sıcak Kahveler' },
          { id: 2, name: 'Soğuk İçecekler' },
          { id: 3, name: 'Tatlılar' },
          { id: 4, name: 'Atıştırmalık' }
        ];
        
        const newProds = [
          { id: 1, name: 'Latte', price: 65, categoryId: 1 },
          { id: 2, name: 'Americano', price: 55, categoryId: 1 },
          { id: 3, name: 'Türk Kahvesi', price: 45, categoryId: 1 },
          { id: 4, name: 'Flat White', price: 60, categoryId: 1 },
          { id: 5, name: 'Limonata', price: 70, categoryId: 2 },
          { id: 6, name: 'Soğuk Kahve', price: 75, categoryId: 2 },
          { id: 7, name: 'Su', price: 20, categoryId: 2 },
          { id: 8, name: 'San Sebastian', price: 120, categoryId: 3 },
          { id: 9, name: 'Brownie', price: 90, categoryId: 3 },
          { id: 10, name: 'Kurabiye', price: 40, categoryId: 4 }
        ];

        const newSections = [
          { id: 1, name: 'Salon' },
          { id: 2, name: 'Bahçe' },
          { id: 3, name: 'Teras' }
        ];

        const newTables = [
          { id: 1, name: 'Masa 1', sectionId: 1, status: 'empty', orders: [] },
          { id: 2, name: 'Masa 2', sectionId: 1, status: 'empty', orders: [] },
          { id: 3, name: 'Masa 3', sectionId: 1, status: 'empty', orders: [] },
          { id: 4, name: 'Masa 4', sectionId: 1, status: 'empty', orders: [] },
          { id: 5, name: 'Bahçe 1', sectionId: 2, status: 'empty', orders: [] },
          { id: 6, name: 'Bahçe 2', sectionId: 2, status: 'empty', orders: [] },
          { id: 7, name: 'Teras 1', sectionId: 3, status: 'empty', orders: [] },
        ];

        const newHistory = [];
        const today = new Date();
        
        for (let i = 0; i < 40; i++) {
          const daysAgo = Math.floor(Math.random() * 15);
          const date = new Date(today);
          date.setDate(date.getDate() - daysAgo);
          
          const itemCount = Math.floor(Math.random() * 4) + 1;
          const saleItems = [];
          let total = 0;

          for(let j=0; j<itemCount; j++){
            const prod = newProds[Math.floor(Math.random() * newProds.length)];
            const count = Math.floor(Math.random() * 2) + 1;
            saleItems.push({ ...prod, count });
            total += prod.price * count;
          }

          newHistory.push({
            id: Date.now() + i,
            date: date.toISOString(),
            tableName: `Masa ${Math.floor(Math.random() * 5) + 1}`,
            items: saleItems,
            total: total
          });
        }

        setCategories(newCats);
        setProducts(newProds);
        setSections(newSections);
        setTables(newTables);
        setSalesHistory(newHistory.sort((a,b) => new Date(b.date) - new Date(a.date)));
        setActiveSectionId(1);
      }
    );
  };

  const addToOrder = (tableId, product) => {
    setTables(prevTables => prevTables.map(table => {
      if (table.id !== tableId) return table;

      const existingItem = table.orders.find(item => item.id === product.id);
      let newOrders;
      
      if (existingItem) {
        newOrders = table.orders.map(item => 
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        newOrders = [...table.orders, { ...product, count: 1 }];
      }

      return { ...table, orders: newOrders, status: 'occupied' };
    }));
  };

  const removeFromOrder = (tableId, productId) => {
    setTables(prevTables => prevTables.map(table => {
      if (table.id !== tableId) return table;

      const existingItem = table.orders.find(item => item.id === productId);
      if (!existingItem) return table;

      let newOrders;
      if (existingItem.count > 1) {
        newOrders = table.orders.map(item => 
          item.id === productId ? { ...item, count: item.count - 1 } : item
        );
      } else {
        newOrders = table.orders.filter(item => item.id !== productId);
      }
      return { ...table, orders: newOrders };
    }));
  };

  const closeTable = (tableId) => {
    const table = tables.find(t => t.id === tableId);
    if (!table || table.orders.length === 0) return;

    triggerConfirm(
      'Hesabı Kapat',
      `${table.name} hesabını kapatmak ve satışı onaylamak istiyor musunuz?`,
      () => {
        const totalAmount = table.orders.reduce((acc, item) => acc + (item.price * item.count), 0);
        const newSale = {
          id: Date.now(),
          date: new Date().toISOString(),
          tableName: table.name,
          items: table.orders,
          total: totalAmount
        };
        setSalesHistory([newSale, ...salesHistory]);
        setTables(prevTables => prevTables.map(t => 
          t.id === tableId ? { ...t, orders: [], status: 'empty' } : t
        ));
        setSelectedTable(null);
      }
    );
  };

  // --- Ayarlar İşlemleri ---
  const handleAddSection = () => {
    if (!newItemName) return;
    const newId = sections.length > 0 ? Math.max(...sections.map(s => s.id)) + 1 : 1;
    setSections([...sections, { id: newId, name: newItemName }]);
    setNewItemName('');
  };

  const handleDeleteSection = (id) => {
    triggerConfirm('Bölümü Sil', 'Bu bölümü ve bağlı masaları silmek istediğinize emin misiniz?', () => {
      setSections(prev => prev.filter(s => s.id !== id));
      setTables(prev => prev.filter(t => t.sectionId !== id));
    });
  };

  const handleAddTable = () => {
    if (!newItemName || !selectedParentId) return;
    const newId = tables.length > 0 ? Math.max(...tables.map(t => t.id)) + 1 : 1;
    setTables([...tables, { 
      id: newId, 
      name: newItemName, 
      sectionId: parseInt(selectedParentId), 
      status: 'empty', 
      orders: [] 
    }]);
    setNewItemName('');
  };

  const handleAddCategory = () => {
    if (!newItemName) return;
    const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
    setCategories([...categories, { id: newId, name: newItemName }]);
    setNewItemName('');
  };

  const handleAddProduct = () => {
    if (!newItemName || !newPrice || !selectedParentId) return;
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    setProducts([...products, { 
      id: newId, 
      name: newItemName, 
      price: parseFloat(newPrice), 
      categoryId: parseInt(selectedParentId) 
    }]);
    setNewItemName('');
    setNewPrice('');
  };

  const deleteItem = (list, setList, id, typeName) => {
    triggerConfirm('Silme Onayı', `Bu ${typeName} ögesini silmek istediğinize emin misiniz?`, () => 
      setList(prev => prev.filter(i => i.id !== id))
    );
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    triggerConfirm(
      'Çıkış Yap',
      'Çıkış yapmak istediğinize emin misiniz?',
      () => {
        localStorage.removeItem('fika_authenticated');
        setIsAuthenticated(false);
      }
    );
  };

  // Eğer kullanıcı giriş yapmamışsa login ekranını göster
  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col h-screen bg-stone-50 font-sans text-stone-800">
      <header className="bg-stone-900 text-stone-50 p-4 flex justify-between items-center shadow-md z-20">
        <div className="flex items-center gap-3">
          <div className="bg-orange-600 p-2 rounded-lg">
            <Coffee size={24} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight">Fika Coffee</h1>
            <p className="text-xs text-stone-400 font-light">POS Sistemi</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs bg-stone-800 px-3 py-1 rounded-full text-stone-400 hidden md:block">
            {new Date().toLocaleDateString('tr-TR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
          <button
            onClick={handleLogout}
            className="bg-stone-800 hover:bg-red-600 text-stone-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            title="Çıkış Yap"
          >
            <LogOut size={18} />
            <span className="hidden md:inline">Çıkış</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-hidden relative">
        {activeTab === 'pos' && (
          <POSView 
            sections={sections}
            tables={tables}
            activeSectionId={activeSectionId}
            setActiveSectionId={setActiveSectionId}
            setSelectedTable={setSelectedTable}
            setActiveTab={setActiveTab}
            generateSampleData={generateSampleData}
          />
        )}
        {activeTab === 'reports' && (
          <ReportsView 
            salesHistory={salesHistory}
            reportDateRange={reportDateRange}
            setReportDateRange={setReportDateRange}
            generateSampleData={generateSampleData}
          />
        )}
        {activeTab === 'settings' && (
          <SettingsView
            settingsTab={settingsTab}
            setSettingsTab={setSettingsTab}
            sections={sections}
            tables={tables}
            categories={categories}
            products={products}
            newItemName={newItemName}
            setNewItemName={setNewItemName}
            newPrice={newPrice}
            setNewPrice={setNewPrice}
            selectedParentId={selectedParentId}
            setSelectedParentId={setSelectedParentId}
            handleAddSection={handleAddSection}
            handleAddTable={handleAddTable}
            handleAddCategory={handleAddCategory}
            handleAddProduct={handleAddProduct}
            handleDeleteSection={handleDeleteSection}
            deleteItem={deleteItem}
            setTables={setTables}
            setCategories={setCategories}
            setProducts={setProducts}
            clearAllData={clearAllData}
          />
        )}
        {selectedTable && (
          <OrderModal 
            selectedTable={selectedTable}
            setSelectedTable={setSelectedTable}
            tables={tables}
            categories={categories}
            products={products}
            addToOrder={addToOrder}
            removeFromOrder={removeFromOrder}
            closeTable={closeTable}
          />
        )}
        <ConfirmationDialog 
          confirmModal={confirmModal}
          setConfirmModal={setConfirmModal}
        />
      </main>

      <nav className="bg-white border-t border-stone-200 flex justify-around items-center pt-2 pb-8 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-30">
        <button 
          onClick={() => setActiveTab('pos')} 
          className={`flex flex-col items-center p-3 rounded-xl w-24 transition-all ${
            activeTab === 'pos' 
              ? 'text-orange-700 bg-orange-50' 
              : 'text-stone-400 hover:bg-stone-50'
          }`}
        >
          <LayoutGrid size={24} />
          <span className="text-xs font-medium mt-1">Masa</span>
        </button>
        <button 
          onClick={() => setActiveTab('reports')} 
          className={`flex flex-col items-center p-3 rounded-xl w-24 transition-all ${
            activeTab === 'reports' 
              ? 'text-orange-700 bg-orange-50' 
              : 'text-stone-400 hover:bg-stone-50'
          }`}
        >
          <FileText size={24} />
          <span className="text-xs font-medium mt-1">Rapor</span>
        </button>
        <button 
          onClick={() => setActiveTab('settings')} 
          className={`flex flex-col items-center p-3 rounded-xl w-24 transition-all ${
            activeTab === 'settings' 
              ? 'text-orange-700 bg-orange-50' 
              : 'text-stone-400 hover:bg-stone-50'
          }`}
        >
          <Settings size={24} />
          <span className="text-xs font-medium mt-1">Ayarlar</span>
        </button>
      </nav>
    </div>
  );
}

