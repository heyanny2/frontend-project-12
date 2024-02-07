import React, { useContext } from 'react';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from '../Button/Button';
import loginSchema from '../../validation/loginSchema';
import axios from 'axios';
import UserDataContextProvider from '../../context/UserDataContextProvider';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { logIn, logOut } = useContext(UserDataContextProvider);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async () => {
      try {
        await axios 
                .post('/api/v1/login', { username: 'admin', password: 'admin' })
                .then((response) => {
                  console.log(response.data)
                  const log = logIn(response.data);
                  console.log(log);
                  navigate('/');
        });
      } catch (error) {
        if (error.isAxiosError && error.response.status === 401) {
          console.log('Неверные имя пользователя или пароль');
            //throw new Error
        }
      }
    }
  });

  return ( 
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="title text-center mb-4">Войти</h1>
      <div className="form-floating mb-3">
        <Form.Control 
          name="username"
          autoComplete="username"
          required
          placeholder="Ваш ник"
          type="text"
          id="username"
          className="form-control"
          onChange={formik.handleChange}
        />
        <Form.Label htmlFor="username">Ваш ник</Form.Label>
        <Form.Control.Feedback
          type="invalid"
          className="invalid-feedback"
          tooltip={formik.errors.name && formik.touched.name}
        >
        Неверные имя пользователя или пароль
        </Form.Control.Feedback>
      </div>
      <div className="form-floating mb-4">
        <Form.Control 
          name="password"
          autoComplete="current-password"
          required
          placeholder="Пароль"
          type="password"
          id="password"
          className="form-control"
          onChange={formik.handleChange}
        />
        <Form.Label htmlFor="password" className="form-label">Пароль</Form.Label>
        <Form.Control.Feedback
        type="invalid"
        className="invalid-feedback"
        tooltip={formik.errors.password && formik.touched.password}>
        Неверные имя пользователя или пароль
        </Form.Control.Feedback>
      </div>
      <Button title="Войти"/>
    </Form>
  )
};

export default LoginForm;