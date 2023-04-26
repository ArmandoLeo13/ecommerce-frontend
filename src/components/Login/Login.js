import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { LoginIncorrecto } from '../Notificacion/Partials/Partials';
import Notificacion from '../Notificacion/Notificacion';
import { CartContext } from '../../context/CartContext';

const Login = () => {
    const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginFetch} = useContext(UserContext);
  const { getCarrito, carrito} = useContext(CartContext);

  const handleSubmit = async (event) => {
    event.preventDefault()
    try{
        const res = await loginFetch(email, password);
        if(res===200){
            await getCarrito(email, sessionStorage.getItem('token'));
            nav('/home')
        }else if(res===401){
          Notificacion(LoginIncorrecto)
        }
    }catch(error){
        console.log(error);
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button>Login</button>
    </form>
  );
};

export default Login;
