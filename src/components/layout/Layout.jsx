import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="container mx-auto py-6 px-4 flex-1">
        {children}
      </main>
      <footer className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white py-6 mt-8 shadow-inner">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-2 px-4">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-blue-300">
              <rect x="6" y="2" width="12" height="20" rx="3" fill="#60A5FA" />
              <rect x="9" y="5" width="6" height="14" rx="2" fill="#fff" />
              <circle cx="12" cy="19" r="1" fill="#60A5FA" />
            </svg>
            <span className="font-bold text-lg tracking-wide">Tienda de Celulares</span>
          </div>
          <p className="text-sm text-blue-200">
            © {new Date().getFullYear()} Todos los derechos reservados
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;