import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {

  return (
    <section className="movies">
      <SearchForm />
      <FilterCheckbox />
      <MoviesCardList />
      <button className="movies__more-button" type="button">Ещё</button>
    </section>
  );
}

export default Movies;