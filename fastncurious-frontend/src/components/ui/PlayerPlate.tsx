import crownIcon from "../../assets/icons/couronne.png";

interface PlayerPlateProps {
  image: string;
  name: string;
  host?: boolean;
}

const PlayerPlate = ({ image, name, host = false }: PlayerPlateProps) => {
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
      </p>
    </div>
  );
};

export default PlayerPlate;
