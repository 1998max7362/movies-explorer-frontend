import { Link,useNavigate } from "react-router-dom"
import "./Sign.css"
import logo from "../../images/Header/logo.svg"

export const Sign = ({ register }) => {
  const navigate = useNavigate()

  return (<form className="sign">
      <img className="link sign__logo" src={logo} alt="Logo" onClick={()=>navigate('/')}/>
    <h2 className="text sign__title">{register ? 'Добро пожаловать!' : 'Рады видеть!'}</h2>
    {register && <div className="sign__input-container">
      <p className="text sign__input-label">Имя</p>
      <input className="sign__input" type="text" value="Крякря" required/>
      <p className="text sign__error">что-то</p>
    </div>}
    <div className="sign__input-container">
      <p className="text sign__input-label">E-mail</p>
      <input className="sign__input" type="text" value="Крякря"  required/>
      <p className="text sign__error">что-то</p>
    </div>
    <div className="sign__input-container">
      <p className="text sign__input-label">Пароль</p>
      <input className="sign__input" type="password" value="Крякря" required/>
      <p className="text sign__error">что-то</p>
    </div>
    <button className={`sign__button ${register && 'sign__button_register'}`} type="submit">
      {register ? 'Зарегистрироваться' : 'Войти'}
    </button>
    <p className="text sign__extra-text">
      {register ? 'Уже зарегистированы? ' : 'Еще не зарегистированы? '}
      <Link to={register ? '/signin' : '/signup'} className="link sign__extra-link">
        {register ? 'Войти' : 'Регистрация'}
      </Link>
    </p>
  </form>)
}