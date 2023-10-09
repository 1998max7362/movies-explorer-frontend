import "./Footer.css"
import { Link } from "react-router-dom"

export const Footer = () => {
  return <footer className="footer">
    <div className="footer__yandex-practicum">Учебный проект Яндекс.Практикум х BeatFilm.</div>
    <div className="footer__container">
      <p className="text footer__year">&#169;2023</p>
      <div className="footer__link-container">
        <Link className="link" to='https://practicum.yandex.ru/' target="_blank">Яндекс.Практикум</Link>
        <Link className="link" to='https://github.com/1998max7362/' target="_blank">GitHub</Link>
      </div>
    </div>
  </footer>

}
