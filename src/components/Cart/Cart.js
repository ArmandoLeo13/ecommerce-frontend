import { useContext } from "react"
import { CartContext } from '../../context/CartContext'
import CartItem from '../CartItem/CartItem'
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";
import Notificacion from "../Notificacion/Notificacion";
import { SesionExpirada, Error500 } from "../Notificacion/Partials/Partials";

const Cart = () => { 
    const { carrito, getCantidad, getTotal, limpiarCarrito, crearOrden, getCarrito } = useContext(CartContext);

    const totalQuantity = getCantidad()
    const total = getTotal()

    const { isAuthenticated, setIsAuthenticated, userMail } = useContext(UserContext);
    const nav = useNavigate();

    if(!isAuthenticated){
        nav('/')
    }

    if(totalQuantity === 0) {
        return (
            <Navigate to="/home"/>
        )
    }
    
    const removeItems = async (_id, token)=>{
        const res = await limpiarCarrito(_id, token);
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

    const comprar = async (id_carrito, token)=>{
        const res = await crearOrden(id_carrito, token);
        if(res===401){
            Notificacion(SesionExpirada)
            setIsAuthenticated(false)
            sessionStorage.clear()
        }else if(res===500){
            Notificacion(Error500)
            setIsAuthenticated(false)
            sessionStorage.clear()
        }else{
            await getCarrito(userMail, token)
            Notificacion({mensaje:`Se genero la orden ${res._id}`,title:'Orden enviada',icon:'success',confirmButtonColor:true});
            nav('/ordenes')
        }
    }

    return (     
        <div>
            {
                !isAuthenticated ? <Navigate to='/' /> : 
                <div>
                    <h1>Carrito</h1>
                    { carrito.productos.map(p => <CartItem key={p._id} {...p}/>) }
                    <h3>Total: ${total}</h3>
                    <button onClick={async()=>await removeItems(carrito._id,sessionStorage.getItem('token'))} style={{backgroundColor:"red"}}>Limpiar carrito</button>
                    <button onClick={async()=>await comprar(carrito._id,sessionStorage.getItem('token'))}>Comprar</button>
                </div>
            }
        </div>
    )
};

export default Cart;