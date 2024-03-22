import { NavLink, useNavigate } from "react-router-dom";
import "./style.css";
import { useTranslation } from "react-i18next";
import { useAuthorization } from '../../hooks/hooks';
import { appRoutes } from '../../routes/index';
import { Button } from 'react-bootstrap';

const NavBar = () => {
  const { t } = useTranslation();
  const auth = useAuthorization();  
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate(appRoutes.loginPagePath());
    auth.logOut();
  };

  const LogoutButton = (title) => {
    if (auth.userData) { 
      return <Button className="logout-button" onClick={handleLogout}>{title}</Button>;
    }
    return null;
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="nav-container">
        <NavLink to={appRoutes.chatPagePath()} className="navbar-brand">
        {t('navigation.chatName')}
        </NavLink>
        {LogoutButton(t('navigation.exitBtn'))}
      </div>
    </nav>
  );
};

export default NavBar;