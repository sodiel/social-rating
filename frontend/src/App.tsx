import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Инициализация Telegram Web App
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand(); // Растягивает приложение на весь экран
  }, []);

  const user = window.Telegram.WebApp.initDataUnsafe.user; // Данные пользователя

  return (
    <div>
      <h1>Hello, {user?.first_name || 'Guest'}!</h1>
      <button onClick={() => window.Telegram.WebApp.showAlert('Hello!')}>
        Show Alert
      </button>
    </div>
  );
}

export default App;