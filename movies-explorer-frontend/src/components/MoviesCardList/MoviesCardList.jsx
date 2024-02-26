import React from 'react';
import { useMatch } from 'react-router-dom'
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {

  const routeMovies = useMatch("/movies");

  return (
    <section className="movies-card-list">
      {props.preloader ? <Preloader /> : props.apiError ? <p className="movies-card-list__text">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.</p> : 
      (routeMovies ? (props.noMatch ? <p className="movies-card-list__text">Ничего не найдено</p> : 
        <>{props.movies.length > 0 ? 
          props.movies.map((item, index) => {
          return (index<props.i) ? <MoviesCard key={item.id} movie={item} likeMovie={props.likeMovie} isLiked={props.isLiked}/> : null
        }): null}</>) : 
        (props.noMatchSavedMovies ? <p className="movies-card-list__text">Ничего не найдено</p> : 
        <>{props.savedMovies.map((item) => {
          return <MoviesCard key={item._id} movie={item} deleteMovie={props.deleteMovie}/>
        })}</>)
      )}
    </section> 
  );
}

export default MoviesCardList;