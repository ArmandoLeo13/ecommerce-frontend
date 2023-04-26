import './Navbar.css';
import CartWidget from '../CartWidget/CartWidget';
import { NavLink, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';

const Navbar = () =>{

    const { getCantidad } = useContext(CartContext);

    const quan = getCantidad();

    const { isAuthenticated, logout, name } = useContext(UserContext);
    const nav = useNavigate();
    const [selectedOption, setSelectedOption] = useState('/home');

    if(!isAuthenticated){
        return null
    }

    const handleOptionChange = (event) => {
        const newOption = event.target.value;
        console.log(newOption);
        setSelectedOption(newOption);
        nav(newOption)
    }

    return(
        <nav className="Navbar">
            <NavLink to={'/home'}>
            <div>
                <img src="../images/logo2.png" alt="" height="30px" />
                
            </div>
            </NavLink>
            <p className='nombre'>{name}</p>
            <div className="Nav2">
                <select value={selectedOption} onChange={handleOptionChange}>
                    <option value='/home'>Todos los Productos</option>
                    <option value='/productos/vino'>Vinos</option>
                    <option value='/productos/cerveza'>Cervezas</option>
                    <option value='/productos/gaseosas'>Gaseosas</option>
                </select>
                <NavLink to={'/ordenes'}><button>Mis ordenes</button></NavLink>
                <NavLink to={'/quienes-somos'}><button>¿Quienes somos?</button></NavLink>
                <NavLink to={'/preguntas-frecuentes'}><button>Preguntas frecuentes</button></NavLink>
                <button onClick={logout}>Logout</button>
                { quan >0 ?
                    <CartWidget />
                    : null
                }
            </div>
        </nav>
    )
};

export default Navbar;


