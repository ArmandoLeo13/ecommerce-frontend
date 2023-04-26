import React, { useState } from 'react';
import Login from '../Login/Login';
import Register from '../Register/Register';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {isLogin ? <Login /> : <Register />}
      <button onClick={handleToggle}>
        {isLogin ? 'Crear una cuenta' : '¿Ya esta registrado?'}
      </button>
    </div>
  );
};

export default Auth;
