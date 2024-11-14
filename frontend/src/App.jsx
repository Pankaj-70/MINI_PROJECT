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
function App() {
  return (
    <>
      <div className="h-screen w-full bg-gray-700 text-white gap-12">
        <Router>
          <ScrollToTop></ScrollToTop>
          <Navbar />
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
        </Router>
        <Footer />
      </div>
    </>
  );
}

export default App;
