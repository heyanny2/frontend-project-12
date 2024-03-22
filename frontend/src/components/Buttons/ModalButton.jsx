import './style.css'
import cn from 'classnames';

const ModalButtton = ({ title, priority, onClick } ) => {
  const modalButttonClasses = cn("w-40 modal-button", {
    'high': priority,
  })

  return (
    <button
      type={priority ? 'submit' : 'button'}
      className={modalButttonClasses}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default ModalButtton;