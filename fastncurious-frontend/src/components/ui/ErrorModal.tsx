import { Link } from "react-router";

interface ErrorModalProps {
  text: string;
  link: string;
}

const ErrorModal = ({ text, link }: ErrorModalProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-purple/50">
      <div className="px-8 py-32 rounded-xl z-50 bg-white flex flex-col items-center gap-10 min-w-3xl">
        <h2 className="text-8xl font-primary--bold text-purple">Oups !</h2>
        <p className="text-2xl font-primary--regular">{text}</p>
        <Link
          to={link}
          className="text-xl font-primary--regular text-orange underline hover:text-purple"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default ErrorModal;
