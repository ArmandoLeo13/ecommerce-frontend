import './Descripcion.css'
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Descripcion = () =>{

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
                    <h2>¿Quienes Somos?</h2>
                    <p>
                        Somos los mejores distruibuidores de licores en Buenos Aires. Los mejores productos nacionales e importados. Vino, café, chocolates y mucho más. Delivery de Bebidas. Descuentos Semanales. Variedad de Etiquetas. Regalos Empresariales. Siempre al mejor al precio y la mejor calidad.
                    </p>
                </div>
            }
        </div>
        
    )
}

export default Descripcion;