import "./Student.css"
import studentAvatar from "../../../../images/Student/Student-avatar.jpg"
import portLink from "../../../../images/Student/student-portfolio-link.svg"
import { Link } from 'react-router-dom';
export const Student = () => {
  return (<section className="section student">
    <h2 className="text section__title">Студент</h2>
    <div className="student__container">
      <div className="student__description-container">
        <h3 className="text student__name">Max</h3>
        <h4 className="text student__job">Solution architecture</h4>
        <p className="section__text student__description-text">Я родился... Скоро я придумаю какой-нибудь текст для этого раздела.</p>
        <Link className="link student__github-link" to="https://github.com/1998max7362">Github</Link>
      </div>
      <img className="student__avatar" src={studentAvatar} alt="Фото студента"/>
    </div>
    <div className="student__portfolio-container">
      <h5 className="text student__portfolio-text">Портфолио</h5>
      <Link className="link student__portfolio-item" to="https://ссылка-на-проект">
        <p className="text student__portfolio-text-item">Статичный сайт</p>
        <img className="student__portfolio-item-logo" src={portLink} alt="Лого ссылки"/>
      </Link>
      <Link className="link student__portfolio-item" to="https://ссылка-на-проект">
        <p className="text student__portfolio-text-item">Адатптивный сайт</p>
        <img className="student__portfolio-item-logo" src={portLink} alt="Лого ссылки"/>
      </Link>
      <Link className="link student__portfolio-item" to="https://ссылка-на-проект">
        <p className="text student__portfolio-text-item">Одностраничное приложение</p>
        <img className="student__portfolio-item-logo" src={portLink} alt="Лого ссылки"/>
      </Link>
    </div>
  </section>)
}