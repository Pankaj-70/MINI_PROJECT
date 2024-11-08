import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        {/* About Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">About Us</h2>
          <p className="text-gray-300 text-sm">
            Welcome to Gastron, your go-to food delivery platform! We serve a
            variety of delicious dishes that bring flavor right to your
            doorstep. Our mission is to deliver fresh, high-quality meals to our
            customers with a commitment to sustainability and taste.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul>
            <li className="mb-2 hover:text-yellow-500 cursor-pointer">Home</li>
            <li className="mb-2 hover:text-yellow-500 cursor-pointer">Menu</li>
            <li className="mb-2 hover:text-yellow-500 cursor-pointer">About</li>
            <li className="mb-2 hover:text-yellow-500 cursor-pointer">
              Contact
            </li>
            <li className="mb-2 hover:text-yellow-500 cursor-pointer">
              Careers
            </li>
            <li className="mb-2 hover:text-yellow-500 cursor-pointer">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-300 text-sm mb-2">
            123 Food St, Gourmet City
          </p>
          <p className="text-gray-300 text-sm mb-2">
            Email: support@gastron.com
          </p>
          <p className="text-gray-300 text-sm mb-4">Phone: +1 (123) 456-7890</p>
          <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
          <p className="text-gray-300 text-sm">Mon - Fri: 9 AM - 9 PM</p>
          <p className="text-gray-300 text-sm">Sat - Sun: 10 AM - 10 PM</p>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Subscribe</h2>
          <p className="text-gray-300 text-sm mb-4">
            Stay updated with our latest offers, news, and recipes. Subscribe to
            our newsletter!
          </p>
          <form className="flex flex-col">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded bg-gray-700 text-gray-300 mb-4"
            />
            <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-semibold py-2 px-4 rounded">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 Gastron. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-yellow-500 text-2xl">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-yellow-500 text-2xl">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-yellow-500 text-2xl">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
