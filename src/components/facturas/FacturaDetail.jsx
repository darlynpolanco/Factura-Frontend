import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFactura } from '../../services/facturaService';
import { getCliente } from '../../services/clienteService';

const FacturaDetail = () => {
  const { id } = useParams();
  const [factura, setFactura] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFactura = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Obtener factura - ya no se usa .data
        const facturaData = await getFactura(id);
        setFactura(facturaData);
        
        // Obtener cliente asociado - ya no se usa .data
        if (facturaData.clienteId) {
          const clienteData = await getCliente(facturaData.clienteId);
          setCliente(clienteData);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching factura:', err);
        setError(err.message || 'Error al cargar la factura');
        setLoading(false);
      }
    };

    fetchFactura();
  }, [id]);

  if (loading) return <div className="text-center py-8">Cargando factura...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!factura) return <div className="text-center py-8">Factura no encontrada</div>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold">Factura #{factura.id}</h2>
          <p className="text-gray-600">Fecha: {new Date(factura.fecha).toLocaleDateString()}</p>
        </div>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => window.print()}
        >
          Imprimir Factura
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">Información de la Tienda</h3>
          <p className="font-bold">Tienda de Celulares</p>
          <p>Calle Principal #123</p>
          <p>Ciudad, País</p>
          <p>Tel: (123) 456-7890</p>
          <p>Email: info@tiendacelulares.com</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Información del Cliente</h3>
          {cliente ? (
            <>
              <p className="font-bold">{cliente.nombre}</p>
              <p>Email: {cliente.email}</p>
              <p>Teléfono: {cliente.telefono || 'N/A'}</p>
              <p>Dirección: {cliente.direccion || 'N/A'}</p>
            </>
          ) : (
            <p>Cliente no encontrado</p>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Productos</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left">Producto</th>
                <th className="py-2 px-4 text-center">Cantidad</th>
                <th className="py-2 px-4 text-right">Precio Unitario</th>
                <th className="py-2 px-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {factura.items.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="py-3 px-4">{item.productoNombre}</td>
                  <td className="py-3 px-4 text-center">{item.cantidad}</td>
                  <td className="py-3 px-4 text-right">${item.precioUnitario.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right">${(item.cantidad * item.precioUnitario).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100">
                <td colSpan="3" className="py-3 px-4 text-right font-bold">Total:</td>
                <td className="py-3 px-4 text-right font-bold">${factura.total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="border-t pt-4 text-sm text-gray-600">
        <p>Gracias por su compra. Por favor, realice el pago antes de la fecha de vencimiento.</p>
        <p>Métodos de pago aceptados: Transferencia bancaria, Tarjeta de crédito, Efectivo.</p>
      </div>
    </div>
  );
};

export default FacturaDetail;