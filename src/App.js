import './App.css';
import Navbar from './components/Navbar/Navbar';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { CartContextProvider} from './context/CartContext';
import Cart from './components/Cart/Cart';
import Descripcion from './components/Descripcion/Descripcion';
import PreguntasFrecuentes from './components/PreguntasFrecuentes/PreguntasFrecuentes';
import Footer from './components/Footer/Footer';
import Auth from './components/Auth/Auth';
import { UserContextProvider } from './context/UserContext';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import Ordenes from './components/Orden/Ordenes';
import { WebSocketProvider } from './context/WebSocketContext';
import PreFooter from './components/PreFooter/PreFooter';

function App() {


  return (
    <div className="App">
      <UserContextProvider>
        <CartContextProvider>
          <WebSocketProvider>
            <BrowserRouter>
              <header>
                <Navbar />
              </header>
              <Routes>
                <Route path='/' element={<Auth />} />
                <Route path='/home' element={<ItemListContainer/>} />
                <Route path='/detail/:productId' element={<ItemDetailContainer />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/ordenes' element={<Ordenes />} />
                <Route path='/quienes-somos' element={<Descripcion />} />
                <Route path='/preguntas-frecuentes' element={<PreguntasFrecuentes />} />
                <Route path='/*' element={<Navigate to='/' />} />
              </Routes>
              <PreFooter />
              <Footer />
            </BrowserRouter>
          </WebSocketProvider>
        </CartContextProvider>
      </UserContextProvider>
    </div> 
  );
}

export default App;
