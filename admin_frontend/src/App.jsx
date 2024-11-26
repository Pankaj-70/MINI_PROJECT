import React from "react";
import SidePanel from "./components/SidePanel";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
const App = () => {
	return (
		<div>
			<Router>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/products" element={<SidePanel />}></Route>
					<Route path="/add-product" element={<AddProduct />}></Route>
				</Routes>
			</Router>
		</div>
	);
};

export default App;
