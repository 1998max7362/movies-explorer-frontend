import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import './Profile.css';
import { mainApi } from '../../utils/MainApi';
import { useCurrentUser } from '../../contexts/currentUser';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export const Profile = ({ setLoggedIn }) => {
  const [readOnly, setReadOnly] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { currentUser, setCurrentUserInfo } = useCurrentUser((state) => state);

  const handleSubmit = async (values) => {
    try {
      const newUserInfo = await mainApi.patchCurrentUserInfo(values);
      setCurrentUserInfo(newUserInfo);
      setError('');
      setOpen(true);
      setReadOnly(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const signOut = async () => {
    try {
      await mainApi.signOut();
      localStorage.clear();
      setLoggedIn(false);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const initialValues = {
    name: currentUser.name,
    email: currentUser.email,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'не менее 2-х символов')
      .max(30, 'не более 30 символов')
      .matches(
        /^(?!\s)[A-Za-zА-Яа-я\-\s]+$/,
        'Имя должно состоять из латиницы, кириллицы, пробела или дефиса'
      )
      .required('Обязательное поле'),
    email: Yup.string()
      .matches(
        /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/,
        'Неверный формат e-mail'
      )
      .required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
    enableReinitialize: true,
  });

  const handleSetEditable = () => {
    formik.setFieldValue('name', currentUser.name);
    formik.setFieldValue('email', currentUser.email);
    setReadOnly(false);
  };

  return (
    <section className='profile'>
      <h2 className='text profile__hello'>{`Привет, ${currentUser.name}!`}</h2>
      <form className='profile__form' onSubmit={formik.handleSubmit}>
        <div className='profile__container'>
          <p className='text profile__label'>Имя</p>
          <input
            className='profile__input'
            type='text'
            value={formik.values.name}
            onChange={(evt) => {
              formik.setFieldValue('name', evt.target.value);
            }}
            name='name'
            readOnly={readOnly}
          />
        </div>
        <p className='text profile__input-error'>{formik.errors.name}</p>
        <div className='profile__container'>
          <p className='text profile__label'>E-mail</p>
          <input
            className='profile__input'
            name='email'
            type='text'
            value={formik.values.email}
            onChange={(evt) => {
              formik.setFieldValue('email', evt.target.value);
            }}
            readOnly={readOnly}
          />
        </div>
        <p className='text profile__input-error'>{formik.errors.email}</p>
        {!readOnly && (
          <>
            <p className='text profile__error'>{error}</p>
            <button
              className={`link profile__form-button ${
                (!formik.isValid ||
                  (currentUser.name === formik.values.name &&
                    currentUser.email === formik.values.email)) &&
                'profile__form-button_disabled'
              }`}
              type='submit'
            >
              Сохранить
            </button>
          </>
        )}
      </form>
      {readOnly && (
        <button
          className='link profile__edit-button'
          onClick={handleSetEditable}
        >
          Редактировать
        </button>
      )}
      {readOnly && (
        <button className='link profile__sign-off-button' onClick={signOut}>
          Выйти из аккаунта
        </button>
      )}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <DialogContentText>Профиль успешно обновлён!</DialogContentText>
        </DialogContent>
      </Dialog>
    </section>
  );
};
