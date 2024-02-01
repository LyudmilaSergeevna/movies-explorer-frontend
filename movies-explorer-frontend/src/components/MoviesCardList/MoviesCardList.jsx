import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

  return (
    <section className="movies-card-list">
      <MoviesCard name="movie1"/>
      <MoviesCard name="movie2"/>
      <MoviesCard name="movie3"/>
      <MoviesCard name="movie4"/>
      <MoviesCard name="movie5"/>
    </section>
  );
}

export default MoviesCardList;