import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        {/* Loader animation */}
        <div className="w-12 h-12 border-4 border-blue-500 border-solid rounded-full animate-spin border-t-transparent"></div>
        <p className="mt-4 text-lg text-gray-600">Cargando...</p>
      </div>
    </div>
  );
};

export default Loader;