export async function getProductos() {
    const token = sessionStorage.getItem('token');
    try{
        const response = await fetch('http://localhost:8080/productos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if(response.ok){
      const data = await response.json();
      return data
    }else if(response.status===401){
      return false
    }else if(response.status===404){
      return 404
    }
    }catch(error){
        console.log(error.status);
    }
 }

 export async function getProductoById(_id) {
  const token = sessionStorage.getItem('token');
    try{
        const response = await fetch(`http://localhost:8080/productos/${_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if(response.ok){
      const data = await response.json();
      return data
    }else if(response.status===401){
      return false
    }else if(response.status===404){
      return 404
    }
    }catch(error){
        console.log(error);
    }
 }

 export async function getProductoByCategoria(categoria) {
  const token = sessionStorage.getItem('token');
    try{
        const response = await fetch(`http://localhost:8080/productos/categoria/${categoria}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if(response.ok){
      const data = await response.json();
      return data
    }else if(response.status===401){
      return false
    }else if(response.status===404){
      return 404
    }
    }catch(error){
        console.log(error);
    }
 }