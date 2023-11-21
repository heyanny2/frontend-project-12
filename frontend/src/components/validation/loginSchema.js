import * as Yup from 'yup';

const loginSchema = () => Yup.object().shape({
  username: Yup
    .string()
    .trim(50, 'Максимум 50 букв')
    .required(),
  password: Yup
    .string()
    .trim()
    .required('Обязательное поле'),
});

export default loginSchema;