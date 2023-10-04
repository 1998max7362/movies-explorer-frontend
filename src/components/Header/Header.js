import "./Header.css"
import headerLogo from "../../images/Header/logo.svg"
import { HeaderLoggedIn } from "./HeaderLoggedIn";
import { HeaderNotLoggedIn } from "./HeaderNotLoggedIn";
import { useLocation } from 'react-router-dom';

export const Header = ({isLoggedIn}) => {
  let { pathname } = useLocation();

  // const isLoggedIn = true

  return <header className={`header ${pathname==='/'&&'header_is-main-page'}`}>
    <img className="header__logo" src={headerLogo} alt="Лого" />
    {isLoggedIn ?
      <HeaderLoggedIn pathname = {pathname}/>
      : <HeaderNotLoggedIn />
    }
  </header>

}
