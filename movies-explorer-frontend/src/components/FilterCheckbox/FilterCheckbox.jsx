import React from 'react';
import { useMatch } from 'react-router-dom';

function FilterCheckbox(props) {

  const filter = localStorage.getItem('filter');
  const [isChecked, setChecked] = React.useState(0);
  const [isCheckedSavedMovies, setCheckedSavedMovies] = React.useState(0);
  const routeMovies = useMatch('/movies');

  React.useEffect(() => {
    setChecked(routeMovies ? filter : false)
    setCheckedSavedMovies(false)
  }, [])

  function handleClick() {
    if (isChecked) {
      setChecked(false)
      props.setFiltered(false)
      props.handleSubmit(false)
    } else {
      setChecked(true);
      props.setFiltered(true)
      props.handleSubmit(true)
    }
  }

  function handleClickSavedMovies() {
    if (isCheckedSavedMovies) {
      setCheckedSavedMovies(false)
      props.setFilteredSavedM(false)
      props.handleSubmitSavedMovie(false)
    } else {
      setCheckedSavedMovies(true);
      props.setFilteredSavedM(true)
      props.handleSubmitSavedMovie(true)
    }
  }

  return (
    <div className="filter-checkbox">
      {routeMovies ?
      <button className={!isChecked ? "filter-checkbox__button" : "filter-checkbox__button filter-checkbox__button_active"} type="button" onClick={handleClick}></button> :
      <button className={!isCheckedSavedMovies ? "filter-checkbox__button" : "filter-checkbox__button filter-checkbox__button_active"} type="button" onClick={handleClickSavedMovies}></button>}
      <p className="filter-checkbox__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;