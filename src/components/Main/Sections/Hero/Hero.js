import { Link } from "react-router-dom"
import heroLogo from "../../../../images/Hero/logo-hero.svg"
import "./Hero.css"

export const Hero = () => {
  return (<section className="section hero">
    <div className="hero__text-container">
      <h1 className="hero__title">Учебный проект студента факультета Веб-разработки</h1>
      <p className="hero__text">Листай ниже, чтобы узнать больше про этот проект и его создателя.</p>
      <Link to="https://github.com/1998max7362/movies-explorer-frontend" ><button type="button" className="hero__button link">Узнать больше</button></Link>
    </div>
    <img className="hero__logo" src={heroLogo} alt="Лого-hero"/>
  </section>)
}