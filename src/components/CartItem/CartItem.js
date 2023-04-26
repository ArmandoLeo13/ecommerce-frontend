import './CartItem.css'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { UserContext } from '../../context/UserContext'
import Notificacion from '../Notificacion/Notificacion'
import { SesionExpirada, Error500 } from '../Notificacion/Partials/Partials'


const CartItem = ({ _id, name, cantidad, priceU, priceT }) => {
    const { eliminarItem, carrito } = useContext(CartContext)

    const { setIsAuthenticated } = useContext(UserContext)

    const handleRemove = async(_id, id_prod, token) => {
        const res = await eliminarItem(_id, id_prod, token);
        if(res===401){
            Notificacion(SesionExpirada)
            setIsAuthenticated(false)
            sessionStorage.clear()
        }else if(res===500){
            Notificacion(Error500)
            setIsAuthenticated(false)
            sessionStorage.clear()
        }
    }

    return (
        <article className='CardCartItem'>
            <header className="HeaderCartItem">
                <h2 className="ItemHeaderCartItem">
                    {name}
                </h2>
            </header>
            <section className='ContainerItemCartItem'>
                <p className="InfoCartItem">
                    Cantidad: {cantidad}
                </p>
                <p className="InfoCartItem">
                    Precio x Unidad: ${priceU}
                </p>
            </section>           
            <footer className='ItemFooterCartItem'>
                 <p className="InfoCartItem">
                     Subtotal: ${priceT}
                 </p>
                 <button className='ButtonCartItem' onClick={() => handleRemove(carrito._id, _id, sessionStorage.getItem('token'))}>X</button>
            </footer>
        </article>
    )
}

export default CartItem