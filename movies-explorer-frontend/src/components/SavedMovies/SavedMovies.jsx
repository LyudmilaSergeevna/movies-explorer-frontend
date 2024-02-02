import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {

  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList />
      <div className="saved-movies__devider"></div>
    </main>
  );
}

export default SavedMovies;