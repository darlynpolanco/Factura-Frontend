import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ClienteList from './components/clientes/ClienteList';
import ClienteForm from './components/clientes/ClienteForm';
import ProductoList from './components/productos/ProductoList';
import ProductoForm from './components/productos/ProductoForm';
import FacturaForm from './components/facturas/FacturaForm';
import FacturaDetail from './components/facturas/FacturaDetail';
import FacturaList from './components/facturas/FacturaList';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={
            <div className="flex flex-col items-center justify-center hover:scale-120 transition-transform duration-300 py-16 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-xl shadow-lg mx-auto max-w-3xl mt-8">
              <div className="mb-6">
                <svg width="64" height="64" fill="none" viewBox="0 0 24 24" className="mx-auto mb-4 text-blue-500">
                  <rect x="6" y="2" width="12" height="20" rx="3" fill="#3B82F6" />
                  <rect x="9" y="5" width="6" height="14" rx="2" fill="#fff" />
                  <circle cx="12" cy="19" r="1" fill="#3B82F6" />
                </svg>
              </div>
              <h1 className="text-4xl font-extrabold text-blue-700 mb-3 drop-shadow">¡Bienvenido a Tienda de Celulares!</h1>
              <p className="text-lg text-gray-700 max-w-xl mx-auto mb-6">
                <span className="font-semibold text-blue-600">Sistema de gestión</span> para tu tienda de celulares.<br />
                Administra <span className="font-semibold text-blue-500">clientes</span>, <span className="font-semibold text-blue-500">productos</span> y genera <span className="font-semibold text-blue-500">facturas</span> de manera fácil y rápida.
              </p>
              <div className="flex gap-4 mt-4">
                <a href="/clientes" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow transition">Ver Clientes</a>
                <a href="/productos" className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold px-6 py-2 rounded shadow transition">Ver Productos</a>
              </div>
          </div>
        } />
          
          {/* Clientes */}
          <Route path="/clientes" element={<ClienteList />} />
          <Route path="/clientes/nuevo" element={<ClienteForm />} />
          <Route path="/clientes/:id/editar" element={<ClienteForm />} />
          
          {/* Productos */}
          <Route path="/productos" element={<ProductoList />} />
          <Route path="/productos/nuevo" element={<ProductoForm />} />
          <Route path="/productos/:id/editar" element={<ProductoForm />} />
          
          {/* Facturas */}
          <Route path="/facturas" element={<FacturaList />} />
          <Route path="/facturas/nueva" element={<FacturaForm />} />
          <Route path="/facturas/:id" element={<FacturaDetail />} />
        </Routes>
      </Layout>
      
    </Router>
  );
}

export default App;