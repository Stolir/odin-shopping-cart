import { createBrowserRouter } from "react-router";
import App from "./App";
import RoutingError from "./components/RoutingError/RoutingError";
import HomePage from "./pages/HomePage";
import StorePage from "./pages/StorePage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RoutingError />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'profile',
        element: <ProfilePage />
      },
      {
        path: 'store',
        element: <StorePage />
      },
      {
        path: 'cart',
        element: <CartPage />
      }
    ]
  }
])

export default router;