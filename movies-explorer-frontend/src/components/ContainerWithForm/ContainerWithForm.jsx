import React from 'react';
import { Link } from 'react-router-dom';
//import { useFormWithValidation } from '../Validation/Validation';

function ContainerWithForm(props) { 

  return (
  
    <div className="container">
      <Link to="/" className="container__logo-link"></Link>
      <h1 className="container__title">{`${props.title}`}</h1>
      <form className="container__form" onSubmit={props.register ? props.onSubmitR : props.onSubmit} noValidate>
        <div className="container__inputs">
          {props.register ? 
          <>
            <p className="container__input-label">Имя</p>
            <input className="container__form-input" type="text" name="name" minLength="2" maxLength="30" required value={props.nameValueR || ''} placeholder="Имя" onChange={props.onChangeR}/>
            <span className="container__input-error">{props.error.name}</span>
          </> : <></>}
         <p className="container__input-label">E-mail</p>
          <input className="container__form-input" type="email" name="email" required value={props.register ? (props.emailValueR || '') : (props.emailValue || '')} placeholder="E-mail" onChange={props.register ? props.onChangeR : props.onChange}/>
          <span className="container__input-error">{props.error.email}</span>
          <p className="container__input-label">Пароль</p>
          <input className="container__form-input" type="password" name="password" required value={props.register ? (props.passwordValueR || '') : (props.passwordValue || '')} minLength="2" maxLength="30" placeholder="Пароль" onChange={props.register ? props.onChangeR : props.onChange}/>
          <span className="container__input-error">{props.error.password}</span>
        </div>
        <button className={props.isValid ? "container__submit-button" : "container__submit-button container__submit-button_disabled"} type="submit" disabled={props.isValid ? false : true}>{`${props.buttonText}`}</button>
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