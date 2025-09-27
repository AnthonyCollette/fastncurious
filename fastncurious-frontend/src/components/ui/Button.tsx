import refreshIcon from "../../assets/icons/refresh-arrow.png";

interface ButtonProps {
  text?: string;
  variant?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button = ({ text, variant = "primary", onClick, type }: ButtonProps) => {
  const primaryButton =
    "cursor-pointer bg-purple border-3 border-orange text-orange text-2xl py-2 px-10 rounded-xl font-primary--bold hover:bg-orange hover:text-purple";
  const refreshButton =
    "cursor-pointer border-4 border-purple bg-orange p-2 rounded-full w-20 h-20 flex items-center justify-center hover:rotate-180 hover:bg-purple transition-all duration-300 absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4";

  const renderButton = () => {
    switch (variant) {
      case "primary":
        return (
          <button onClick={onClick} className={primaryButton} type={type}>
            {text}
          </button>
        );
      case "refresh":
        return (
          <button onClick={onClick} className={refreshButton} type={type}>
            <img src={refreshIcon} alt="Icone de rafraichissement" />
          </button>
        );
      default:
        return null;
    }
  };
  return renderButton();
};

export default Button;
