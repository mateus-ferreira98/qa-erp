import React from "react";

const Navbar: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-medium text-gray-800">
          Sistema de Gestão de Estoque
        </h1>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
