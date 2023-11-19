import notFound from '../img/notFound.jpg';
import Title from '../components/Title/Title';

const NotFound = () => {
  return (
    <div className="text-center">
      <img src={notFound} alt="Страница не найдена" className="notFound-img"/>
      <Title title="Страница не найдена" />
    </div>
  )
}

export default NotFound;