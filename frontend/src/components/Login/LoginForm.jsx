import React from 'react';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from '../Button/Button';
import loginSchema from '../validation/loginSchema';
import axios from 'axios';



const LoginForm = () => {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: {loginSchema},
    onSubmit: async () => {
      try {
        await axios 
                .post('/api/v1/login', { username: 'admin', password: 'admin' })
                .then((response) => {
                  localStorage.setItem('user', JSON.stringify(response.data));
        });
      } catch (error) {
        throw new Error
      }
    }
  });

  return ( 
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="title text-center mb-4">Войти</h1>
      <div className="form-floating mb-3">
        <Form.Control 
          name="username"
          autocomplete="username"
          required
          placeholder="Ваш ник"
          type="text"
          id="username"
          className="form-control"
          value=""
          onChange={formik.handleChange}
        />
        <Form.Label htmlFor="username">Ваш ник</Form.Label>
      </div>
      <div className="form-floating mb-4">
        <Form.Control 
          name="password"
          autocomplete="current-password"
          required
          placeholder="Пароль"
          type="password"
          id="password"
          className="form-control"
          value=""
        />
        <Form.Label htmlFor="password" className="form-label">Пароль</Form.Label>
      </div>
      <Button title="Войти"/>
    </Form>
  )
};

export default LoginForm;