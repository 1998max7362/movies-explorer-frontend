import { useEffect, useState } from "react";
import headerProfile from "../../images/Header/header-profile.svg"
import navButton from "../../images/Header/nav-button.svg"
import navButtonLight from "../../images/Header/nav-button-white.svg"
import { Link } from 'react-router-dom';

export const HeaderLoggedIn = ({ pathname, openMenu }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);



  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);


  return (
    <>{windowWidth <= 768 ?
      <>
        <img className="link header__nav-button" src={pathname === '/' ? navButtonLight : navButton} alt="Кнопка навигации" onClick={openMenu} />
      </>
      : <>
        <div className={`header__navigation-container ${pathname === '/' && 'header__navigation-container_main'}`}>
          <Link className={`link ${pathname === '/' && 'header__link_ismain'}`} to="/movies">Фильмы</Link>
          <Link className={`link ${pathname === '/' && 'header__link_ismain'}`} to="/saved-movies">Сохранённые фильмы</Link>
        </div>
        <Link className={`header__profile link ${pathname === '/' && 'header__profile_main'}`} to="/profile">
          <p className="text">Аккаунт</p>
          <img className="header__logo-account" src={headerProfile} alt="Лого-аккаунт" />
        </Link>
      </>}
    </>)
} 