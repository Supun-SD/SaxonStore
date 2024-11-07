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
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/sign-in" element={<LogIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-info" element={<UpdateInfo />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/orders" element={<OrderManagement />} />
        <Route path="/admin/my-products" element={<ProductManagement />} />
      </Routes>
    </>
  );
}
