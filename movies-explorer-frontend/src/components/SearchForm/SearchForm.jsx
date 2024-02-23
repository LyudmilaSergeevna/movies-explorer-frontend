import React from 'react';
import {useMatch} from 'react-router-dom'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  const [movieRequest, setMovieRequest] = React.useState(props.inputText || '');
  const [savedMovieRequest, setSavedMovieRequest] = React.useState('');
  const [error, setError] = React.useState('');
  const [errorSavedMovies, setErrorSavedMovies] = React.useState('');
  const filter = localStorage.getItem('filter');
  const routeSavedMovies = useMatch("/saved-movies");

  function handleChangeMovieRequest(evt) {
    setMovieRequest(evt.target.value);
  }
  function handleChangeSavedMovieRequest(evt) {
    setSavedMovieRequest(evt.target.value);
  }

  function handleFocusInput() {
    setError('');
  }

  function handleFocusInputSavedMovies() {
    setErrorSavedMovies('');
  }

  function handleSubmitSavedMovie(evt) {
    evt.preventDefault();
      if (savedMovieRequest === '') {
        setError('Нужно ввести ключевое слово');
    } else {
      props.onSearchSubmit(savedMovieRequest, true)
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (movieRequest === '') {
      setError('Нужно ввести ключевое слово');
    } else {
    props.onSearchSubmit(movieRequest, filter);
    }
  }


  return (
    <form className="search-form" onSubmit={routeSavedMovies ? handleSubmitSavedMovie : handleSubmit} noValidate>
      {routeSavedMovies ? 
      <>
        <input className="search-form__input" type="text" name="request" title=" " required placeholder="Фильм" value={savedMovieRequest ||''} onChange={handleChangeSavedMovieRequest} onFocus={handleFocusInputSavedMovies}/>
        <span className="search-form__input-error">{errorSavedMovies}</span>
        <button className="search-form__submit-button" type="submit"></button>
        <FilterCheckbox setFilteredSavedM={props.setFilteredSavedM} onFilterClick={props.onFilterClick} />
      </> : <>
        <input className="search-form__input" type="text" name="request" title=" " required placeholder="Фильм" value={movieRequest || ''} onChange={handleChangeMovieRequest} onFocus={handleFocusInput}/>
        <span className="search-form__input-error">{error}</span>
        <button className="search-form__submit-button" type="submit"></button>
        <FilterCheckbox setFiltered={props.setFiltered} onFilterClick={props.onFilterClick} />
      </>}
    </form>
  );
}

export default SearchForm;