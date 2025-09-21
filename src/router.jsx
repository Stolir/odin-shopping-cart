import { createBrowserRouter } from 'react-router';
import App from './App';
import RoutingError from './components/RoutingError/RoutingError';
import HomePage, { allProductsLoader } from './pages/HomePage/HomePage';
import StorePage from './pages/StorePage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RoutingError />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: allProductsLoader,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'store',
        element: <StorePage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
    ],
  },
]);

export default router;
