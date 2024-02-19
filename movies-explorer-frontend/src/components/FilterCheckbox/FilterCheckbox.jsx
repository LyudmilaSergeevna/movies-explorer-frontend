import React from 'react';
import { useMatch } from 'react-router-dom';

function FilterCheckbox(props) {

  const filter = localStorage.getItem('filter');
  const [isChecked, setChecked] = React.useState(0);
  const routeMovies = useMatch('/movies');

  React.useEffect(() => {
    setChecked(routeMovies ? filter : false)
  }, [])

  function handleClick() {
    if (isChecked) {
      setChecked(false)
      props.onFilterClick(false);
    } else {
      setChecked(true);
      props.onFilterClick(true);
    }
  }

  return (
    <div className="filter-checkbox">
      <button className={!isChecked ? "filter-checkbox__button" : "filter-checkbox__button filter-checkbox__button_active"} type="button" onClick={handleClick}></button>
      <p className="filter-checkbox__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;