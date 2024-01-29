import React from 'react';
import { Link } from 'react-router-dom';

function ContainerWithForm(props) { 
  
  return (
  
    <div className="container">
      <Link to="/" className="container__logo-link"></Link>
      <h1 className="container__title">{`${props.title}`}</h1>
      <form className="container__form">
        <div className="container__inputs">
          {props.register ? 
          <>
            <p className="container__input-label">Имя</p>
            <input className="container__form-input" type="text" name="name" minLength="2" maxLength="30" required value=""/>
          </> : <></>}
          <p className="container__input-label">E-mail</p>
          <input className="container__form-input" type="email" name="email" required value="" />
          <p className="container__input-label">Пароль</p>
          <input className="container__form-input" type="password" name="password" required value="" />
          <span className="profile__input-error container__input-error"></span>
        </div>
        
        <button className="container__submit-button">{`${props.buttonText}`}</button>
      </form>
      <div className="container__links">
        {props.register ? 
        <>
          <p className="container__text">Уже зарегистрированы?</p>
          <Link to="/signin" className="container__link">Войти</Link></> :
        <>
          <p className="container__text">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="container__link">Регистрация</Link></>}
      </div>  
    </div>
  );
}

export default ContainerWithForm;