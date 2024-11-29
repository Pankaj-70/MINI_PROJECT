import ScrollToTop from "./components/ScrollToTop";
import Home from "./screens/Home";
import Special from "./screens/Special";
import Contact from "./screens/Contact";
import About from "./screens/About";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Footer from "./components/Footer";
import ForgotPassword from "./screens/ForgotPassword";
import Register from "./screens/Register";
import Profile from "./screens/Profile";
import Orders from "./screens/Orders";
import Wishlist from "./screens/WishList";
import Settings from "./screens/Settings";
import PaymentMethods from "./screens/PaymentMethods";
import Notifications from "./screens/Notifications";
import Support from "./screens/Support";
import CheckoutForm from "./screens/CheckOutForm";
import CartPage from "./screens/CartPage";
import { useEffect } from "react";
import { fetchAllProducts } from "./redux/slices/productSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, logout } from "./redux/slices/userSlice";
import { getCart, setLoading } from "./redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/v1/user/getuser");
        if (response.data.success) {
          const userId = response.data.data._id;
          dispatch(login({ userId }));
          if (userId) {
            dispatch(getCart(userId));
          }
        } else {
          dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-700 text-white">
        <Router>
          <ScrollToTop />
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/special" element={<Special />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot_password" element={<ForgotPassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/payment-methods" element={<PaymentMethods />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/support" element={<Support />} />
              <Route path="/checkout" element={<CheckoutForm />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </main>
        </Router>
        <Footer />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
