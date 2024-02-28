import { NavLink } from "react-router-dom";
import "./style.css";
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const { t } = useTranslation();

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
        {LogoutButton(t('navigation.exitBtn'))}
      </div>
    </nav>
  )
}

export default NavBar;