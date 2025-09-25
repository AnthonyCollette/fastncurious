import { useState } from "react";
import avatar1 from "../../assets/avatars/avataaars1.png";
import avatar2 from "../../assets/avatars/avataaars2.png";
import avatar3 from "../../assets/avatars/avataaars3.png";
import avatar4 from "../../assets/avatars/avataaars4.png";
import Button from "../ui/Button";

const CreatePlayer = () => {
  const avatars = [avatar1, avatar2, avatar3, avatar4];

  const randomAvatar = () => {
    const randomIndex = Math.floor(Math.random() * avatars.length);
    return avatars[randomIndex];
  };

  const [currentAvatar, setCurrentAvatar] = useState(() => randomAvatar());

  const handleChangeAvatar = () => {
    let newAvatar = randomAvatar();
    while (newAvatar === currentAvatar) {
      newAvatar = randomAvatar();
    }
    setCurrentAvatar(newAvatar);
  };

  return (
    <form className="flex flex-col items-center mb-10 gap-10">
      <div className="relative before:content-[''] before:w-60 before:h-60 before:bg-orange before:absolute before:rounded-full before:-z-10 before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2">
        <img src={currentAvatar} alt="Avatar" className="w-50 h-50 mb-4" />
        <Button type="button" variant="refresh" onClick={handleChangeAvatar} />
      </div>
      <div>
        <input
          type="text"
          id="name"
          name="name"
          className="font-primary--regular px-4 border-2 border-orange rounded-lg p-2 w-full text-2xl text-orange placeholder:text-orange placeholder:opacity-50"
          placeholder="Votre pseudo"
          required
        />
      </div>
    </form>
  );
};

export default CreatePlayer;
