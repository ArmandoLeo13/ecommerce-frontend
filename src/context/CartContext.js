import { useState, createContext } from "react"

export const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
    const [carrito, setCarrito] = useState({});
    const [ ordenes, setOrdenes ] = useState([]);

    const getCarrito = async(userEmail, token) =>{
        try{
            const res = await fetch(`http://localhost:8080/api/carrito/${userEmail}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if(res.ok){
                const data = await res.json();
                setCarrito(data)
            }
            else if(res.status===404){
                const body = { userEmail};
                const response = await fetch(`http://localhost:8080/api/carrito`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(body)
                });
                const data = await response.json();
                setCarrito(data)
            }
        }catch(error){
            console.log(error);
        }
    }

    const aggItem = async (_id, newproduct, token) =>{
        try{
            const res = await fetch(`http://localhost:8080/api/carrito/${_id}/productos`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newproduct)
            });
            if(res.ok){
                const data = await res.json();
                setCarrito(data)
            }else if(res.status===401){
                return 401
            }else if(res.status===500){
                return 500
            }
            
        }catch(error){
            console.log(error);
        }
    } 
    const getCantidad = ()=> {
        let accu = 0;
        if (carrito.productos && carrito.productos.length > 0) {
          carrito.productos.forEach((product) => {
            accu = accu + product.cantidad;
          });
        }
        return accu;
      }
      const getTotal = ()=> {
        let accu = 0;
        if (carrito.productos && carrito.productos.length > 0) {
          carrito.productos.forEach((product) => {
            accu = accu + product.priceT;
          });
        }
        return accu;
      }
      const limpiarCarrito = async(_id, token)=> {
        try{
            const res = await fetch(`http://localhost:8080/api/carrito/${_id}/productos`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if(res.ok){
                const data = await res.json();
                setCarrito(data)
            }else if(res.status===401){
                return 401
            }else if(res.status===500){
                return 500
            }
        }catch(error){
            console.log(error);
        }
      }
      const eliminarItem = async(_id, id_prod, token)=> {
        try{
            const res = await fetch(`http://localhost:8080/api/carrito/${_id}/productos/${id_prod}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if(res.ok){
                const data = await res.json();
                setCarrito(data)
            }else if(res.status===401){
                return 401
            }else if(res.status===500){
                return 500
            }
        }catch(error){
            console.log(error);
        }
      }
      const crearOrden = async(id_carrito, token)=> {
        try{
            const body = { id_carrito }
            const res = await fetch(`http://localhost:8080/api/orden/`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });
            if(res.status===201){
                const data = await res.json();
                setOrdenes(data)
                return data
            }else if(res.status===401){
                return 401
            }else if(res.status===500){
                return 500
            }
        }catch(error){
            console.log(error);
        }
      }
      const listarOrdenes = async(userMail, token)=> {
        try{
            const res = await fetch(`http://localhost:8080/api/orden/${userMail}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if(res.ok){
                const data = await res.json();
                setOrdenes(data)
            }else if(res.status===401){
                return 401
            }else if(res.status===404){
                setOrdenes([])
                return 404
            }
        }catch(error){
            console.log(error);
        }
      }
    return (
        <CartContext.Provider value={{ carrito, setCarrito, getCarrito, aggItem, getCantidad, getTotal, limpiarCarrito, eliminarItem, crearOrden, listarOrdenes, ordenes}}>
            {children}
        </CartContext.Provider> 
    )
}