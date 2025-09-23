import { Outlet } from 'react-router';
import './App.css';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <CartProvider>
      <Navbar />
      <Outlet />
    </CartProvider>
  );
}

export default App;
