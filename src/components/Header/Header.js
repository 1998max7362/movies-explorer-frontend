import "./Header.css"
import headerLogo from "../../images/Header/logo.svg"
import { HeaderLoggedIn } from "./HeaderLoggedIn";
import { HeaderNotLoggedIn } from "./HeaderNotLoggedIn";
import { useLocation, Link } from 'react-router-dom';
import { NavMenu } from "../NavMenu/NavMenu";
import { useState } from "react";

export const Header = ({loggedIn}) => {
  const [navMenuIsOpened, setNavMenuIsOpened] = useState(false)
  let { pathname } = useLocation();

  console.log(loggedIn)

  return (<>
    <header className={`header ${pathname === '/' && 'header_is-main-page'}`}>
      <Link to={'/'}>
        <img className="link header__logo" src={headerLogo} alt="Лого" />
      </Link>
      {loggedIn ?
        <HeaderLoggedIn pathname={pathname} openMenu={() => setNavMenuIsOpened(true)} />
        : <HeaderNotLoggedIn />
      }
    </header>
    <NavMenu isOpened={navMenuIsOpened} closeMenu={() => setNavMenuIsOpened(false)} />
  </>)
}
