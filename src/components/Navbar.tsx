import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Car, Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleAuthClick = () => {
    if (user) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">RentCars</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
            {user && (
              <Link to="/mybookings" className="text-gray-700 hover:text-blue-600">My Bookings</Link>
            )}
            <button
              onClick={handleAuthClick}
              className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {user ? (
                <>
                  <LogOut className="h-4 w-4" />
                  <span>{user.name}</span>
                </>
              ) : (
                <>
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/cars" className="block px-3 py-2" onClick={() => setIsMenuOpen(false)}>Cars</Link>
              <Link to="/contact" className="block px-3 py-2" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              {user && (
                <Link to="/mybookings" className="block px-3 py-2" onClick={() => setIsMenuOpen(false)}>My Bookings</Link>
              )}
              <button
                onClick={handleAuthClick}
                className="w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                {user ? `Logout (${user.name})` : "Login"}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
