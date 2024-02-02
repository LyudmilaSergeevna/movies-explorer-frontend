import React from 'react';
import Subtitle from '../Subtitle/Subtitle';

function AboutProject() {

  return (
    <section className="about-project" id="about-project">
      <Subtitle text="О проекте"/>
      <div className="about-project__columns">
        <div className="about-project__item">
          <h3 className="about-project__brief">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__item">
          <h3 className="about-project__brief">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__graph">
        <div className="about-project__graph-item">
        <p className="about-project__graph-text">1 неделя</p>
        <p className="about-project__graph-text">Back-end</p>
        </div>
        <div className="about-project__graph-item">
        <p className="about-project__graph-text about-project__graph-text_white">4 недели</p>
        <p className="about-project__graph-text">Front-end</p>
        </div>
      </div>
    </section>
  );

}
export default AboutProject;