import React from 'react';
import { Link } from 'react-router-dom';

function Profile(props) {
  const [isButtonClick, setButtonClick] = React.useState(false);
  const [isDisabled, setDisabled] = React.useState(true);

  function handleClick() {
    setButtonClick(true);
    setDisabled(false);

  }

  function handleSubmitClick() {
    setButtonClick(false);
    setDisabled(true);
  }

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, user!</h1>
      <form className="profile__form">
        <div className="profile__field">
          <p className="profile__field-label">Имя</p>
          <input className="profile__field-label profile__input" type="text" name="name" title=" " minLength="2" maxLength="30" value="user" disabled={isDisabled} />
        </div>
        <div className="profile__field">
          <p className="profile__field-label">E-mail</p>
          <input className="profile__field-label profile__input" type="email" name="email" title=" " value="user@yandex.ru" disabled={isDisabled} />
        </div>
        {!isButtonClick ? <><button className="profile__button" type="button" onClick={handleClick}>Редактировать</button>
        <Link to="/signin" className="profile__link">Выйти из аккаунта</Link></> : 
        <><span className="profile__input-error"></span>
        <button className="profile__submit-button" type="submit" onClick={handleSubmitClick}>Сохранить</button></>}
      </form>
    </section>
  );

}
export default Profile;