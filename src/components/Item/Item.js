import './Item.css';
import { Link } from 'react-router-dom'

const Item = ({product}) => {
    
    return(
        <div className="card">
            <div className="imgCard">
                <img src={product.picture} alt={product.name}/>
            </div>
            { product.stock===2 ? (<p className='stockFinal'>Últimas 2 unidades!!</p>) : null}
            { product.stock===1 ? (<p className='stockFinal'>Última unidad!! No lo dejes pasar!!</p>) : null}
            <div className= "contenidoCard">

            <h2>{product.name}</h2> 
            
            { product.stock===0 ? (<p className='sinStock'>Sin stock</p>) :
                (<Link to={`/detail/${product._id}`} className='button'>Ver detalle</Link>)
            }
            </div>
        </div>
    )
};

export default Item;