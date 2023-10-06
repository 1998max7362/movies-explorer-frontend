import "./Tech.css"

export const Tech = () => {
  return (<section className="section tech">
    <h2 className="text section__title">Технологии</h2>
    <div className="tech__container">
      <h3 className="text tech__title">7 Технологий</h3>
      <p className="text section__text tech__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте</p>
      <div className="tech__all-technologies">
        <div className="section__text tech__technology">HTML</div>
        <div className="section__text tech__technology">CSS</div>
        <div className="section__text tech__technology">JS</div>
        <div className="section__text tech__technology">React</div>
        <div className="section__text tech__technology">Git</div>
        <div className="section__text tech__technology">Express.js</div>
        <div className="section__text tech__technology">mogoDB</div>
      </div>
    </div>
  </section>)
}