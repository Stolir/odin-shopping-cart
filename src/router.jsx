import { createBrowserRouter } from 'react-router';
import App from './App';
import RoutingError from './components/RoutingError/RoutingError';
import HomePage, { featuredProductsLoader } from './pages/HomePage/HomePage';
import StorePage, { allProductsLoader } from './pages/StorePage/StorePage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import StoreLayout from './layouts/StoreLayout/StoreLayout';
import ShowcaseSection from './components/ShowcaseSection/ShowcaseSection';
import CategoryWrapper from './components/CategoryWrapper/CategoryWrapper';

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
          { path: ':category', element: <CategoryWrapper /> },
        ],
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
    ],
  },
]);

export default router;
