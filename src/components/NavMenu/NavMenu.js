import { Link, useLocation } from "react-router-dom"
import profileLogo from "../../images/Header/header-profile.svg"
import closeButton from "../../images/navigate-popup/close-button.svg"
import "./Navigate-popup.css"


export const NavMenu = ({ isOpened, closeMenu }) => {
  let { pathname } = useLocation();

  return (<section className={`navigate-popup ${!isOpened && 'navigate-popup_closed'}`}>
    <div className="link navigate-popup__layer" onClick={closeMenu} />
    <img src={closeButton}
      alt="кнопка закрытия"
      className="link navigate-popup__close-button"
      onClick={closeMenu} />
    <div className="navigate-popup__container">
      <div className="navigate-popup__links">
        <Link
          className={`link navigate-popup__link ${pathname === '/' && 'navigate-popup__link_current'}`}
          to={'/'}
          onClick={closeMenu}>Главная</Link>
        <Link
          className={`link navigate-popup__link ${pathname === '/movies' && 'navigate-popup__link_current'}`}
          to={'movies'}
          onClick={closeMenu}>Фильмы</Link>
        <Link
          className={`link navigate-popup__link ${pathname === '/saved-movies' && 'navigate-popup__link_current'}`}
          to={'saved-movies'}
          onClick={closeMenu}>Сохранённые фильмы</Link>
        <div className="header__profile link navigate-popup__profile">
          <p className="text">Аккаунт</p>
          <img
            className="header__logo-account "
            src={profileLogo}
            alt="Лого-аккаунт"
          />
        </div>
      </div>
    </div>
  </section >)
}