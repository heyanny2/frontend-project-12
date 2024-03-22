const Button = ({ title }) => {
  return(
    <button
      type="submit"
      className="w-100 mb-3 btn btn-outline-primary login-button"
    >
      {title}
    </button>
  );
};

export default Button;