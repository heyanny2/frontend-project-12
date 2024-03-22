import React, { useState } from 'react';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from '../Buttons/LoginButton';
import loginSchema from '../../validation/loginSchema';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthorization } from '../../hooks/hooks';
import { useTranslation } from 'react-i18next';
import { toast } from "react-toastify";
import { appRoutes } from '../../routes';

const LoginForm = () => {
  const { logIn } = useAuthorization();
  const navigate = useNavigate();
  const [isInvalidUserData, setInvalidUserData] = useState(false);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema(t('login.requiredField')),
    onSubmit: async (values) => {
      try {
        setInvalidUserData(false);
        const data = await axios.post('/api/v1/login', values);
        logIn(data);
        navigate(appRoutes.chatPagePath());
      } catch (error) {
        if (error.isAxiosError && error.response.status === 401) {
          setInvalidUserData(true);
        } else {
          toast.error(t('toast.networkError'));
        }
      }
    }
  });

  return ( 
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="title text-center mb-4">{t('login.loginTitle')}</h1>
      <div className="form-floating mb-3">
        <Form.Control 
          name="username"
          autoComplete="username"
          placeholder={t('login.userName')}
          type="text"
          id="username"
          className="form-control"
          onChange={formik.handleChange}
          isInvalid={isInvalidUserData}
          required
        />
        <Form.Label htmlFor="username" className="form-label">
          {t('login.userName')}
        </Form.Label>
      </div>
      <div className="form-floating mb-4">
        <Form.Control 
          name="password"
          autoComplete="current-password"
          placeholder={t('login.password')}
          type="password"
          id="password"
          className="form-control"
          onChange={formik.handleChange}
          isInvalid={isInvalidUserData}
          required
        />
        <Form.Label htmlFor="password" className="form-label">
          {t('login.password')}
        </Form.Label>
        <Form.Control.Feedback
        type="invalid"
        className="invalid-tooltip invalid-feedback"
        tooltip={isInvalidUserData}>
          {t('login.loginError')}
        </Form.Control.Feedback>
      </div>
      <Button title={t('login.loginTitle')} />
    </Form>
  );
};

export default LoginForm;