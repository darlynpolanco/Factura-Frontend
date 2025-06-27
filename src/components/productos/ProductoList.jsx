import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductos, deleteProducto } from '../../services/productoService';
import ProductoCard from './ProductoCard';

const ProductoList = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        setError('');
        
        const productosData = await getProductos();
        setProductos(productosData);
        setLoading(false);
      } catch (err) {
        console.error('Error cargando productos:', err);
        setError('Error al cargar los productos. Por favor intenta de nuevo.');
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await deleteProducto(id);
        setProductos(productos.filter(producto => producto.id !== id));
      } catch (err) {
        console.error('Error eliminando producto:', err);
        setError(`Error al eliminar el producto: ${err.message || 'Por favor intenta de nuevo.'}`);
      }
    }
  };

  if (loading) return <div className="text-center py-8">Cargando productos...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Productos</h1>
        <Link to="/productos/nuevo" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Nuevo Producto
        </Link>
      </div>
      
      {productos.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center">
          <p className="text-gray-600 mb-4">No hay productos registrados</p>
          <Link to="/productos/nuevo" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Crear Nuevo Producto
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map(producto => (
            <ProductoCard 
              key={producto.id} 
              producto={producto} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductoList;