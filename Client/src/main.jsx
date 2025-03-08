import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AppState from "./Context/AppState.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetails from "./Components/product/ProductDetails.jsx";
import Navbar from "./Components/Navbar.jsx";
import SearchProduct from "./Components/product/SearchProduct.jsx";
import Register from "./Components/user/Register.jsx";
import Login from "./Components/user/Login.jsx";
import { ToastContainer } from "react-toastify";
import Profile from "./Components/user/Profile.jsx";
import Cart from "./Components/Cart.jsx";
import CheakOut from "./Components/CheakOut.jsx";
import OrderSummary from "./Components/user/OrderSummery.jsx";
import SendTransaction from "./Components/Crypto/SendTransaction.jsx";

import Crpt from "./Components/Crypto/Crpt.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./config.js";

const queryClient = new QueryClient();


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <App />
      </>
    ),
  },
  {
    path: "/product/:id",
    element: (
      <>
        <Navbar />
        <ProductDetails />
      </>
    ),
  },
  {
    path: "/product/search/:term",
    element: (
      <>
        <Navbar />
        <SearchProduct />
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <Navbar />
        <Register />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Login />
      </>
    ),
  },
  {
    path: "/profile",
    element: (
      <>
        <Navbar />
        <Profile />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        <Navbar />
        <Cart />
      </>
    ),
  },
  {
    path: "/address",
    element: (
      <>
        <Navbar />
        <CheakOut />
      </>
    ),
  },
  {
    path: "/order",
    element: (
      <>
        <Navbar />
        <OrderSummary />
      </>
    ),
  },
  {
    path: "/crypto",
    element: (
      <>
        <Navbar />
        <Crpt />
      </>
    ),
  },
  {
    path: "/send-transaction",
    element: (
      <>
        <Navbar />
        <SendTransaction />
      </>
    ),
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

createRoot(document.getElementById("root")).render(
<AppState>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}>
          <ToastContainer />
        </RouterProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </AppState>
);
