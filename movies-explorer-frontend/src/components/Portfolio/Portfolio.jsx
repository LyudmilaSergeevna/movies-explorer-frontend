import React from 'react';

function Portfolio() {

  return (
    <section className="portfolio">
      <h3 className="portfolio__subtitle">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__list-item"><a className="portfolio__link" href="https://lyudmilasergeevna.github.io/how-to-learn/" target="_blank" rel="noreferrer">Статичный сайт</a></li>
        <li className="portfolio__list-item"><a className="portfolio__link" href=" https://lyudmilasergeevna.github.io/best-russian-travel/" target="_blank" rel="noreferrer">Адаптивный сайт</a></li>
        <li className="portfolio__list-item"><a className="portfolio__link" href="https://mesto.lyudmila.nomoredomainsmonster.ru" target="_blank" rel="noreferrer">Одностраничное приложение</a></li>
      </ul>
    </section>
  );
}

export default Portfolio;