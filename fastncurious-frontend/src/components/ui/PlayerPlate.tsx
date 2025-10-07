import crownIcon from "../../assets/icons/couronne.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { socket } from "../../socket";

interface PlayerPlateProps {
  image: string;
  name: string;
  host?: boolean;
  kick?: boolean;
  playerId: string;
  lobbyCode: string;
}

const PlayerPlate = ({
  image,
  name,
  host = false,
  kick = true,
  playerId,
  lobbyCode,
}: PlayerPlateProps) => {
  const handleKick = () => {
    console.log("Kicking player with ID:", playerId);
    // Logic to handle kicking the player
    socket.emit(
      "kickPlayer",
      { lobbyCode, targetId: playerId },
      (response: { ok: boolean; error?: string }) => {
        if (!response.ok) {
          return console.error("Error kicking player:", response.error);
        }
      }
    );
  };
  return (
    <div className="flex items-center gap-4 bg-orange rounded-lg px-4 w-full">
      <img src={image} alt="Avatar" className="w-15 h-15" />
      <p className="font-primary--regular color-white text-2xl flex items-center justify-between w-full gap-2">
        {name}{" "}
        {host ? (
          <img
            src={crownIcon}
            alt="Icone d'hôte de la partie"
            className="w-6"
          />
        ) : (
          ""
        )}
        {kick ? (
          <button className="cursor-pointer" onClick={handleKick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 64 64"
            >
              <path
                fill="#ff5a79"
                d="M62 52c0 5.5-4.5 10-10 10H12C6.5 62 2 57.5 2 52V12C2 6.5 6.5 2 12 2h40c5.5 0 10 4.5 10 10v40z"
              />
              <path
                fill="#fff"
                d="M50 21.2L42.8 14L32 24.8L21.2 14L14 21.2L24.8 32L14 42.8l7.2 7.2L32 39.2L42.8 50l7.2-7.2L39.2 32z"
              />
            </svg>
          </button>
        ) : (
          ""
        )}
      </p>
    </div>
  );
};

export default PlayerPlate;
