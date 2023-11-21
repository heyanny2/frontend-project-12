import { NavLink } from "react-router-dom";
import "./style.css";



const NavBar = () => {

  const LogoutButton = (title) => {
    return (
        <button type="button" className="logout-button">{title}</button>
    )
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="nav-container">
        <NavLink className="navbar-brand" to="/">
          Hexlet Chat
        </NavLink>
        {LogoutButton("Выйти")}
      </div>
    </nav>
  )
}

export default NavBar;