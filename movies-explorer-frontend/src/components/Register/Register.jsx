import React from 'react';
import ContainerWithForm from '../ContainerWithForm/ContainerWithForm';

function Register(props) { 
  
  return (
  
    <main className="register">
      <ContainerWithForm title="Добро пожаловать!" register={true} buttonText="Зарегистрироваться"/>
    </main>
  );
}

export default Register;