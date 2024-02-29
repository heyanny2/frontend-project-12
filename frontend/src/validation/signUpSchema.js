import * as Yup from 'yup';

const signupSchema = Yup.object().shape({
    username: Yup
        .string()
        .trim()
        .min(3, 'Минимум 3 симв')
        .max(20, 'Максимум 20 символов')
        .trim()
        .required('Обязательное поле'),
    password: Yup
        .string()
        .min(6)
        .trim()
        .required('Обязательное поле'),
    passwordConfirmation: Yup
        .string()
        .oneOf([Yup.ref('password')], 'Пароли не совпадают'),
});

export default signupSchema;