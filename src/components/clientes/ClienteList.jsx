import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getClientes, deleteCliente } from '../../services/clienteService';
import ClienteCard from './ClienteCard';


const ClienteList = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        setLoading(true);
        const data = await getClientes();
        setClientes(data);
        setError('');
      } catch (err) {
        console.error('Error fetching clientes:', err);
        setError(err.message || 'Error al cargar los clientes');
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este cliente?')) return;

    try {
      setDeletingId(id);
      await deleteCliente(id);
      setClientes(clientes.filter(cliente => cliente.id !== id));
    } catch (err) {
      console.error('Error deleting cliente:', err);
      setError(err.message || 'Error al eliminar el cliente');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <div className="text-center py-8">Cargando clientes...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Link 
          to="/clientes/nuevo" 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Nuevo Cliente
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
          <button 
            onClick={() => window.location.reload()}
            className="ml-4 text-blue-600 hover:text-blue-800"
          >
            Reintentar
          </button>
        </div>
      )}
      
      {clientes.length === 0 && !error ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600 mb-4">No hay clientes registrados</p>
          <Link 
            to="/clientes/nuevo" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block"
          >
            Crear primer cliente
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientes.map(cliente => (
            <ClienteCard 
              key={cliente.id} 
              cliente={cliente} 
              onDelete={handleDelete}
              isDeleting={deletingId === cliente.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClienteList;