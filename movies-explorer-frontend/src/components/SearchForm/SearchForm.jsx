import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  const [movieRequest, setMovieRequest] = React.useState(props.inputText || '');
  const [error, setError] = React.useState('');
  const filter = localStorage.getItem('filter');

  function handleChangeMovieRequest(evt) {
    setMovieRequest(evt.target.value);
  }

  function handleFocusInput() {
    setError('');
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
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      <input className="search-form__input" type="text" name="request" title=" " required placeholder="Фильм" value={movieRequest || ''} onChange={handleChangeMovieRequest} onFocus={handleFocusInput}/>
      <span className="search-form__input-error">{error}</span>
      <button className="search-form__submit-button" type="submit"></button>
      <FilterCheckbox setFiltered={props.setFiltered} onFilterClick={props.onFilterClick} filter={props.filter}/>
    </form>
  );
}

export default SearchForm;