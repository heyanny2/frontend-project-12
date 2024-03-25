const ModalButtton = ({ title, priority, onClick }) => (
  <button
    type={priority ? 'submit' : 'button'}
    className="w-40"
    onClick={onClick}
  >
    {title}
  </button>
);

export default ModalButtton;
