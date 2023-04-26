export async function getProductos() {
    const token = sessionStorage.getItem('token');
    try{
        const response = await fetch('http://localhost:8080/api/productos', {
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
    }
    }catch(error){
        console.log(error.status);
    }
 }

 export async function getProductoById(_id) {
  const token = sessionStorage.getItem('token');
    try{
        const response = await fetch(`http://localhost:8080/api/productos/${_id}`, {
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
    }
    }catch(error){
        console.log(error);
    }
 }