import React from 'react';

function Portfolio() {

  return (
    <section className="portfolio">
      <h3 className="portfolio__subtitle">Портфолио</h3>
      <a className="portfolio__link" href="https://lyudmilasergeevna.github.io/how-to-learn/" target="_blank" rel="noreferrer">Статичный сайт</a>
      <a className="portfolio__link" href=" https://lyudmilasergeevna.github.io/best-russian-travel/" target="_blank" rel="noreferrer">Адаптивный сайт</a>
      <a className="portfolio__link" href="https://mesto.lyudmila.nomoredomainsmonster.ru" target="_blank" rel="noreferrer">Одностраничное приложение</a>
    </section>
  );
}

export default Portfolio;