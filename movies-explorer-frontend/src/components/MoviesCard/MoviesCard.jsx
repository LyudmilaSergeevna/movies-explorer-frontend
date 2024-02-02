import React from 'react';
import photo from '../../images/movieImage.png';


function MoviesCard(props) {

  const [isChecked, setChecked] = React.useState(false);

  function handleClick() {
    if (isChecked) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  }

  return (
    <article className="movies-card">
      <img className="movies-card__image" src={photo} alt={`Изображение ${props.name}`}></img>
      <h2 className="movies-card__title">33 слова о дизайне</h2>
      <p className="movies-card__duration">1ч 47м</p>
      <button className={isChecked ? "movies-card__like-button movies-card__like-button_active" : "movies-card__like-button"} type="button" onClick={handleClick}></button>
    </article>
  );
}

export default MoviesCard;