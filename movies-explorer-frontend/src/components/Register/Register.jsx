import React from 'react';
import ContainerWithForm from '../ContainerWithForm/ContainerWithForm';

function Register(props) { 
  
  return (
  
    <section className="register">
      <ContainerWithForm title="Добро пожаловать!" register={true} buttonText="Зарегистрироваться"/>
    </section>
  );
}

export default Register;