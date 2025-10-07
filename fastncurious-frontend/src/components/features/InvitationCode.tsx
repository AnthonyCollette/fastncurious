import { useNavigate } from "react-router";
import Button from "../ui/Button";
import { useState } from "react";
import { useUserStore } from "../../store/userStore";

interface InvitationCodeProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InvitationCode({ setOpenModal }: InvitationCodeProps) {
  const navigate = useNavigate();
  const { avatar, username, setLobbyCode, setRole } = useUserStore();
  const [searchingLobbyCode, setSearchingLobbyCode] = useState<string>("");

  const handleJoinLobby = () => {
    if (searchingLobbyCode.trim() === "" || !username || !avatar) return;
    setLobbyCode(searchingLobbyCode);
    setRole("player");
    navigate("/lobby");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-purple/50">
      <div className="relative py-8 px-8 rounded-xl z-50 inset-0 bg-white flex flex-col items-center">
        <button
          className="absolute top-2 right-2 cursor-pointer"
          onClick={() => setOpenModal(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 1216 1312"
          >
            <path
              fill="currentColor"
              d="M1202 1066q0 40-28 68l-136 136q-28 28-68 28t-68-28L608 976l-294 294q-28 28-68 28t-68-28L42 1134q-28-28-28-68t28-68l294-294L42 410q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294l294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68L880 704l294 294q28 28 28 68z"
            />
          </svg>
        </button>
        <p className="font-primary--regular text-2xl mb-4">
          Renseignez le code du salon
        </p>
        <form
          className="flex flex-col items-center gap-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            className="border-2 text-center w-full rounded-md p-2 text-2xl text-purple font-primary--bold"
            onChange={(e) => setSearchingLobbyCode(e.target.value)}
          />
          <Button
            type="submit"
            variant="primary"
            text="Rejoindre le salon"
            onClick={handleJoinLobby}
          />
        </form>
      </div>
    </div>
  );
}
