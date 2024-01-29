import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation(props) {

  return (
    <nav className="navigation">
      <NavLink to="/movies" className={({isActive}) => `navigation__link ${isActive ? "navigation__link_active" : ""}`}>Фильмы</NavLink>
      <NavLink to="/saved-movies" className={({isActive}) => `navigation__link ${isActive ? "navigation__link_active" : ""}`}>Сохраненные фильмы</NavLink>
    </nav>
  );
}

export default Navigation;