import { useEffect } from 'react';
import './App.css';
const tg = window.Telegram.WebApp;

function App() {

  useEffect(() => {
    tg.ready();
  })

  const onClose = () => {
    tg.close();
  }

  return (
    <div className="App">
        text 123 312
        <button onClick={onClose}>Сделать заказ</button>
    </div>
  );
}

export default App;
