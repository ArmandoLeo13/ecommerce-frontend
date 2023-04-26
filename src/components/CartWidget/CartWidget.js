import './CartWidget.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

const CartWidget = () =>{
    const { getCantidad } = useContext(CartContext);

    const cantidad = getCantidad();

    return(
        <Link to='/cart'>
            <div className="cajaCar">
                <img src='../images/shopping-cart.png' alt="Cart"/>
                <h1>{cantidad}</h1>
            </div>
        </Link>
        
        
    )
};

export default CartWidget;