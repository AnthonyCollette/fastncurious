import Nav from "../components/Nav";
import PlayerPlate from "../components/ui/PlayerPlate";
import Theme from "../components/ui/Theme";
import { useUserStore } from "../store/userStore";
import cultureIcon from "../assets/icons/culture.png";
import cinemaIcon from "../assets/icons/cinema.png";
import seriesIcon from "../assets/icons/series.png";

const Lobby = () => {
  const { avatar, username } = useUserStore();
  const themes = [
    { name: "Culture générale", icon: cultureIcon },
    { name: "Cinéma", icon: cinemaIcon },
    { name: "Séries TV", icon: seriesIcon },
    { name: "Culture générale", icon: cultureIcon },
    { name: "Cinéma", icon: cinemaIcon },
    { name: "Séries TV", icon: seriesIcon },
    { name: "Culture générale", icon: cultureIcon },
    { name: "Cinéma", icon: cinemaIcon },
    { name: "Séries TV", icon: seriesIcon },
  ];

  return (
    <div>
      <Nav />
      <div className="container flex justify-center gap-10">
        <ul className="grid bg-orange rounded-2xl p-4 grid-cols-3 gap-4">
          {themes.map((theme) => (
            <Theme key={theme.name} name={theme.name} icon={theme.icon} />
          ))}
        </ul>
        <div className="flex flex-col items-center gap-4 w-100 p-4 bg-white rounded-2xl">
          {avatar && username && (
            <>
              <PlayerPlate image={avatar} name={username} host={true} />
              <PlayerPlate image={avatar} name={username} host={true} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lobby;
