import './Navbar.css';
import CartWidget from '../CartWidget/CartWidget';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const Navbar = () =>{

    const { getCantidad } = useContext(CartContext);

    const quan = getCantidad();

    const { isAuthenticated, logout, name } = useContext(UserContext);

    if(!isAuthenticated){
        return null
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
                <NavLink to={'/home'}><button>Productos</button></NavLink>
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


