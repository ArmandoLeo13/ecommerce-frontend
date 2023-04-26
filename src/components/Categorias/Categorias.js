import './Categorias.css'
import { Link } from 'react-router-dom';

const Categorias = ({greeting}) =>{
    return(
        <div>
            <h1 className="ItemH1">{greeting}</h1>
            <div className='cajaCategorias'>
                <Link to={'/category/cerveza'}>
                    <div className='categoria'>
                        <h2 className=''>Cervezas</h2>
                    </div>
                </Link>
                <Link to={'/category/vino'}>
                    <div className='categoria'>
                        <h2 className=''>Vinos</h2>
                    </div>
                </Link>
                <Link to={'/category/bna'}>
                    <div className='categoria'>
                        <h2 className=''>Bebidas no Alcoholicas</h2>
                    </div>
                </Link>
                
            </div>
        </div>
    )
};

export default Categorias;