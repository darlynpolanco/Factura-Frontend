import React from 'react';
import { Link } from 'react-router-dom';

const ClienteCard = ({ cliente, onDelete, isDeleting }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800">{cliente.nombre}</h3>
        <p className="text-gray-600 mt-1">{cliente.email}</p>
        
        <div className="mt-4 space-y-1">
          <p className="text-gray-700">
            <span className="font-medium">Teléfono:</span> {cliente.telefono || 'N/A'}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Dirección:</span> {cliente.direccion || 'N/A'}
          </p>
        </div>
        
        <div className="mt-6 flex justify-between items-center">
          <Link 
            to={`/clientes/${cliente.id}/editar`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Editar
          </Link>
          <button
            onClick={() => onDelete(cliente.id)}
            disabled={isDeleting}
            className={`text-red-600 hover:text-red-800 font-medium ${
              isDeleting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isDeleting ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClienteCard;