import { NavLink } from "react-router";
import logo from "../assets/logo.webp";

const Nav = () => {
  return (
    <nav className="container flex justify-center py-12.5">
      <NavLink to="/" className="py-10.5">
        <img src={logo} alt="Logo" />
      </NavLink>
    </nav>
  );
};

export default Nav;
