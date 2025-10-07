import Nav from "../components/Nav";
import PlayerPlate from "../components/ui/PlayerPlate";
import Theme from "../components/ui/Theme";
import { useUserStore } from "../store/userStore";
import cultureIcon from "../assets/icons/culture.png";
import cinemaIcon from "../assets/icons/cinema.png";
import seriesIcon from "../assets/icons/series.png";
import { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { socket } from "../socket";
import { useNavigate } from "react-router";
import ErrorModal from "../components/ui/ErrorModal";
import { createPortal } from "react-dom";

const Lobby = () => {
  const { avatar, username, role, lobbyCode, setLobbyCode } = useUserStore();
  const navigate = useNavigate();
  const themes = [
    { name: "Culture générale", icon: cultureIcon },
    { name: "Cinéma", icon: cinemaIcon },
    { name: "Séries TV", icon: seriesIcon },
    { name: "Cuisine", icon: cultureIcon },
  ];
  const [lobby, setLobby] = useState<null | {
    lobbyCode: string;
    host: string;
    players: Array<{ id: string; name: string; avatar: string }>;
  }>(null);
  const [lobbyCodeHidden, setLobbyCodeHidden] = useState(true);
  const [lobbyError, setLobbyError] = useState(false);
  const [lobbyErrorMessage, setLobbyErrorMessage] = useState("");

  useEffect(() => {
    if (!username || !avatar || !role || role === null) navigate("/");

    if (role === "host") {
      socket.emit("createLobby", username, avatar);
      socket.on(
        "lobbyCreated",
        (res: {
          lobbyCode: string;
          host: string;
          players: Array<{ id: string; name: string; avatar: string }>;
        }) => {
          setLobbyCode(res.lobbyCode);
          setLobby(res);
        }
      );
    }

    if (role === "player") {
      socket.emit("joinLobby", { lobbyCode, playerName: username, avatar });
      socket.on("errorLobbyNotFound", () => {
        setLobbyError(true);
        setLobbyErrorMessage("Ce lobby n'existe pas.");
      });
      socket.on("errorLobbyFull", () => {
        setLobbyError(true);
        setLobbyErrorMessage("Ce lobby est plein.");
      });
      socket.on(
        "lobbyJoined",
        (res: {
          lobbyCode: string;
          host: string;
          players: Array<{ id: string; name: string; avatar: string }>;
        }) => {
          setLobbyCode(res.lobbyCode);
          setLobby(res);
        }
      );
      socket.on("lobbyClosed", (data: { reason: string }) => {
        setLobbyError(true);
        setLobbyErrorMessage(data.reason);
        setLobbyCode("");
      });
    }

    socket.on(
      "lobbyUpdated",
      (res: {
        host: string;
        players: Array<{ id: string; name: string; avatar: string }>;
      }) => {
        setLobby((prev) =>
          prev
            ? {
                ...prev,
                host: res.host,
                players: res.players,
              }
            : null
        );
      }
    );

    socket.on("kicked", (data: { lobbyCode: string; reason: string }) => {
      setLobbyError(true);
      setLobbyErrorMessage(data.reason);
      setLobbyCode("");
    });

    return () => {
      socket.emit("leaveLobby");
    };
  }, []);

  return (
    <div>
      <Nav />
      {!lobbyError && (
        <>
          <div className="container text-center">
            <h1 className="text-white text-xl uppercase font-primary--bold">
              Code du salon :
            </h1>
            <div className="mt-2 mb-10 relative w-fit mx-auto">
              <p className="text-white text-6xl uppercase font-primary--bold">
                {lobbyCodeHidden ? "------" : lobby?.lobbyCode}
              </p>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(lobby?.lobbyCode || "")
                }
                className="cursor-pointer absolute top-1/2 -right-10 -translate-y-1/2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 408 480"
                >
                  <path
                    fill="#fff"
                    d="M299 5v43H43v299H0V48q0-18 12.5-30.5T43 5h256zm64 86q17 0 29.5 12.5T405 133v299q0 18-12.5 30.5T363 475H128q-18 0-30.5-12.5T85 432V133q0-17 12.5-29.5T128 91h235zm0 341V133H128v299h235z"
                  />
                </svg>
              </button>
              <button
                className="cursor-pointer absolute top-1/2 -right-20 -translate-y-1/2"
                onClick={() => setLobbyCodeHidden(!lobbyCodeHidden)}
              >
                {lobbyCodeHidden ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#fff"
                      d="m9.343 18.782l-1.932-.518l.787-2.939a10.99 10.99 0 0 1-3.237-1.872l-2.153 2.154l-1.414-1.414l2.153-2.154a10.957 10.957 0 0 1-2.371-5.07l1.968-.359a9.002 9.002 0 0 0 17.713 0l1.968.358a10.958 10.958 0 0 1-2.372 5.071l2.154 2.154l-1.414 1.414l-2.154-2.154a10.991 10.991 0 0 1-3.237 1.872l.788 2.94l-1.932.517l-.788-2.94a11.068 11.068 0 0 1-3.74 0l-.787 2.94Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 472 384"
                  >
                    <path
                      fill="#fff"
                      d="M235 32q79 0 142.5 44.5T469 192q-28 71-91.5 115.5T235 352T92 307.5T0 192q28-71 92-115.5T235 32zm0 267q44 0 75-31.5t31-75.5t-31-75.5T235 85t-75.5 31.5T128 192t31.5 75.5T235 299zm-.5-171q26.5 0 45.5 18.5t19 45.5t-19 45.5t-45.5 18.5t-45-18.5T171 192t18.5-45.5t45-18.5z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="container flex justify-center gap-10">
            <ul className="grid bg-orange rounded-2xl p-4 grid-cols-3 gap-4">
              {themes.map((theme) => (
                <Theme key={theme.name} name={theme.name} icon={theme.icon} />
              ))}
            </ul>
            <div className="flex flex-col items-center gap-4 w-100 p-4 bg-white rounded-2xl">
              {lobby?.players?.map((player) => {
                return (
                  <PlayerPlate
                    key={player.id}
                    playerId={player.id}
                    image={player.avatar}
                    name={player.name}
                    lobbyCode={lobby.lobbyCode}
                    host={lobby.host === player.id}
                    kick={lobby.host === socket.id && lobby.host !== player.id}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
      {lobbyError &&
        createPortal(
          <ErrorModal text={lobbyErrorMessage} link="/" />,
          document.body
        )}
    </div>
  );
};

export default Lobby;
