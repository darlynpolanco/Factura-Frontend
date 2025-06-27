import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFacturas } from '../../services/facturaService';
import { getClientes } from '../../services/clienteService';

const FacturaList = () => {
  const [facturas, setFacturas] = useState([]);
  const [allFacturas, setAllFacturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clientes, setClientes] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Obtener todas las facturas
        const facturasData = await getFacturas();
        setFacturas(facturasData);
        setAllFacturas(facturasData);
        
        // Obtener todos los clientes
        const clientesData = await getClientes();
        
        // Crear mapa de clientes por ID
        const clientesMap = {};
        clientesData.forEach(cliente => {
          clientesMap[cliente.id] = cliente;
        });
        
        setClientes(clientesMap);
        setLoading(false);
      } catch (err) {
        console.error('Error obteniendo datos:', err);
        setError('Error al cargar los datos. Por favor intenta de nuevo.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrar facturas cuando cambia el término de búsqueda
  useEffect(() => {
    if (!searchTerm) {
      setFacturas(allFacturas);
    } else {
      const filtered = allFacturas.filter(factura => 
        factura.clienteId.toString().includes(searchTerm)
      );
      setFacturas(filtered);
    }
  }, [searchTerm, allFacturas]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (!searchTerm) {
      setFacturas(allFacturas);
      return;
    }
    
    const filtered = allFacturas.filter(factura => 
      factura.clienteId.toString() === searchTerm
    );
    
    setFacturas(filtered);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFacturas(allFacturas);
    setShowSearch(false);
  };

  if (loading) return <div className="text-center py-8">Cargando facturas...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Facturas</h1>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            {showSearch ? 'Ocultar Búsqueda' : 'Buscar por Cliente'}
          </button>
          
          <Link to="/facturas/nueva" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Crear Nueva Factura
          </Link>
        </div>
      </div>

      {/* Panel de búsqueda desplegable */}
      {showSearch && (
        <div className="mb-6 bg-white p-4 rounded shadow">
          <div className="flex items-center mb-2">
            <input
              type="text"
              placeholder="Ingrese ID de cliente..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearchSubmit}
              className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Buscar
            </button>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Busca facturas por ID de cliente. Ej: 1, 2, 3...
            </p>
            <button
              onClick={clearSearch}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Limpiar búsqueda
            </button>
          </div>
          
          {/* Lista rápida de clientes para referencia */}
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Clientes registrados:</h3>
            <div className="flex flex-wrap gap-2">
              {Object.keys(clientes).slice(0, 5).map(id => (
                <span 
                  key={id}
                  className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded cursor-pointer hover:bg-gray-200"
                  onClick={() => setSearchTerm(id)}
                >
                  {id}: {clientes[id].nombre}
                </span>
              ))}
              {Object.keys(clientes).length > 5 && (
                <span className="text-xs text-gray-500">
                  +{Object.keys(clientes).length - 5} más...
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {facturas.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center">
          <p className="text-gray-600">
            {searchTerm ? 
              `No se encontraron facturas para el cliente con ID: ${searchTerm}` 
              : 'No hay facturas registradas'
            }
          </p>
          
          <div className="mt-4">
            <Link to="/facturas/nueva" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Crear tu primera factura
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded shadow overflow-hidden">
          <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Mostrando {facturas.length} de {allFacturas.length} facturas
              {searchTerm && ` para el cliente ID: ${searchTerm}`}
            </p>
            
            {searchTerm && (
              <button 
                onClick={clearSearch}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Ver todas las facturas
              </button>
            )}
          </div>
          
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">ID Factura</th>
                <th className="py-3 px-4 text-left">Fecha</th>
                <th className="py-3 px-4 text-left">Cliente</th>
                <th className="py-3 px-4 text-left">ID Cliente</th>
                <th className="py-3 px-4 text-right">Total</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {facturas.map(factura => (
                <tr key={factura.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{factura.id}</td>
                  <td className="py-3 px-4">{new Date(factura.fecha).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    {clientes[factura.clienteId]?.nombre || 'Cliente desconocido'}
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                      {factura.clienteId}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">${factura.total.toFixed(2)}</td>
                  <td className="py-3 px-4 text-center">
                    <Link 
                      to={`/facturas/${factura.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Ver Detalles
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FacturaList;