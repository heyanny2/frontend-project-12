import { NavLink } from "react-router-dom";
import "./style.css";
import { useTranslation } from "react-i18next";
import { useAuthorization } from '../../hooks';

const NavBar = () => {
  const { t } = useTranslation();
  const { logOut } = useAuthorization();

  const LogoutButton = (title) => {
    if (localStorage.getItem('user') !== null) {
      return (
          <button type="button" className="logout-button">{title}</button>
      )
    }

    return null;
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="nav-container">
        <NavLink className="navbar-brand" to="/">
        {t('navigation.chatName')}
        </NavLink>
        {LogoutButton(t('navigation.exitBtn'))}
      </div>
    </nav>
  )
}

export default NavBar;