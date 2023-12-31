import headerProfile from '../../images/Header/header-profile.svg';
import navButton from '../../images/Header/nav-button.svg';
import navButtonLight from '../../images/Header/nav-button-white.svg';
import { Link } from 'react-router-dom';

export const HeaderLoggedIn = ({ pathname, openMenu, windowSize }) => {
  return (
    <>
      {windowSize <= 768 ? (
        <>
          <img
            className='link header__nav-button'
            src={pathname === '/' ? navButtonLight : navButton}
            alt='Кнопка навигации'
            onClick={openMenu}
          />
        </>
      ) : (
        <>
          <div
            className={`header__navigation-container ${
              pathname === '/' && 'header__navigation-container_main'
            }`}
          >
            <Link
              className={`link ${pathname === '/' && 'header__link-ismain'} ${
                pathname === '/movies' && 'header__link_selected'
              }`}
              to='/movies'
            >
              Фильмы
            </Link>
            <Link
              className={`link ${pathname === '/' && 'header__link-ismain'} ${
                pathname === '/saved-movies' && 'header__link_selected'
              }`}
              to='/saved-movies'
            >
              Сохранённые фильмы
            </Link>
          </div>
          <Link
            className={`profile-button link ${
              pathname === '/' && 'header__profile-main'
            }`}
            to='/profile'
          >
            <p className='text'>Аккаунт</p>
            <img
              className='profile-button-logo'
              src={headerProfile}
              alt='Лого-аккаунт'
            />
          </Link>
        </>
      )}
    </>
  );
};
