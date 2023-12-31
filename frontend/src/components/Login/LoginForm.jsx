import React, { useContext } from 'react';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from '../Button/Button';
import loginSchema from '../validation/loginSchema';
import axios from 'axios';
import UserDataContext from '../context/UserDataContext';
import UserDataContextProvider from '../context/Provider';
import { useNavigate } from 'react-router-dom';



const LoginForm = () => {
  const { logIn, logOut } = useContext(UserDataContext);
  //console.log(logIn)
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
                  logIn(response.data);
                  navigate('/');
        });
      } catch (error) {
        if (error.isAxiosError && error.response.status === 401) {
            throw new Error
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
      </div>
      <Button title="Войти"/>
    </Form>
  )
};

export default LoginForm;