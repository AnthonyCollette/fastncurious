interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  const simpleButton =
    "cursor-pointer bg-purple border-3 border-orange text-orange text-2xl py-2 px-10 rounded-xl font-primary--bold hover:bg-orange hover:text-purple";

  return (
    <button onClick={() => console.log("Clicked !")} className={simpleButton}>
      {text}
    </button>
  );
};

export default Button;
