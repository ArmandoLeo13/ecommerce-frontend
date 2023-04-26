import { UserContext } from '../../context/UserContext';
import Notificacion from '../Notificacion/Notificacion';
import { RegistroExitoso, UsuarioRegistrado, PasswordRegistro } from '../Notificacion/Partials/Partials';
import './Register.css';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ name, setName] = useState('');
  const [direccion, setDireccion] = useState('');
  const [avatar, setAvatar] = useState();
  const [edad, setEdad] = useState(0);
  const [telefono, setTelefono] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { RegisterFetch, loginFetch } = useContext(UserContext);
  const nav = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
        if(password===confirmPassword){
            const res = await RegisterFetch(email,password,name,direccion,edad,telefono,avatar);
            if(res===201){
                Notificacion(RegistroExitoso)
                await loginFetch(email,password);
                nav('/home')
            }else if(res===409){
                Notificacion(UsuarioRegistrado)
            }
        }else{
            Notificacion(PasswordRegistro)
        }
        
    }catch(error){
        console.log(error);
    }
    
  };

  return (
    <form className='register' onSubmit={handleSubmit}>
      <h2>Registro</h2>
    <div className='cajaRegistro'>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          minLength="4"
        required/>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength="8"
          required/>
        <label htmlFor="telefono">Telefono:</label>
        <input
          type="text"
          id="telefono"
          value={telefono}
          onChange={(event) => setTelefono(event.target.value)}
          minLength="4"
          required/>
        <label htmlFor="edad">Edad:</label>
        <input
          type="number"
          id="edad"
          value={edad}
          onChange={(event) => setEdad(event.target.value)}
          required/>
        </div>
        <div>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          minLength="2"
          required/>
        <label htmlFor="confirmPassword">Confirme Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          minLength="8"
          required />
        <label htmlFor="direccion">Direccion:</label>
        <input
          type="text"
          id="direccion"
          value={direccion}
          onChange={(event) => setDireccion(event.target.value)}
          minLength="5"
          required/>        
        <label htmlFor="avatar">Avatar:</label>
        <input
          type="file"
          id="avatar"
          onChange={(event) => setAvatar(event.target.files[0])}
        />
      </div>
      </div>
      <button type="submit">Registrar</button>
    </form>
  );
};

export default Register;
