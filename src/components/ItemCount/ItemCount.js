import './ItemCount.css';
import {useState} from 'react';

const ItemCount = ({stock, initial=1, onAdd}) =>{
    const [count, setCount] = useState(initial);

    const decrement = ()=>{
        if(count>1){
            setCount(count-1)
        }
        
    }

    const increment = ()=>{
        if(stock>count){
            setCount(count+1)
        }
    }

    return(
        <div>
            <div className='Contador'>
                <button onClick={decrement}>-</button>
                <h1>{count}</h1>
                <button onClick={increment}>+</button>
            </div>
            <div className='Contador'>
                <button onClick={() => onAdd(count)}>Agregar al carrito</button>
            </div>
            
        </div>
    )
};

export default ItemCount;
