import React from 'react';

function Techs(props) {

  return (
    <section className="techs" id="techs">
      <h2 className="main__subtitle">Технологии</h2>
      <p className="main__title techs__title">7 технологий</p>
      <p className="main__text techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <div className="techs__list">
        <div className="techs__list-item">HTML</div>
        <div className="techs__list-item">CSS</div>
        <div className="techs__list-item">JS</div>
        <div className="techs__list-item">React</div>
        <div className="techs__list-item">Git</div>
        <div className="techs__list-item">Express.js</div>
        <div className="techs__list-item">mongoDB</div>
      </div>
    </section>
  );
}

export default Techs;