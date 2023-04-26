import { useState, createContext } from "react"

export const UserContext = createContext();

export const UserContextProvider = ({ children })=> {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [ token, setToken] = useState('')
    const [ name, setName] = useState('');
    const [ userMail, setUserMail ] = useState('')

    const loginFetch = async (email, password) => {
        try{
            const body = {email, password}
            const response = await fetch(`http://localhost:8080/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            if(response.ok){
                const data = await response.json();
                setName(data.name);
                setToken(data.token);
                setUserMail(data.email)
                sessionStorage.setItem('token',data.token)
                setIsAuthenticated(true);
                return 200
            }else if(response.status===401){
                return 401
            }else{
                return false
            }
        }catch(error){
            console.log(error)
        }
     }

     const RegisterFetch = async(email,password,name,direccion,edad,telefono,avatar) =>{
        const formData = new FormData();
        formData.append('email',email);
        formData.append('password', password);
        formData.append('name', name);
        formData.append('direccion', direccion);
        formData.append('edad', edad);
        formData.append('telefono', telefono);
        formData.append('avatar', avatar);
        
        const response = await fetch(`http://localhost:8080/auth/register`, {
                method: 'POST',
                body: formData
            });
        if(response.status===201){
            return 201
        }else if(response.status===409){
            return 409
        }
     }
     const logout = () => {
        setName('')
        setToken('')
        setIsAuthenticated(false)
        sessionStorage.clear()
     }
     
     return (
        <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated, token, name, loginFetch, logout, RegisterFetch, userMail, setUserMail}}>
            {children}
        </UserContext.Provider>
     );
};

