import React from 'react';
import ContainerWithForm from '../ContainerWithForm/ContainerWithForm';

function Login(props) { 
  
  return (
  
    <main className="login">
      <ContainerWithForm title="Рады видеть!" buttonText="Войти"/>
    </main>
  );
}

export default Login;