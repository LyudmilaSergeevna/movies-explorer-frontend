import React from 'react';
import ContainerWithForm from '../ContainerWithForm/ContainerWithForm';
import {useNavigate} from 'react-router-dom';
import * as Auth from '../../utils/Auth';
import { useFormWithValidation } from '../Validation/Validation';

const Register = (props) => {

  const navigate = useNavigate();

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation()

  //.log(isValid)
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { name, email, password } = values;
    Auth.register(name, email, password)
    .then(() => {
      Auth.login(email, password)
      .then(() => {
        resetForm()
        navigate('/movies', {replace: true});
      })
      .catch((err) => {
        console.log(err);
      })
      //props.status(true);
      //props.onInfoTooltip();
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'Error') {
        alert('Пользователь с таким email уже зарегистрирован')
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