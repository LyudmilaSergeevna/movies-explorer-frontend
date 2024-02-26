import React from 'react';
import { useMatch } from 'react-router-dom';

function MoviesCard(props) {
  const routeSavedMovies = useMatch("/saved-movies");
  const hours = Math.trunc(props.movie.duration / 60);
  const minutes = props.movie.duration % 60;
  const isShort = (props.movie.duration < 60);

  function handleLikeClick() {
    props.likeMovie(props.movie)
  }

  function handleDeleteLikeClick() {
    props.deleteMovie(props.movie)

  }

  return (
    <article className="movies-card">
      <a className="movies-card__link" href={props.movie.trailerLink} target="_blank" rel="noreferrer">
        <img className="movies-card__image" src={!routeSavedMovies ? `https://api.nomoreparties.co${props.movie.image.url}` : props.movie.image} alt={`Изображение ${props.movie.nameRU}`}></img>
      </a>
      <h2 className="movies-card__title">{`${props.movie.nameRU}`}</h2>
      <p className="movies-card__duration">{!isShort ? `${hours}ч ${minutes}м` : `${props.movie.duration}м` }</p>
      <button className={routeSavedMovies ? "movies-card__delete-button" : (props.movie.liked===true ? "movies-card__like-button movies-card__like-button_active" : "movies-card__like-button")} type="button" onClick={routeSavedMovies ? handleDeleteLikeClick : handleLikeClick}></button>
    </article>
  );
}

export default MoviesCard;