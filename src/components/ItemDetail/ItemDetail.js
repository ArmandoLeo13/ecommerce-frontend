import './ItemDetail.css';
import ItemCount from '../ItemCount/ItemCount';
import { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom'
import Notificacion from '../Notificacion/Notificacion';
import { SesionExpirada, Error500 } from '../Notificacion/Partials/Partials';
import { UserContext } from '../../context/UserContext';

const ItemDetail = ({ _id, category, description, picture, name, price, stock }) => {

    const [cantidad, setCantidad] = useState(0);

    const { aggItem, carrito} = useContext(CartContext)

    const { setIsAuthenticated } = useContext(UserContext)

    const handleOnAdd = async(cantidad) => {
        const newproduct = {
            _id,
            name,
            description,
            cantidad
        }
        const res = await aggItem(carrito._id,newproduct,sessionStorage.getItem('token'))
        if(res===401){
            Notificacion(SesionExpirada)
            setIsAuthenticated(false)
            sessionStorage.clear()
        }else if(res===500){
            Notificacion(Error500)
            setIsAuthenticated(false)
            sessionStorage.clear()
        }
        setCantidad(cantidad)
    }

    return (
        <article className="CardItem">
            <header className="Header">
                <h2 className="ItemHeader">
                    {name}
                </h2>
            </header>
            <picture>
                <img src={picture} alt={name} className="ItemImg"/>
            </picture>
            <section>
                <p className="Info">
                    Descripción: {description}
                </p>
                <p className="Info">
                    Precio: {price}
                </p>
            </section>           
            <footer>
                { cantidad > 0 
                    ? <div>
                        <button><Link to='/cart'>Finalizar compra</Link></button>
                        <button><Link to='/home'>Seguir comprando</Link></button>
                        </div>
                    : <ItemCount stock={stock} onAdd={handleOnAdd} />
                }
            </footer>
        </article>
    )
}

export default ItemDetail;