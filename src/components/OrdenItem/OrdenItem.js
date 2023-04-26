

const OrdenItem = ({ _id, userEmail, timestamp, productos, status }) => {
    

    return (
        <article className='CardCartItem'>
            <header className="HeaderCartItem">
                <h2 className="ItemHeaderCartItem">
                    ID Orden: {_id}
                </h2>
            </header>
            <section className='ContainerItemCartItem'>
                <p className="InfoCartItem">
                    Productos: <ul>{productos.map(p=>(<li>{p.name} x {p.cantidad}</li>))}</ul>
                </p>
            </section>           
            <footer className='ItemFooterCartItem'>
                 <p className="InfoCartItem">
                     Estado: {status}
                 </p>
            </footer>
        </article>
    )
}

export default OrdenItem