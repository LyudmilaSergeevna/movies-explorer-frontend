import React from 'react';
import ContainerWithForm from '../ContainerWithForm/ContainerWithForm';
import {useNavigate} from 'react-router-dom';
import * as Auth from '../../utils/Auth';
import { useFormWithValidation } from '../Validation/Validation';

const Login = (props) => {

  const navigate = useNavigate();

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation()

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = values;
    Auth.login(email, password)
      .then((data) => {
        if (data.token){
          props.tokenCheck();
          resetForm();
          props.handleLogin();
          navigate("/movies", {replace: true});
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.name === 'TypeError') {
          alert('Неправильный email или пароль')
        }
      })
  }
  
  return (
    <main className="login">
      <ContainerWithForm title="Рады видеть!"
      onSubmit={handleSubmit}
      onChange={handleChange}
      emailValue={values.email}
      passwordValue={values.password}
      error={errors}
      isValid={isValid}
      buttonText="Войти"/>
    </main>
  );
}

export default Login;