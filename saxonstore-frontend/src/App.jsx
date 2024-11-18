import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import ContactUs from "./pages/ContactUs";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import OrderConfirmation from "./pages/OrderConfirmation";
import Checkout from "./pages/Checkout";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import MyAccount from "./pages/MyAccount";
import ForgotPassword from "./pages/ForgotPassword";
import UpdateInfo from "./pages/UpdateInfo";
import AddProduct from "./pages/AddProduct";
import OrderManagement from "./pages/OrderManagement";
import ProductManagement from "./pages/ProductManagement";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />

        <Route
          path="/order-confirmation"
          element={
            <ProtectedRoute isAuthenticatedRequired={true}>
              <OrderConfirmation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute isAuthenticatedRequired={true}>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route path="/sign-in" element={<LogIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/my-account"
          element={
            <ProtectedRoute isAuthenticatedRequired={true}>
              <MyAccount />
            </ProtectedRoute>
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/update-info"
          element={
            <ProtectedRoute isAuthenticatedRequired={true}>
              <UpdateInfo />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-product"
          element={
            <ProtectedRoute requiredRole="ADMIN" isAuthenticatedRequired={true}>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute requiredRole="ADMIN" isAuthenticatedRequired={true}>
              <OrderManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/my-products"
          element={
            <ProtectedRoute requiredRole="ADMIN" isAuthenticatedRequired={true}>
              <ProductManagement />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
