import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const [isCheckout, setIsCheckout] = useState(false); // For toggle between cart and checkout
  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    paymentMethod: "",
  });

  // Increment quantity
  const incrementQuantity = (item) => {
    dispatch(addToCart({ item, quantity: 1 }));
  };

  // Decrement quantity
  const decrementQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(addToCart({ item, quantity: -1 }));
    }
  };

  // Handle delete
  const handleDeleteItem = (item) => {
    dispatch(removeFromCart(item)); // Remove item from the cart
  };

  // Handle checkout form submission
  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    // Process the checkout, you can clear the cart or do whatever you need here
    alert("Order placed successfully!");
    // Optionally, clear cart after checkout
    // dispatch(clearCart());
  };

  // Calculate total
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // Toggle between checkout form and cart items
  const toggleCheckout = () => {
    setIsCheckout((prev) => !prev);
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-2xl">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="p-6 pt-24 text-gray-800 bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">
        Shopping Cart
      </h2>

      {/* Cart Items List */}
      {!isCheckout ? (
        <div className="space-y-6">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform "
            >
              <img
                src={item.img}
                alt={item.content}
                className="w-24 h-24 object-cover rounded-lg mr-6"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {item.content}
                </h3>
                <p className="text-gray-600">Price: ₹{item.price}</p>
                <div className="flex items-center space-x-4 mt-3">
                  <button
                    onClick={() => decrementQuantity(item)}
                    className="px-3 py-2 bg-gray-200 text-gray-700 rounded-full transition-all duration-200 ease-in-out hover:bg-gray-300 hover:shadow-lg"
                  >
                    <FaMinus />
                  </button>
                  <span className="text-lg text-gray-900">{item.quantity}</span>
                  <button
                    onClick={() => incrementQuantity(item)}
                    className="px-3 py-2 bg-gray-200 text-gray-700 rounded-full transition-all duration-200 ease-in-out hover:bg-gray-300 hover:shadow-lg"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <p className="text-2xl font-semibold text-gray-900">
                  ₹{item.price * item.quantity}
                </p>
                <button
                  onClick={() => handleDeleteItem(item)}
                  className="text-red-600 hover:text-red-800 transition duration-200 ease-in-out"
                >
                  <FaTrash className="text-2xl" />
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 text-center">
            <button
              onClick={toggleCheckout}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 text-xl rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:bg-gradient-to-l"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        // Checkout Form
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h3>
          <form onSubmit={handleCheckoutSubmit} className="space-y-4">
            <div>
              <label className="block text-lg text-gray-700">Full Name</label>
              <input
                type="text"
                className="w-full p-3 border-2 rounded-lg mt-2"
                value={userDetails.name}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-lg text-gray-700">
                Shipping Address
              </label>
              <input
                type="text"
                className="w-full p-3 border-2 rounded-lg mt-2"
                value={userDetails.address}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, address: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-lg text-gray-700">
                Payment Method
              </label>
              <select
                className="w-full p-3 border-2 rounded-lg mt-2"
                value={userDetails.paymentMethod}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    paymentMethod: e.target.value,
                  })
                }
                required
              >
                <option value="">Select Payment Method</option>
                <option value="credit-card">Credit Card</option>
                <option value="debit-card">Debit Card</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>

            <div className="mt-6">
              <h4 className="text-xl font-semibold text-gray-900">
                Total: ₹{calculateTotal()}
              </h4>
              <button
                type="submit"
                className="bg-green-500 text-white px-8 py-3 text-xl rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:bg-green-600 mt-4"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CartPage;
