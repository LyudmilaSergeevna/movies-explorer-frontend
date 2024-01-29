import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

  return (
    <section className="movie-card-list">
      <MoviesCard />
      <MoviesCard />
    </section>
  );
}

export default MoviesCardList;