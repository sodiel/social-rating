const user = window.Telegram.WebApp.initDataUnsafe?.user; // Get user data
export type CardProps = {
  age: number | null;
  name: string | null;
  avatarURL: string | null;
};

const Card: React.FC<CardProps> = ({ age, name, avatarURL }) => {
  const username = user?.first_name || name || "Guest";
  return (
    <div className="bg-background text-text flex flex-col p-4 m-4 shadow-xl rounded-2xl">
      {avatarURL ? <img className="rounded-2xl" src={avatarURL}></img> : null}
      <h1 className="text-3xl font-bold justify-start items-start">
        {username} {age ? `, ${age}` : null}
      </h1>
      <div className="flex flex-col p-4 justify-center items-center">
        <div className="">
          <button
            className="mt-4 px-6 py-2 rounded-lg bg-button text-button-text text-lg font-medium shadow-md transition hover:opacity-80"
            onClick={() => window.Telegram.WebApp.showAlert("Пока не перейти")}
          >
            Перейти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
