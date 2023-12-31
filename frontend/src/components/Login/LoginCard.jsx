import LoginForm from "./LoginForm";
import LoginFooter from "./LoginFooter";

import loginImg from '../../img/login.jpg';

const LoginCard = () => {
  return(
    <div className="col-12 col-md-8 col-xxl-6">
      <div className="card shadow-sm">
        <div className="card-body row p-5">
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
            <img src={loginImg} className="card-img" alt="Войти" />
          </div>
          <LoginForm />
        </div>
        <LoginFooter/>
      </div>
    </div>
  )
}

export default LoginCard;
