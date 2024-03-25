import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { appRoutes } from '../routes';
import notFound from '../img/notFound.jpg';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img src={notFound} alt={t('notFound.pageNotFound')} className="img-fluid h-25" width="450" />
      <h1 className="h4 text-muted">{t('notFound.pageNotFound')}</h1>
      <p className="text-muted">
        <span className="to-main">
          {t('notFound.youCanGo')}
          {' '}
        </span>
        <NavLink to={appRoutes.chatPagePath()} className="link">
          {t('notFound.toMainPage')}
        </NavLink>
      </p>
    </div>
  );
};

export default NotFound;
