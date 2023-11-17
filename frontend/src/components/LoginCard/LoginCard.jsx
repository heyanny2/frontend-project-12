import LoginForm from "../LoginForm.jsx/LoginForm";
import LoginFooter from "../LoginFooter/LoginFooter";

import loginImg from '../../img/login.jpeg';

const LoginCard = ({ title }) => {
  return(
    <div className="col-12 col-md-8 col-xxl-6">
      <div className="card shadow-sm">
        <div className="card-body row p-5">
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
            <img src={loginImg} className="rounded-circle" alt="Войти" />
          </div>
          <LoginForm />
        </div>
        <LoginFooter/>
      </div>
    </div>
  )
}

export default LoginCard;