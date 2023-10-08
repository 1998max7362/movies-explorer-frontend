import { Link } from "react-router-dom"
import "./Sign.css"
import logo from "../../images/Header/logo.svg"

export const Sign = ({ register }) => {


  return (<form className="sign">
    <img className="sign__logo" src={logo} alt="Logo" />
    <h2 className="text sign__title">Добро пожаловать!</h2>
    {register && <div className="sign__input-container">
      <p className="text sign__input-label">Имя</p>
      <input className="sign_input" type="text" value="Крякря" />
      <p className="text sign__error">что-то</p>
    </div>}
    <div className="sign__input-container">
      <p className="text sign__input-label">E-mail</p>
      <input className="sign_input" type="text" value="Крякря" />
      <p className="text sign__error">что-то</p>
    </div>
    <div className="sign__input-container">
      <p className="text sign__input-label">Пароль</p>
      <input className="sign_input" type="password" value="Крякря" />
      <p className="text sign__error">что-то</p>
    </div>
    <button className={`sign__button ${register&&'sign__button_register'}`} type="submit">
      {register ? 'Войти' : 'Регистрация'}
    </button>
    <p className="text sign__extra-text">
      {register ? 'Уже зарегистированы? ' : 'Еще не зарегистированы? '}
      <Link to={register ? '/signup' : '/signin'} className="link text sign__extra-link">
        {register ? 'Регистрация' : 'Войти'}
      </Link>
    </p>
  </form>)
}