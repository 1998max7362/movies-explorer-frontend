import "./About.css"

export const About = () => {
  return (<section className="section about">
    <h2 className="text section__title">О проекте</h2>
    <div className="about__description-container">
      <div className="about__description-stages">
        <h3 className="text about__description-title">Дипломный проект включал 5 этапов</h3>
        <p className="text section__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      </div>
      <div className="about__description-weeks">
        <h3 className="text about__description-title">На выполнение диплома ушло 5 недель</h3>
        <p className="text section__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
    </div>
    <div className="about__timeline-container">
      <div className="about__timeline-text backend-text">1 неделя</div>
      <div className="about__timeline-text frontend-text">4 недели</div>
      <div className="about__timeline-part">Back-end</div>
      <div className="about__timeline-part">Front-end</div>
    </div>
  </section>)
}