import "./Error404.css"
import { useNavigate, } from "react-router-dom"

export const Error404 = () => {

  const navigate = useNavigate();

  return (<section className="error-404">
    <h1 className="text error-404__title">404</h1>
    <p className="text error-404__text">Страница не найдена</p>
    <p className="text link error-404__link" onClick={()=>{navigate(-1)}}>Назад</p>
  </section>)
}