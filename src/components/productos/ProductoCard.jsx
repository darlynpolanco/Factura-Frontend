import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductoCard = ({ producto, onDelete }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      {/* Sección de imagen - usando imagenUrl */}
      <div className="h-48 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
        {producto.imagenUrl && !imgError ? (
          <>
            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="animate-spin h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}
            <img 
              src={producto.imagenUrl} 
              alt={producto.nombre}
              className={`w-full h-full object-contain p-4 ${imgLoaded ? 'block' : 'invisible'}`}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
            />
          </>
        ) : (
          <div className="text-gray-400 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="mt-2">Sin imagen</span>
          </div>
        )}
      </div>
      
      {/* Contenido de la tarjeta */}
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{producto.nombre}</h3>
            <div className="flex items-center mt-1">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                ID: {producto.id}
              </span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mt-3 line-clamp-2 min-h-[3rem]">
          {producto.descripcion}
        </p>
        
        <div className="mt-4">
          <p className="text-lg font-bold text-gray-900">${producto.precio.toFixed(2)}</p>
        </div>
        
        <div className="mt-6 flex justify-between border-t pt-3">
          <Link 
            to={`/productos/${producto.id}/editar`}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Editar
          </Link>
          <button
            onClick={() => {
              if (window.confirm(`¿Estás seguro de eliminar "${producto.nombre}"?`)) {
                onDelete(producto.id);
              }
            }}
            className="text-red-600 hover:text-red-800 font-medium flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductoCard;