import { useEffect } from "react";
import Card from "./components/Card";
function App() {
  useEffect(() => {
    // Initialize Telegram Web App
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand(); // Expand the app to full screen
  }, []);

  const user = window.Telegram.WebApp.initDataUnsafe?.user; // Get user data

  return (
    <div className="bg-secondary-bg  text-text flex flex-col p-0">
      <h1 className="text-3xl font-bold justify-start items-start rounded-b-2xl shadow-md mt-0 p-2 w-min ml-4">
        Hello, {user?.first_name || "Guest"}!
      </h1>
      <div className="flex flex-col p-4 m-10 justify-center items-center">
        <Card
          name="Анатолий"
          age={23}
          avatarURL={
            "https://tr.rbxcdn.com/180DAY-d2aa8b558f4c73dc77ab184210a56788/420/420/Hat/Png/noFilter"
          }
        ></Card>
        <Card
          name="Сергей"
          age={13}
          avatarURL={
            "https://tr.rbxcdn.com/180DAY-d2aa8b558f4c73dc77ab184210a56788/420/420/Hat/Png/noFilter"
          }
        ></Card>
        <Card
          name="Алексей"
          age={17}
          avatarURL={
            "https://tr.rbxcdn.com/180DAY-d2aa8b558f4c73dc77ab184210a56788/420/420/Hat/Png/noFilter"
          }
        ></Card>
        <Card
          name="Антон"
          age={41}
          avatarURL={
            "https://tr.rbxcdn.com/180DAY-d2aa8b558f4c73dc77ab184210a56788/420/420/Hat/Png/noFilter"
          }
        ></Card>
      </div>
    </div>
  );
}

export default App;
