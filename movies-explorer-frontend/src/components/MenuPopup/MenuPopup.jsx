import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileButton from '../ProfileButton/ProfileButton';

function MenuPopup(props) {
  
  return (
  
    <div className={props.isOpen ? "menu-popup menu-popup_opened" : "menu-popup"}>
      <div className="menu-popup__container">
        <button className="menu-popup__close-button" type="button" onClick={props.onClose}></button>
        <nav className="menu-popup__links"> 
          <NavLink to="/" className={({isActive}) => `menu-popup__link ${isActive ? "menu-popup__link_active" : ""}`} onClick={props.onClose}>Главная</NavLink>
          <NavLink to="/movies" className={({isActive}) => `menu-popup__link ${isActive ? "menu-popup__link_active" : ""}`} onClick={props.onClose}>Фильмы</NavLink>
          <NavLink to="/saved-movies" className={({isActive}) => `menu-popup__link ${isActive ? "menu-popup__link_active" : ""}`} onClick={props.onClose}>Сохранённые фильмы</NavLink>
        </nav>
        <div className="menu-popup__profile-button">
          <ProfileButton onClick={props.onClose} />
        </div>
      </div>
    </div>
  );
}

export default MenuPopup;