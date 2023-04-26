import { Navigate } from "react-router-dom";
import emailjs from '@emailjs/browser';
import { useRef, useState } from "react";
import Notificacion from "../Notificacion/Notificacion";

const Contacto = () =>{

    const form = useRef();
    const [redirect,setRedirect] = useState(false);
    const [noti] = useState({"title":"Consulta generada","icon":"success","confirmButtonColor":"#1BBFE9"})

    const enviarMail = (e)=>{
        e.preventDefault();
        emailjs.sendForm('service_amheutp','template_do1kvzo',form.current,'-jlRTkkhaaF8X6_lI').then(
            response=>(
                setRedirect(true)
            )
        ).catch(error=>(
            console.log(error)
        ));
    }
    return(
        <div>
            { redirect ?
                (<div>
                    <Navigate to='/' />
                    <Notificacion {...noti} />
                </div>) : (
                    <form ref={form} onSubmit={enviarMail}>
                    <label>Nombre y apellido: </label>
                    <input type={'text'} name="nombre"/>
                    <label>Número de teléfono: </label>
                    <input type={'number'} name="numero"/>
                    <label>Email: </label>
                    <input type={'email'} name="email"/>
                    <label>Consulta: </label>
                    <input type={'textarea'} name="consulta"/>
                    <button type="submit">Generar Consulta</button>
                </form>
                )

            }
        </div>
    )
}

export default Contacto;