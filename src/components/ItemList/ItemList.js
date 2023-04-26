import Item from "../Item/Item";
import './ItemList.css'

const ItemList = ({products})=>{
    
    return(
        <div className="contenedor">
            {products.map(product =>(
                <Item key={product._id} product={product} />
            ))}   
        </div>
    )
};

export default ItemList;


