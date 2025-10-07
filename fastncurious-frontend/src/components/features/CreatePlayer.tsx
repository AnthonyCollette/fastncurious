import { useState } from "react";
import avatar1 from "../../assets/avatars/avataaars1.png";
import avatar2 from "../../assets/avatars/avataaars2.png";
import avatar3 from "../../assets/avatars/avataaars3.png";
import avatar4 from "../../assets/avatars/avataaars4.png";
import Button from "../ui/Button";
import { useUserStore } from "../../store/userStore";
import { useNavigate } from "react-router";
import { createPortal } from "react-dom";
import InvitationCode from "./InvitationCode";

const CreatePlayer = () => {
  const avatars = [avatar1, avatar2, avatar3, avatar4];
  const { username, setUsername, setAvatar, setRole } = useUserStore();
  const [currentAvatar, setCurrentAvatar] = useState(avatars[0]);
  const [currentName, setCurrentName] = useState(username);

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleChangeAvatar = () => {
    let newAvatar;
    if (currentAvatar === avatars[avatars.length - 1]) {
      newAvatar = avatars[0];
    } else {
      const currentIndex = avatars.indexOf(currentAvatar);
      newAvatar = avatars[currentIndex + 1];
    }
    setCurrentAvatar(newAvatar);
  };

  const handleCreateNewGame = () => {
    if (currentName.trim() === "") return;
    setUsername(currentName);
    setAvatar(currentAvatar);
    setRole("host");
    navigate("/lobby");
  };

  const handleJoinLobby = () => {
    if (currentName.trim() === "") return;
    setOpenModal(true);
    setUsername(currentName);
    setAvatar(currentAvatar);
  };

  return (
    <>
      <form
        className="flex flex-col items-center mb-10 gap-10"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="relative before:content-[''] before:w-60 before:h-60 before:bg-orange before:absolute before:rounded-full before:-z-10 before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2">
          <img src={currentAvatar} alt="Avatar" className="w-50 h-50 mb-4" />
          <Button
            type="button"
            variant="refresh"
            onClick={handleChangeAvatar}
          />
        </div>
        <div>
          <input
            type="text"
            id="name"
            name="name"
            className="font-primary--regular px-4 border-2 border-orange rounded-lg p-2 w-full text-2xl text-orange placeholder:text-orange placeholder:opacity-50"
            placeholder="Votre pseudo"
            defaultValue={username}
            required
            onChange={(e) => setCurrentName(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          text="Démarrer une nouvelle partie"
          onClick={handleCreateNewGame}
        />
        <Button
          type="submit"
          variant="primary"
          text="Rejoindre un salon"
          onClick={handleJoinLobby}
        />
      </form>
      {openModal &&
        createPortal(
          <InvitationCode setOpenModal={setOpenModal} />,
          document.body
        )}
    </>
  );
};

export default CreatePlayer;
