import React from 'react';
import Navigation from '../Navigation/Navigation';
import { Link, useMatch } from 'react-router-dom';

function Header(props) {

  const routeMain = useMatch("/"); 
  
  return (
  
    <header className={routeMain ? "header header_main" : "header"}>
      <Link to="/" className="header__logo-link"></Link>
      {!routeMain ? 
      <>
        <Navigation />
        <Link to="/profile" className="header__profile-link">Аккаунт
          <div className="header__profile-icon"></div>
        </Link>
        <button className="header__menu-button" type="button" onClick={props.onClick}></button> 
      </> :
        <nav className="header__links">
          <Link to="/signup" className="header__register-link">Регистрация</Link>
          <Link to="/signin" className="header__login-link">Войти</Link>
        </nav>}
    </header>
  );
}

export default Header;