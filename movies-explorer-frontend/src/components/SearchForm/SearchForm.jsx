import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {

  return (
    <form className="search-form">
      <input className="search-form__input" type="text" name="request" title=" " required placeholder="Фильм" value=''/>
      <button className="search-form__submit-button" type="submit"></button>
      <FilterCheckbox />
    </form>
  );
}

export default SearchForm;