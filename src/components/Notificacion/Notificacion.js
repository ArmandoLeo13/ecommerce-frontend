import Swal from 'sweetalert2';

const Notificacion = ({mensaje, title, icon, confirmButtonColor})=>{
    Swal.fire({
        title: title,
        text: mensaje,
        icon: icon,
        confirmButtonColor: confirmButtonColor
    })
}

export default Notificacion;
