import React, { useState, useEffect } from 'react';

const App = () => {
  const [activeTab, setActiveTab] = useState('crypto');
  const [cryptoData, setCryptoData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Функция для обновления данных о ценах криптовалют
  const fetchCryptoPrices = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/crypto-prices');
      const data = await response.json();
      setCryptoData(data);
    } catch (error) {
      console.error('Error fetching crypto prices:', error);
    } finally {
      setLoading(false);
    }
  };

  // Функция для обновления новостей о криптовалютах
  const fetchCryptoNews = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/crypto-news');
      const data = await response.json();
      setNewsData(data);
    } catch (error) {
      console.error('Error fetching crypto news:', error);
    } finally {
      setLoading(false);
    }
  };

  // Эффект для первоначальной загрузки данных
  useEffect(() => {
    fetchCryptoPrices();
    fetchCryptoNews();
  }, []);

  // Функция для рендера содержимого в зависимости от активной вкладки
  const renderContent = () => {
    switch (activeTab) {
      case 'crypto':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cryptoData.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-2">Symbol: {item.symbol}</p>
                <p className="text-2xl font-bold text-green-500">{item.price}</p>
              </div>
            ))}
          </div>
        );
      case 'news':
        return (
          <div className="space-y-4">
            {newsData.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  // Основная разметка приложения
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Шапка сайта с навигацией */}
      <header className="w-full bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
        <div className="flex space-x-4">
          <button
            className={`py-2 px-4 rounded ${activeTab === 'crypto' ? 'bg-blue-800' : ''}`}
            onClick={() => setActiveTab('crypto')}
          >
            Crypto Prices
          </button>
          <button
            className={`py-2 px-4 rounded ${activeTab === 'news' ? 'bg-blue-800' : ''}`}
            onClick={() => setActiveTab('news')}
          >
            Crypto News
          </button>
        </div>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={fetchCryptoPrices}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </header>

      {/* Основное содержимое сайта */}
      <main className="w-full max-w-4xl p-6 mt-4">
        {renderContent()}
      </main>

      {/* Подвал сайта */}
      <footer className="w-full bg-blue-600 text-white py-4 mt-auto text-center">
        &copy; 2025 Crypto Telegram Bot
      </footer>
    </div>
  );
};

// Экспорт основного компонента по умолчанию
export default App;