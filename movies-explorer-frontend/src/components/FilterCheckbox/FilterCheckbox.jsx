import React from 'react';

function FilterCheckbox(props) {

  const [isChecked, setChecked] = React.useState(false);

  function handleClick() {
    if (isChecked) {
      setChecked(false);
    } else {
    setChecked(true);
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