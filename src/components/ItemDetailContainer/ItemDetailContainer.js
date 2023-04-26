import './ItemDetailContainer.css'
import { useState, useEffect, useContext } from 'react'
import ItemDetail from '../ItemDetail/ItemDetail'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { getProductoById } from '../../services/Integration/index.js'
import { UserContext } from "../../context/UserContext";
import Notificacion from '../Notificacion/Notificacion';
import { SesionExpirada } from '../Notificacion/Partials/Partials';

const ItemDetailContainer = ({ addItem }) => {
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true);

    const { productId } = useParams();

    const { isAuthenticated, setIsAuthenticated } = useContext(UserContext);
    const nav = useNavigate();

    if(!isAuthenticated){
        nav('/')
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProductoById(productId);
                if(!response){
                    sessionStorage.clear()
                    Notificacion(SesionExpirada);
                    setIsAuthenticated(false)
                }
                else{
                    setProduct(response);
                    setLoading(false);
                }
                
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchProducts();
    },[productId])

    return(
        <div>
            {
                !isAuthenticated ?
                <Navigate to='/' /> :
                <div className='ItemDetailContainer'>
                    {   loading ?
                    (<div className='cajaLoading'>
                        <h2 className='loading'>Cargando productos...</h2>
                        <div className='spinner'></div>
                    </div>):
                    <ItemDetail {...product} addItem={addItem}/>
                    }
                </div>
            } 
        </div>
    )
}

export default ItemDetailContainer;