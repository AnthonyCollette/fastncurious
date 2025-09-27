interface ThemeProps {
  name: string;
  icon: string;
}

const Theme = ({ name, icon }: ThemeProps) => {
  return (
    <li className="flex flex-col items-center hover:bg-purple cursor-pointer p-4 rounded-lg">
      <img src={icon} alt={name} className="w-32 h-32 mb-2" />
      <span className="font-primary--bold text-3xl uppercase">{name}</span>
    </li>
  );
};

export default Theme;
