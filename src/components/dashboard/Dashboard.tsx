import React from 'react';
import { useDatabase } from '@/contexts/DatabaseContext';
import { formatCurrency } from '@/utils/format';
import { AlertCircle, ArrowDownCircle, ArrowUpCircle, Package, Users } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { state } = useDatabase();

  // Calculate summary metrics
  const totalProducts = state.products.length;
  const totalSuppliers = state.suppliers.length;
  const lowStockProducts = state.products.filter(p => p.currentStock <= p.minimumStock).length;
  const outOfStockProducts = state.products.filter(p => p.currentStock === 0).length;
  
  // Calculate inventory value
  const inventoryValue = state.products.reduce((total, product) => {
    return total + (product.currentStock * product.unitPrice);
  }, 0);
  
  // Recent movements
  const recentMovements = [...state.stockMovements]
    .sort((a, b) => b.movementDate.getTime() - a.movementDate.getTime())
    .slice(0, 5);

  // Enhanced movements with product info
  const enhancedMovements = recentMovements.map(movement => {
    const product = state.products.find(p => p.id === movement.productId);
    return {
      ...movement,
      productName: product?.name || 'Produto desconhecido',
    };
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Products Card */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center">
          <div className="p-3 rounded-full bg-blue-100 mr-4">
            <Package className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total de produtos</p>
            <p className="text-2xl font-semibold text-gray-900">{totalProducts}</p>
          </div>
        </div>
        
        {/* Total Suppliers Card */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center">
          <div className="p-3 rounded-full bg-green-100 mr-4">
            <Users className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total de Fornecedores</p>
            <p className="text-2xl font-semibold text-gray-900">{totalSuppliers}</p>
          </div>
        </div>
        
        {/* Low Stock Card */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center">
          <div className="p-3 rounded-full bg-yellow-100 mr-4">
            <AlertCircle className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Produtos com baixo estoque</p>
            <p className="text-2xl font-semibold text-gray-900">{lowStockProducts}</p>
          </div>
        </div>
        
        {/* Inventory Value Card */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center">
          <div className="p-3 rounded-full bg-purple-100 mr-4">
            <svg className="h-6 w-6 text-purple-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Valor do estoque</p>
            <p className="text-2xl font-semibold text-gray-900">{formatCurrency(inventoryValue)}</p>
          </div>
        </div>
      </div>
      
      {/* Recent Activity and Low Stock */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Stock Movements */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">Movimentos recentes de ações</h2>
          </div>
          <div className="p-6">
            {enhancedMovements.length === 0 ? (
              <p className="text-gray-500">Nenhum movimento recente</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {enhancedMovements.map((movement) => (
                  <li key={movement.id} className="py-3 flex items-center">
                    <div className={`p-2 rounded-full ${movement.movementType === 'INPUT' ? 'bg-blue-100' : 'bg-red-100'} mr-3`}>
                      {movement.movementType === 'INPUT' ? (
                        <ArrowDownCircle className="h-4 w-4 text-blue-600" />
                      ) : (
                        <ArrowUpCircle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{movement.productName}</p>
                      <p className="text-xs text-gray-500">{movement.origin}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${movement.movementType === 'INPUT' ? 'text-blue-600' : 'text-red-600'}`}>
                        {movement.movementType === 'INPUT' ? '+' : '-'}{movement.quantity}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(movement.movementDate).toLocaleDateString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        {/* Low Stock Products */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">Alerta de estoque baixo</h2>
          </div>
          <div className="p-6">
            {lowStockProducts === 0 ? (
              <div className="bg-green-50 p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">Todos os níveis de estoque de produtos estão bons</p>
                  </div>
                </div>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {state.products
                  .filter(product => product.currentStock <= product.minimumStock)
                  .map((product) => (
                    <li key={product.id} className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="p-2 rounded-full bg-red-100 mr-3">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.unitOfMeasurement}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-red-600">
                          {product.currentStock} / {product.minimumStock}
                        </p>
                        <p className="text-xs text-gray-500">
                          {product.currentStock === 0 ? 'Fora de estoque!' : 'Estoque baixo'}
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
