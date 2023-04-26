import '../Descripcion/Descripcion.css'
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';


const PreguntasFrecuentes = () =>{
    const { isAuthenticated } = useContext(UserContext);
    const nav = useNavigate();

    if(!isAuthenticated){
        nav('/')
    }
    return(
        <div>
            {
                !isAuthenticated ? <Navigate to='/' /> :
                <div className="cajaTexto">
                    <h2>¿QUÉ DEBO HACER PARA REALIZAR UNA COMPRA EN LA TIENDA?</h2>
                    <p>Para comprar en la tienda debe acceder a nuestro catálogo on line desde las diferentes vías de compra y añadirlo a su carrito. Llenar el formulario y generar la orden de compra.</p>
                    <h2>¿QUÉ FORMAS DE PAGO PUEDO UTILIZAR PARA REALIZAR UNA COMPRA?</h2>
                    <p>En nuestra tienda puede comprar utilizando cualquier tarjeta, transferencia bancaria, mercadopago o en efectivo en la entrega.</p>
                    <h2>¿EN CUÁNTO TIEMPO RECIBIRÉ MI PEDIDO?</h2>
                    <p>El tiempo de entrega del pedido dependerá de su localización. Normalmente se entregan el mismo dia o al dia siguiente</p>
                </div>
            }
        </div>
        
    )
}

export default PreguntasFrecuentes;