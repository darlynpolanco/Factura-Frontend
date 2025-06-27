import React, { useState, useEffect } from 'react';

const TestApiConnection = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCliente, setNewCliente] = useState({
    nombre: '',
    email: '',
    telefono: ''
  });

  // GET: Obtener todos los clientes
  const fetchClientes = async () => {
  try {
    const response = await fetch('http://localhost:5295/api/Clientes', { // Cambia a HTTP
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      credentials: 'omit' // Desactiva temporalmente
    });
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    setClientes(data);
    setLoading(false);
  } catch (err) {
    console.error("Error real:", err.message);
    setError(`Fallo en conexión: ${err.message} - Verifica: 
      1. Backend corriendo en http://localhost:5295
      2. Consola del navegador (F12 > Network)
      3. Logs de ASP.NET`);
    setLoading(false);
  }
};
  // POST: Crear nuevo cliente
  const createCliente = async () => {
    try {
      const response = await fetch('https://localhost:5295/api/Clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCliente)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Recargar la lista después de crear
      await fetchClientes();
      setNewCliente({ nombre: '', email: '', telefono: '' });
    } catch (err) {
      setError(`Error al crear cliente: ${err.message}`);
      console.error("Error en createCliente:", err);
    }
  };

  // DELETE: Eliminar cliente
  const deleteCliente = async (id) => {
    if (!window.confirm('¿Eliminar este cliente?')) return;
    
    try {
      const response = await fetch(`https://localhost:5295/api/Clientes/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Recargar la lista después de eliminar
      await fetchClientes();
    } catch (err) {
      setError(`Error al eliminar cliente: ${err.message}`);
      console.error("Error en deleteCliente:", err);
    }
  };

  // Cargar clientes al montar el componente
  useEffect(() => {
    fetchClientes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCliente(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="text-center py-8">Cargando clientes...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Prueba de Conexión API</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button 
            onClick={fetchClientes}
            className="ml-4 text-blue-600 hover:text-blue-800"
          >
            Reintentar
          </button>
        </div>
      )}

      <div className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Crear Nuevo Cliente</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="nombre"
            value={newCliente.nombre}
            onChange={handleInputChange}
            placeholder="Nombre"
            className="p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={newCliente.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="telefono"
            value={newCliente.telefono}
            onChange={handleInputChange}
            placeholder="Teléfono"
            className="p-2 border rounded"
          />
        </div>
        <button
          onClick={createCliente}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Crear Cliente
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Lista de Clientes</h2>
        {clientes.length === 0 ? (
          <p>No hay clientes registrados</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clientes.map(cliente => (
              <div key={cliente.id} className="border p-4 rounded shadow">
                <h3 className="font-bold">{cliente.nombre}</h3>
                <p>Email: {cliente.email}</p>
                <p>Teléfono: {cliente.telefono || 'N/A'}</p>
                <button
                  onClick={() => deleteCliente(cliente.id)}
                  className="mt-2 text-red-600 hover:text-red-800"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestApiConnection;