import React from 'react';
import photo from '../../images/photo.png';
import Subtitle from '../Subtitle/Subtitle';

function AboutMe() {

  return (
    <section className="about-me" id="about-me">
      <Subtitle text="Студент"/>
      <div className="about-me__columns">
        <div className="about-me__info">
          <h1 className="about-me__title">Мила</h1>
          <p className="about-me__subtitle">Фронтенд-разработчик</p>
          <p className="about-me__text">Я родилась и живу в Санкт-Петербурге, закончила факультет ПОВТиАС в СПбГУ им. М.А. Бонч-Бруевича. 
            Я люблю рисовать, читать и смотреть фильмы ужасов. Недавно начала кодить, надеюсь это маленькое хобби перерастет во что-то большее. Моя 
            следующая цель - изучить программирование анимации и перейти работать в геймдев.</p>
          <a className="about-me__git-link" href="https://github.com/LyudmilaSergeevna" target="_blank" rel="noreferrer">Github</a>
        </div>
        <img className="about-me__photo" src={photo} alt="Фотография Студента"></img>
      </div>
    </section>
  );
}

export default AboutMe;