import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCliente, updateCliente, getCliente } from '../../services/clienteService';

const ClienteForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cliente, setCliente] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditing] = useState(!!id);

  useEffect(() => {
    if (!id) return;

    const fetchCliente = async () => {
      try {
        setLoading(true);
        const data = await getCliente(id);
        setCliente(data);
        setError('');
      } catch (err) {
        console.error('Error fetching cliente:', err);
        setError(err.message || 'Error al cargar el cliente');
      } finally {
        setLoading(false);
      }
    };

    fetchCliente();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!cliente.nombre.trim() || !cliente.email.trim()) {
      setError('Nombre y email son obligatorios');
      return;
    }

    try {
      setLoading(true);
      
      if (id) {
        await updateCliente(id, cliente);
      } else {
        await createCliente(cliente);
      }
      
      navigate('/clientes', { state: { success: true } });
    } catch (err) {
      console.error('Error saving cliente:', err);
      setError(err.message || 'Error al guardar el cliente');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="text-center py-12">
        <div className="spinner-border text-blue-600" role="status">
          <span className="sr-only">Cargando...</span>
        </div>
        <p className="mt-3">Cargando cliente...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {id ? 'Editar Cliente' : 'Nuevo Cliente'}
      </h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Nombre *
            </label>
            <input
              type="text"
              name="nombre"
              value={cliente.nombre}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Juan Pérez"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={cliente.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: cliente@ejemplo.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Teléfono
            </label>
            <input
              type="text"
              name="telefono"
              value={cliente.telefono}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: +123456789"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Dirección
            </label>
            <input
              type="text"
              name="direccion"
              value={cliente.direccion}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Av. Principal 123"
            />
          </div>
        </div>
        
        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            className="bg-gray-200 text-gray-800 px-5 py-2.5 rounded-lg hover:bg-gray-300 transition font-medium"
            onClick={() => navigate('/clientes')}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-70"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <span className="spinner-border spinner-border-sm mr-2"></span>
                {id ? 'Actualizando...' : 'Creando...'}
              </span>
            ) : id ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClienteForm;