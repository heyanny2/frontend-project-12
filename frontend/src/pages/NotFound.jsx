import notFound from '../img/notFound.jpg';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center">
      <img src={notFound} alt="Страница не найдена" className="img-fluid h-25" width="450"/>
      <h1 class="h4 text-muted">{"Страница не найдена"}</h1>
      <p class="text-muted">
        <span>Но вы можете перейти </span>
        <NavLink to="/" className="link">
          {"на главную страницу"}
        </NavLink>
      </p>
    </div>
  )
}

export default NotFound;