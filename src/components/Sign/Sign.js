import { Link, useNavigate } from 'react-router-dom';
import './Sign.css';
import logo from '../../images/Header/logo.svg';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { mainApi } from '../../utils/MainApi';
import { useState } from 'react';

export const Sign = ({ register, updateUser }) => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = register
    ? async (values) => {
        try {
          const registrationResult = await mainApi.signUp(values);
          const logginResult = await mainApi.signIn(values);
          updateUser();
          setError('')
          navigate('/movies')
        } catch (err) {
          setError(err.message);
        }
      }
    : async (values) => {
        try {
          const logginResult = await mainApi.signIn(values);
          updateUser();
          setError('')
          navigate('/movies')
        } catch (err) {
          setError(err.message);
        }
      };

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    name: register
      ? Yup.string()
          .min(2, 'не менее 2-х символов')
          .max(30, 'не более 30 символов')
          .matches(
            /^(?!\s)[A-Za-zА-Яа-я\-\s]+$/,
            'Имя должно состоять из латиницы, кириллицы, пробела или дефиса'
          )
          .required('Обязательное поле')
      : Yup.string()
          .min(2, 'не менее 2-х символов')
          .max(30, 'не более 30 символов')
          .matches(
            /^(?!\s)[A-Za-zА-Яа-я\-\s]+$/,
            'Имя должно состоять из латиницы, кириллицы, пробела или дефиса'
          ),
    email: Yup.string()
      .email('Неверный формат e-mail')
      .required('Обязательное поле'),
    password: Yup.string().required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validateOnMount: true,
  });

  return (
    <form className='sign' onSubmit={formik.handleSubmit}>
      <img
        className='link sign__logo'
        src={logo}
        alt='Logo'
        onClick={() => navigate('/')}
      />
      <h2 className='text sign__title'>
        {register ? 'Добро пожаловать!' : 'Рады видеть!'}
      </h2>
      {register && (
        <div className='sign__input-container'>
          <p className='text sign__input-label'>Имя</p>
          <input
            className='sign__input'
            type='text'
            value={formik.values.name}
            onChange={(evt) => {
              formik.setFieldValue('name', evt.target.value);
            }}
            name='name'
            onBlur={formik.handleBlur}
          />
          <p className='text sign__input-error'>
            {formik.touched.name && formik.errors.name}
          </p>
        </div>
      )}
      <div className='sign__input-container'>
        <p className='text sign__input-label'>E-mail</p>
        <input
          className='sign__input'
          type='text'
          value={formik.values.email}
          onChange={(evt) => {
            formik.setFieldValue('email', evt.target.value);
          }}
          name='email'
          onBlur={formik.handleBlur}
        />
        <p className='text sign__input-error'>
          {formik.touched.email && formik.errors.email}
        </p>
      </div>
      <div className='sign__input-container'>
        <p className='text sign__input-label'>Пароль</p>
        <input
          className='sign__input'
          type='password'
          value={formik.values.password}
          onChange={(evt) => {
            formik.setFieldValue('password', evt.target.value);
          }}
          name='password'
          onBlur={formik.handleBlur}
        />
        <p className='text sign__input-error'>
          {formik.touched.password && formik.errors.password}
        </p>
      </div>
      <p className={`text sign__error ${register && 'sign__error_register'}`}>
        {error}
      </p>
      <button
        className={`link sign__button ${
          !formik.isValid && 'sign__button_disabled'
        }`}
        type='submit'
        disabled={!formik.isValid}
      >
        {register ? 'Зарегистрироваться' : 'Войти'}
      </button>
      <p className='text sign__extra-text'>
        {register ? 'Уже зарегистированы? ' : 'Еще не зарегистированы? '}
        <Link
          to={register ? '/signin' : '/signup'}
          className='link sign__extra-link'
        >
          {register ? 'Войти' : 'Регистрация'}
        </Link>
      </p>
    </form>
  );
};
