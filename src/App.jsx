import { Outlet } from 'react-router';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import CartProvider from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Navbar />
      <Outlet />
    </CartProvider>
  );
}

export default App;
