import { useContext, useState, useEffect } from "react"
import { CartContext } from '../../context/CartContext'
import OrdenItem from "../OrdenItem/OrdenItem";
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";
import Notificacion from "../Notificacion/Notificacion";
import { SesionExpirada } from "../Notificacion/Partials/Partials";

const Ordenes = () => { 
    const [msg, setMsg] = useState('')
    const { listarOrdenes, ordenes } = useContext(CartContext);

    const { isAuthenticated, setIsAuthenticated, userMail } = useContext(UserContext);
    const nav = useNavigate();

    if(!isAuthenticated){
        nav('/')
    }
    
    useEffect(() => {
        const fetchOrdenes = async () => {
            try {
                const response = await listarOrdenes(userMail, sessionStorage.getItem('token'));
                if(response===401){
                    sessionStorage.clear()
                    Notificacion(SesionExpirada);
                    setIsAuthenticated(false)
                    
                }
                else if(response===404){
                    setMsg('No hay ordenes generadas')
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchOrdenes();
    },[]);

    return (     
        <div>
            {
                !isAuthenticated ? <Navigate to='/' /> : 
                <div>
                    <h1>Ordenes</h1>
                    { ordenes.length > 0 ? 
                        <div>
                            {msg}
                            {ordenes.map(o => <OrdenItem key={o._id} {...o}/>)}
                        </div>
                        : <p>{msg}</p>
                    }
                </div>
            }
        </div>
    )
};

export default Ordenes;