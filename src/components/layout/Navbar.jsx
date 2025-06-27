import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <div className="h-10 w-10 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xl">TC</span>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-800">TiendaCelulares</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/productos" text="Productos" />
            <NavLink to="/clientes" text="Clientes" />
            <Link 
              to="/facturas/nueva" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              Nueva Factura
            </Link>
            
            <button className="text-gray-600 hover:text-blue-600">
              <FaUserCircle className="text-2xl" />
            </button>
          </div>

          {/* - Hamburguesa */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavLink to="/productos" text="Productos" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink to="/clientes" text="Clientes" onClick={() => setIsMenuOpen(false)} />
            <Link
              to="/facturas/nueva"
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Nueva Factura
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, text }) => {
  return (
    <Link
      to={to}
      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
    >
      {text}
    </Link>
  );
};

const MobileNavLink = ({ to, text, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
    >
      {text}
    </Link>
  );
};

export default Navbar;