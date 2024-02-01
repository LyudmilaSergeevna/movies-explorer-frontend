import React from 'react';
import Subtitle from '../Subtitle/Subtitle';

function Techs() {

  return (
    <section className="techs" id="techs">
      <Subtitle text="Технологии"/>
      <p className="techs__title">7 технологий</p>
      <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
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