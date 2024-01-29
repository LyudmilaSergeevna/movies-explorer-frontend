import React from 'react';
import ContainerWithForm from '../ContainerWithForm/ContainerWithForm';

function Login(props) { 
  
  return (
  
    <section className="login">
      <ContainerWithForm title="Рады видеть!" buttonText="Войти"/>
    </section>
  );
}

export default Login;