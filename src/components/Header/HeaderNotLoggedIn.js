import { Link } from 'react-router-dom';

export const HeaderNotLoggedIn = () => {
  return (<div className="header__sign-container">
    <Link className="link header__link-ismain" to="/signup">Регистрация</Link>
    <Link className="header__signin-button link" to="/signin">Войти</Link>
  </div>)
}