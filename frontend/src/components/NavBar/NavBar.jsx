import { NavLink, useNavigate } from "react-router-dom";
import "./style.css";
import { useTranslation } from "react-i18next";
import { useAuthorization } from '../../hooks/hooks';
import { appRoutes } from '../../routes/index';

const NavBar = () => {
  const { t } = useTranslation();
  const { logOut } = useAuthorization();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate(appRoutes.loginPagePath());
    logOut();
  };

  const LogoutButton = (handle, title) => {
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
        <NavLink to={appRoutes.chatPagePath()} className="navbar-brand">
        {t('navigation.chatName')}
        </NavLink>
        {LogoutButton(handleLogout, t('navigation.exitBtn'))}
      </div>
    </nav>
  )
}

export default NavBar;