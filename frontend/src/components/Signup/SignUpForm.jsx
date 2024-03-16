import Form from 'react-bootstrap/Form';
import React, {useState} from "react";
import signupSchema from "../../validation/signupSchema";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import axios from "axios";
import Title from "../Title/Title";
import LoginButton from '../Buttons/LoginButton'
import { useAuthorization } from '../../hooks/hooks';
import { useTranslation } from 'react-i18next';
import { toast } from "react-toastify";

const SignupForm = () => {
  const { logIn } = useAuthorization();
  const navigate = useNavigate();
  const [isInvalidAuth, setInvalidAuth] = useState(false);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: { username: "", password: "", passwordConfirmation: "" },
    validationSchema: signupSchema,
    onSubmit: async (values) => {    
      const { username, password } = values;
      try {
        setInvalidAuth(false);
        await axios
          .post('/api/v1/signup', { username, password })
          .then((response) => {
            logIn(response.data);
            navigate('/');
          });
      } catch(error) {
        if (error.isAxiosError && error.response.status === 409) {
          setInvalidAuth(true);
          return;
        }
        toast.error(t('toast.networkError'));
      }
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <Title title="Регистрация"/>
        <div className="form-floating mb-3">
          <Form.Control
          id="username"
          type="text"
          name="username"
          className="form-control"
          placeholder={t('registration.userName')}
          onChange={(e) => {
            setInvalidAuth(false);
            formik.handleChange(e);
          }}
          isInvalid={isInvalidAuth || (formik.touched.username && formik.errors.username)}
          required
          />
          <Form.Label htmlFor="username" className="form-label">
          {t('registration.userName')}
          </Form.Label>
          <Form.Control.Feedback
          type="invalid"
          className="invalid-tooltip invalid-feedback"
          tooltip={isInvalidAuth}>
          {t('registration.userNameLength')}
          </Form.Control.Feedback>
        </div>
        <div className="form-floating mb-3">
          <Form.Control
          id="password"
          type="password"
          name="password"
          className="form-control"
          placeholder={t('registration.password')}
          onChange={formik.handleChange}
          isInvalid={isInvalidAuth || (formik.touched.password && formik.errors.password)}
          required
          />
          <Form.Label htmlFor="password" className="form-label">
          {t('registration.password')}
          </Form.Label>
          <Form.Control.Feedback type="invalid" className="invalid-tooltip invalid-feedback"
          tooltip={isInvalidAuth}>
          {t('registration.passwordLength')}
          </Form.Control.Feedback>
        </div>
        <div className="form-floating mb-4">
          <Form.Control
          id="passwordConfirmation"
          type="password"
          name="passwordConfirmation"
          className="form-control"
          placeholder={t('registration.passwordConfirmation')}
          onChange={formik.handleChange}
          isInvalid={isInvalidAuth
            || (formik.touched.passwordConfirmation && formik.errors.passwordConfirmation)}
          required
          />
          <Form.Label htmlFor="passwordConfirmation" className="form-label">
          {t('registration.passwordConfirmation')}
          </Form.Label>
          <Form.Control.Feedback type="invalid" className="invalid-tooltip invalid-feedback"
            tooltip={isInvalidAuth}>
          {t('registration.passwordMatching')}
          </Form.Control.Feedback>
        </div>
      <LoginButton title={t('registration.registrationBtn')} />
    </Form>
    );
}

export default SignupForm;