import React from 'react';
import { Formik, Form, Field } from 'formik';

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
            <Form>
              <h1 className="text-center mb-4">Войти</h1>
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
              <div class="form-floating mb-4">
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