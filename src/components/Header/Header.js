import "./Header.css"
import headerLogo from "../../images/Header/logo.svg"
import { HeaderLoggedIn } from "./HeaderLoggedIn";
import { HeaderNotLoggedIn } from "./HeaderNotLoggedIn";
import { useLocation } from 'react-router-dom';
import { NavMenu } from "../NavMenu/NavMenu";
import { useState } from "react";

export const Header = ({}) => {
  const [navMenuIsOpened, setNavMenuIsOpened] = useState(false)
  let { pathname } = useLocation();

  const isLoggedIn = true

  return(<>
    <header className={`header ${pathname === '/' && 'header_is-main-page'}`}>
      <img className="header__logo" src={headerLogo} alt="Лого" />
      {isLoggedIn ?
        <HeaderLoggedIn pathname={pathname} openMenu={() => setNavMenuIsOpened(true)}/>
        : <HeaderNotLoggedIn />
      }
    </header>
    <NavMenu isOpened={navMenuIsOpened} closeMenu={() => setNavMenuIsOpened(false)} />
  </>)
}
