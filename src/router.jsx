import { createBrowserRouter } from 'react-router';
import App from './App';
import RoutingError from './components/RoutingError/RoutingError';
import HomePage, { featuredProductsLoader } from './pages/HomePage/HomePage';
import StorePage, { allProductsLoader } from './pages/StorePage/StorePage';
import CartPage from './pages/CartPage/CartPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import StoreLayout from './layouts/StoreLayout/StoreLayout';
import CategoryWrapper, {
  categoryProductsLoader,
} from './components/CategoryWrapper/CategoryWrapper';
import ProductPage, {
  productDetailsLoader,
} from './pages/ProductPage/ProductPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RoutingError />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: featuredProductsLoader,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'store',
        element: <StoreLayout />,
        children: [
          { index: true, element: <StorePage />, loader: allProductsLoader },
          {
            path: ':category',
            element: <CategoryWrapper />,
            loader: categoryProductsLoader,
          },
        ],
      },
      {
        path: '/product/:productId',
        element: <ProductPage />,
        loader: productDetailsLoader,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
    ],
  },
]);

export default router;
