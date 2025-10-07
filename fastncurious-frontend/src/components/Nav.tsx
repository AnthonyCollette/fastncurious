import logo from "../assets/logo.webp";

const Nav = () => {
  return (
    <nav className="container flex justify-center py-12.5">
      <img src={logo} alt="Logo" className="py-10.5" />
    </nav>
  );
};

export default Nav;
