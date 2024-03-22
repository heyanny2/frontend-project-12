import {NavLink} from "react-router-dom";
import { useTranslation } from 'react-i18next';

const LoginFooter = ({ title }) => {
  const { t } = useTranslation();

  return(
    <div className="card-footer p-4">
      <div className="text-center">
        <span>{t('login.noAccount')} </span> 
        <NavLink to="/signup" className="link">
          {t('registration.registrationTitle')}
        </NavLink>
      </div>
    </div>
  );
};

export default LoginFooter;