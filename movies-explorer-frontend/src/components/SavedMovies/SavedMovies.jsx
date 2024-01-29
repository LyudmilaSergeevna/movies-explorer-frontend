import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {

  return (
    <section className="saved-movies">
      <SearchForm />
      <FilterCheckbox />
      <MoviesCardList />
      <div className="saved-movies__devider"></div>
    </section>
  );
}

export default SavedMovies;