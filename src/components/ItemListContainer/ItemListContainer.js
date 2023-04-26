import './ItemListContainer.css';
import { useState, useEffect, useContext } from 'react'
import ItemList from '../ItemList/ItemList'
import { getProductos } from '../../services/Integration/index.js';
import { UserContext } from "../../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import Notificacion from '../Notificacion/Notificacion';
import { SesionExpirada } from '../Notificacion/Partials/Partials';

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { isAuthenticated, setIsAuthenticated} = useContext(UserContext);
    const nav = useNavigate();

    if(!isAuthenticated){
        nav('/')
    }
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProductos();
                if(!response){
                    sessionStorage.clear()
                    Notificacion(SesionExpirada);
                    setIsAuthenticated(false)
                    
                }
                else{
                    setProducts(response);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchProducts();
    },[]);
     

    
    return(
        <div>
            {
                !isAuthenticated ? <Navigate to='/' /> : <div><h1 className="ItemH1">{greeting}</h1>
                { loading ?
                    (<div className='cajaLoading'>
                        <h2 className='loading'>Cargando productos...</h2>
                        <div className='spinner'></div>
                    </div>):
                    (<ItemList products={products} />)
                }</div>
            }
            
        </div>
    )
};

export default ItemListContainer;