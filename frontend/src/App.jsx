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
function App() {
  return (
    <>
      <div className="h-screen w-full bg-gray-700 text-white gap-12">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/special" element={<Special />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
          </Routes>
        </Router>
        <Footer />
      </div>
    </>
  );
}

export default App;
