import React from 'react';
import photo from '../../images/photo.png';

function AboutMe() {

  return (
    <section className="about-me" id="about-me">
      <h2 className="main__subtitle">Студент</h2>
      <p className="main__title about-me__title">Мила</p>
      <p className="about-me__subtitle">Фронтенд-разработчик</p>
      <p className="main__text about-me__text">Я родилась и живу в Санкт-Петербурге, закончила факультет ПОВТиАС в СПбГУ им. М.А. Бонч-Бруевича. 
        Я люблю рисовать, читать и смотреть фильмы ужасов. Недавно начала кодить, надеюсь это маленькое хобби перерастет во что-то большее. Моя 
        следующая цель - изучить программирование анимации и перейти работать в геймдев.</p>
      <a className="about-me__git-link" href="https://github.com/LyudmilaSergeevna" target="_blank" rel="noreferrer">Github</a>
      <img className="about-me__photo" src={photo} alt="Фотография Студента"></img>
    </section>
  );
}

export default AboutMe;