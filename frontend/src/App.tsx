import { useEffect } from "react";

function App() {
  useEffect(() => {
    // Initialize Telegram Web App
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand(); // Expand the app to full screen
  }, []);

  const user = window.Telegram.WebApp.initDataUnsafe?.user; // Get user data

  return (
    <div className="bg-background text-text h-viewport flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold">
        Hello, {user?.first_name || "Guest"}!
      </h1>
      <button
        className="mt-4 px-6 py-2 rounded-lg bg-button text-button-text text-lg font-medium shadow-md transition hover:opacity-80"
        onClick={() => window.Telegram.WebApp.showAlert("Hello!")}
      >
        Show Alert
      </button>
    </div>
  );
}

export default App;
