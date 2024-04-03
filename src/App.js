import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SignUpPage from "./pages/SignUpPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import Protected from "./Auth/components/Protected";

import { SelectLoggedInUser } from "./Auth/AuthSlice";
import { fetchItemsByUserIdAsync } from "./Feature/Cart/CartSlice";
import ErrorPage from "./pages/404Page";
import { fetchLoggedInUserDataAsync } from "./Feature/Users/UserSlice";
import Logout from "./Auth/components/Logut";
import AdminHomePage from "./pages/Admin/AdminHomePage";
import AdminNewProductPage from "./pages/Admin/AdminNewProductPage";
import AdminEditProductPage from "./pages/Admin/AdminEditProductPage";
import AdminProductDetailPage from "./pages/Admin/AdminProductDetailPage";
import AdminOrdersPage from "./pages/Admin/AdminOrdersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckoutPage />
      </Protected>
    ),
  },
  {
    path: "/products/:id",
    element: (
      <Protected>
        <ProductDetailPage />
      </Protected>
    ),
  },
  {
    path: "/ordersuccess/:id",
    element: (
      <Protected>
        <OrderSuccessPage />
      </Protected>
    ),
  },
  {
    path: "/orders",
    element: (
      <Protected>
        <UserOrdersPage />
      </Protected>
    ),
  },
  {
    path: "/user",
    element: (
      <Protected>
        <UserProfilePage />
      </Protected>
    ),
  },

  // <-- Admin Routes -->
  {
    path: "/admin",
    element: (
      <Protected>
        <AdminHomePage />
      </Protected>
    ),
  },
  {
    path: "/admin/newproduct",
    element: (
      <Protected>
        <AdminNewProductPage />
      </Protected>
    ),
  },
  {
    path: "/admin/editproduct/:id",
    element: (
      <Protected>
        <AdminEditProductPage />
      </Protected>
    ),
  },
  {
    path: "/admin/product/:id",
    element: (
      <Protected>
        <AdminProductDetailPage />
      </Protected>
    ),
  },
  {
    path: "/admin/order",
    element: (
      <Protected>
        <AdminOrdersPage />
      </Protected>
    ),
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(SelectLoggedInUser);
  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserDataAsync(user.id));
    }
  }, [dispatch, user]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
