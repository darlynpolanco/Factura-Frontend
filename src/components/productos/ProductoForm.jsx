import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProducto, updateProducto, getProducto } from '../../services/productoService';

const ProductoForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    imagenUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [isLoadingInitial, setIsLoadingInitial] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const fetchProducto = async () => {
        try {
          setIsLoadingInitial(true);
          setError('');
          
          const productoData = await getProducto(id);
          setProducto(productoData);
          
          setIsLoadingInitial(false);
        } catch (err) {
          console.error('Error obteniendo producto:', err);
          setError(`Error al cargar el producto: ${err.message || 'Por favor intenta de nuevo.'}`);
          setIsLoadingInitial(false);
        }
      };
      fetchProducto();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ 
      ...producto, 
      [name]: name === 'precio' ? parseFloat(value) : value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      if (id) {
        await updateProducto(id, producto);
      } else {
        await createProducto(producto);
      }
      
      navigate('/productos');
    } catch (err) {
      console.error('Error guardando producto:', err);
      setError(`Error al guardar el producto: ${err.message || 'Por favor intenta de nuevo.'}`);
    } finally {
      setLoading(false);
    }
  };

  if (isLoadingInitial) return <div className="text-center py-8">Cargando producto...</div>;

  return (
    <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold">{id ? 'Editar Producto' : 'Nuevo Producto'}</h2>
        {id && (
          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
            ID: {id}
          </span>
        )}
      </div>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={producto.nombre}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              minLength={3}
              placeholder="Ej: iPhone 15 Pro Max"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">Descripción</label>
            <textarea
              name="descripcion"
              value={producto.descripcion}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              placeholder="Ej: Smartphone premium con cámara profesional y chip A17 Pro"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Precio ($)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
              <input
                type="number"
                name="precio"
                value={producto.precio}
                onChange={handleChange}
                className="w-full pl-8 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                step="0.01"
                required
                placeholder="Ej: 1250000"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">URL de Imagen</label>
            <input
              type="url"
              name="imagenUrl"
              value={producto.imagenUrl}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://ejemplo.com/imagen.jpg"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">Vista previa de la imagen</label>
            {producto.imagen ? (
              <div className="mt-2">
                <img 
                  src={producto.imagenUrl} 
                  alt="Vista previa" 
                  className="max-w-full h-48 object-contain border rounded"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/300?text=Imagen+no+disponible'}
                />
                <p className="text-xs text-gray-500 mt-1 truncate">{producto.imagen}</p>
              </div>
            ) : (
              <div className="bg-gray-100 border-2 border-dashed rounded-xl w-full h-48 flex items-center justify-center text-gray-500">
                Ingresa una URL para ver la vista previa
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
            onClick={() => navigate('/productos')}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {id ? 'Actualizando...' : 'Creando...'}
              </span>
            ) : id ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductoForm;