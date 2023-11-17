import React from 'react';
import { Formik, Form, Field } from 'formik';

import Title from '../components/Title/Title';

const LoginForm = () => {
  return ( 
    <Formik initialValues={{ email: '', password: '' }}
      onSubmit={({ setSubmitting }) => {
          console.log("Form is validated");
          setSubmitting(false);
        }
      }
    >
      {({
        //  values,
        //  errors,
        //  touched,
        //  handleChange,
        //  handleBlur,
        //  handleSubmit,
        //  isSubmitting,
         /* and other goodies */
       }) => (
        <div className="container">
          <div className="form-card">
            <Form className="col-12 col-md-6 mt-3 mt-mb-0">
              <Title title="Войти"/>
              <div className="form-floating mb-3">
                <Field
                  name="username"
                  autocomplete="username"
                  required=""
                  placeholder="Ваш ник"
                  id="username"
                  className="form-control"
                  value=""
                />
                <label for="username">Ваш ник</label>
              </div>
              <div className="form-floating mb-4">
                <Field 
                  name="password"
                  autocomplete="current-password"
                  required=""
                  placeholder="Пароль"
                  type="password"
                  id="password"
                  className="form-control"
                  value=""
                />
                <label className="form-label" for="password">Пароль</label>
              </div>
              <Button title="Войти"/>
            </Form>
          </div>
        </div>
       )}
    </Formik>
  )
};

export default LoginForm;