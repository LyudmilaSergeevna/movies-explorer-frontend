import React from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../Validation/Validation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {
  const [isButtonClick, setButtonClick] = React.useState(false);
  const [isDisabled, setDisabled] = React.useState(true);
  const [disabledSubmitButton, setDisabledSubmitButton] = React.useState(true);
  const { values, handleChange, errors, isValid, resetForm, isChange } = useFormWithValidation()
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  },[currentUser]); 

  React.useEffect(() => {
    if (isChange) {
      if (isValid) {
          setDisabledSubmitButton(false)
        } else {
          setDisabledSubmitButton(true)
        }
    }
  }, [isChange, isValid])

  function handleClick() {
    setButtonClick(true);
    setDisabled(false);
  }

  function handleSubmit(evt) {
    let i=0
      evt.preventDefault();
      if (values.name) {
        if (isValid) {
          if (values.name !== currentUser.name) {
            props.onUpdateUser({
              name: values.name || name,
              email: values.email || email
            })
            currentUser.name = values.name
            setName(currentUser.name);
          } else {
            setButtonClick(false);
            setDisabled(true);
            setDisabledSubmitButton(true);
            resetForm();
            alert('Введите измененные данные')
            return i=i++
          }
        } 
        setButtonClick(false);
        setDisabled(true);
        setDisabledSubmitButton(true);
        resetForm();
        return i=0
      }
      if (values.email) {
        if (isValid) {
          if (values.email !== currentUser.email) {
            props.onUpdateUser({ 
              name: values.name || name,
              email: values.email || email
            })
            currentUser.email = values.email
            setEmail(currentUser.email);
          } else {
            setButtonClick(false);
            setDisabled(true);
            setDisabledSubmitButton(true);
            resetForm();
            if (i===0) {
            alert('Введите измененные данные')
            }
            }
        } 
        setButtonClick(false);
        setDisabled(true);
        setDisabledSubmitButton(true);
        resetForm();
       return i=0
      }
  }

  function handleLogoutClick() {
    props.logout()
    localStorage.removeItem('movies')

  }

  
  return (
    <main className="profile">
      <h1 className="profile__title">{`Привет, ${name}`}</h1>
      <form className="profile__form" onSubmit={handleSubmit} noValidate>
        <div className="profile__field">
          <p className="profile__field-label">Имя</p>
          <input className="profile__field-label profile__input" type="text" name="name" title=" " minLength="2" maxLength="30" value={values.name || name} disabled={isDisabled} placeholder="Имя" onChange={handleChange}/>
        </div>
        <div className="profile__field">
          <p className="profile__field-label">E-mail</p>
          <input className="profile__field-label profile__input" type="email" name="email" title=" " value={values.email || email} disabled={isDisabled} placeholder="E-mail" onChange={handleChange}/>
        </div>
        {!isButtonClick ? <><button className="profile__button" type="button" onClick={handleClick}>Редактировать</button>
        <Link to="/" className="profile__link" onClick={handleLogoutClick} >Выйти из аккаунта</Link></> : 
        <><span className="profile__input-error">{errors.name}</span>
        <button className={!disabledSubmitButton ? "profile__submit-button" : "profile__submit-button profile__submit-button_disabled"} type="submit" disabled={disabledSubmitButton}>Сохранить</button></>}
      </form>
    </main>
  );

}
export default Profile;