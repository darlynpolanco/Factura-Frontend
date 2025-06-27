import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createFactura } from '../../services/facturaService';
import { getClientes } from '../../services/clienteService';
import { getProductos } from '../../services/productoService';

const FacturaForm = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [factura, setFactura] = useState({
    clienteId: '',
    items: [],
  });
  const [selectedProduct, setSelectedProduct] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ya no se usa .data en las respuestas
        const clientesData = await getClientes();
        const productosData = await getProductos();
        setClientes(clientesData);
        setProductos(productosData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error al cargar datos. Por favor intenta de nuevo.');
      }
    };

    fetchData();
  }, []);

  const handleAddProduct = () => {
    if (!selectedProduct) {
      setError('Por favor selecciona un producto');
      return;
    }

    const producto = productos.find(p => p.id === parseInt(selectedProduct));
    if (!producto) return;

    const newItem = {
      productoId: producto.id,
      cantidad: parseInt(cantidad),
      precioUnitario: producto.precio,
    };

    setFactura({
      ...factura,
      items: [...factura.items, newItem]
    });

    // Reset form
    setSelectedProduct('');
    setCantidad(1);
    setError('');
  };

  const handleRemoveItem = (index) => {
    const newItems = [...factura.items];
    newItems.splice(index, 1);
    setFactura({ ...factura, items: newItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    if (!factura.clienteId) {
      setError('Por favor selecciona un cliente');
      setIsSubmitting(false);
      return;
    }

    if (factura.items.length === 0) {
      setError('Por favor agrega al menos un producto');
      setIsSubmitting(false);
      return;
    }

    try {
      // Ya no se usa response.data
      const facturaCreada = await createFactura(factura);
      navigate(`/facturas/${facturaCreada.id}`);
    } catch (err) {
      console.error('Error creating factura:', err);
      setError(err.message || 'Error al crear la factura. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = factura.items.reduce((sum, item) => sum + (item.cantidad * item.precioUnitario), 0);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Crear Nueva Factura</h2>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Cliente</label>
          <select
            className="w-full p-2 border rounded"
            value={factura.clienteId}
            onChange={(e) => setFactura({ ...factura, clienteId: e.target.value })}
            required
          >
            <option value="">Seleccionar cliente</option>
            {clientes.map(cliente => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre} - {cliente.email}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Productos</h3>
          
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <select
                className="w-full p-2 border rounded"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                <option value="">Seleccionar producto</option>
                {productos.map(producto => (
                  <option key={producto.id} value={producto.id}>
                    {producto.nombre} - ${producto.precio}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="w-24">
              <input
                type="number"
                min="1"
                className="w-full p-2 border rounded"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
              />
            </div>
            
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleAddProduct}
            >
              Agregar
            </button>
          </div>

          {factura.items.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-2 px-4 border-b">Producto</th>
                    <th className="py-2 px-4 border-b">Cantidad</th>
                    <th className="py-2 px-4 border-b">Precio Unitario</th>
                    <th className="py-2 px-4 border-b">Subtotal</th>
                    <th className="py-2 px-4 border-b">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {factura.items.map((item, index) => {
                    const producto = productos.find(p => p.id === item.productoId);
                    return (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b">{producto?.nombre}</td>
                        <td className="py-2 px-4 border-b text-center">{item.cantidad}</td>
                        <td className="py-2 px-4 border-b text-right">${item.precioUnitario.toFixed(2)}</td>
                        <td className="py-2 px-4 border-b text-right">${(item.cantidad * item.precioUnitario).toFixed(2)}</td>
                        <td className="py-2 px-4 border-b text-center">
                          <button
                            type="button"
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleRemoveItem(index)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="py-2 px-4 border-t font-bold text-right">Total:</td>
                    <td className="py-2 px-4 border-t font-bold text-right">${total.toFixed(2)}</td>
                    <td className="py-2 px-4 border-t"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 italic">No hay productos agregados</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className={`bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creando...' : 'Crear Factura'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FacturaForm;