import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {

  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList />
      <button className="movies__more-button" type="button">Ещё</button>
    </main>
  );
}

export default Movies;