import React from 'react';
import ContainerWithForm from '../ContainerWithForm/ContainerWithForm';
import {useNavigate} from 'react-router-dom';
import * as Auth from '../../utils/Auth';
import { useFormWithValidation } from '../Validation/Validation';

const Register = (props) => {

  const navigate = useNavigate();

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation()

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { name, email, password } = values;
    Auth.register(name, email, password)
    .then(() => {
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
      })
    })
    .catch((err) => {
      console.log(err);
      if (err.message === 'Ошибка 409') {
        alert('Пользователь с таким email уже зарегистрирован')
      }
      if (err.message === 'Ошибка 400') {
        alert('Введены некорректные данные')
      }
    })
  }
  
  return (
  
    <main className="register">
      <ContainerWithForm 
      title="Добро пожаловать!" 
      register={true} 
      onSubmitR={handleSubmit}
      onChangeR={handleChange}
      nameValueR={values.name}
      emailValueR={values.email}
      passwordValueR={values.password}
      error={errors}
      isValid={isValid}
      buttonText="Зарегистрироваться"/>
    </main>
  );
}

export default Register;