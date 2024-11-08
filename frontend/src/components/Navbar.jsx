import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	return (
		<div className="p-4 bg-gray-800 flex items-center justify-between fixed w-full z-50">
			<h1 className="shadow-white text-4xl font-bold font-playwrite cursor-pointer transition-transform duration-100 transform hover:scale-100 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-orange-200 to-red-400">
				Gastron
			</h1>
			<nav className="hidden md:flex space-x-4">
				<Link
					to="/"
					className="text-white hover:text-black hover:bg-white px-2 py-1 rounded-md"
				>
					Home
				</Link>
				<Link
					to="/about"
					className="text-white hover:text-black hover:bg-white px-2 py-1 rounded-md"
				>
					About
				</Link>
				<Link
					to="/special"
					className="text-white hover:text-black hover:bg-white px-2 py-1 rounded-md"
				>
					Specials
				</Link>
				<Link
					to="/contact"
					className="text-white hover:text-black hover:bg-white px-2 py-1 rounded-md"
				>
					Contact Us
				</Link>
			</nav>
			<button
				className="hidden md:block bg-orange-700 px-4 py-1 text-[17px] rounded-md mr-2 hover:bg-orange-500 font-semibold"
				onClick={() => navigate("/login")}
			>
				{isLoggedIn ? "Logout" : "Login"}
			</button>
			<div className="md:hidden">
				<button
					className="text-[27px] cursor-pointer hover:bg-gray-700 p-2 rounded-md transition-transform duration-200 transform hover:scale-105 font-extrabold"
					onClick={() => setIsOpen(!isOpen)}
				>
					{!isOpen ? <FaBars /> : <IoClose />}
				</button>
			</div>

			{isOpen && (
				<div className="md:hidden h-screen bg-gray-700 absolute top-[75px] left-0 right-0 text-white flex flex-col z-50">
					<Link
						to="/"
						className="block hover:bg-gray-600 pl-5 py-2"
						onClick={() => setIsOpen(false)}
					>
						Home
					</Link>
					<Link
						to="/about"
						className="block w-full hover:bg-gray-600 pl-5 py-2"
						onClick={() => setIsOpen(false)}
					>
						About
					</Link>
					<Link
						to="/special"
						className="block w-full hover:bg-gray-600 pl-5 py-2"
						onClick={() => setIsOpen(false)}
					>
						Specials
					</Link>
					<Link
						to="/contact"
						className="block w-full hover:bg-gray-600 pl-5 py-2"
						onClick={() => setIsOpen(false)}
					>
						Contact Us
					</Link>
					<Link
						to="/login"
						className="block w-full hover:bg-gray-600 pl-5 py-2"
						onClick={() => setIsOpen(false)}
					>
						Login
					</Link>
				</div>
			)}
		</div>
	);
};

export default Navbar;
