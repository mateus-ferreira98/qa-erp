import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDatabase } from '@/contexts/DatabaseContext';
import { formatDate } from '@/utils/format';
import { ArrowUpCircle } from 'lucide-react';

const InventoryOutputList: React.FC = () => {
  const { state } = useDatabase();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');

  // Enhanced records with product info
  const inventoryOutputRecords = state.inventoryOutputs.map(output => {
    const product = state.products.find(p => p.id === output.productId);
    
    return {
      ...output,
      productName: product?.name || 'Produto desconhecido',
      unitOfMeasurement: product?.unitOfMeasurement || 'UN',
    };
  });

  // Filter records based on search query and type filter
  const filteredRecords = inventoryOutputRecords.filter((record) => {
    const matchesSearch = record.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.observation.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesType = typeFilter === 'ALL' || record.outputType === typeFilter;
    
    return matchesSearch && matchesType;
  });

  // Sort by date (newest first)
  const sortedRecords = [...filteredRecords].sort((a, b) => 
    b.outputDate.getTime() - a.outputDate.getTime()
  );

  // Get output type badge color
  const getOutputTypeBadge = (type: string) => {
    switch(type) {
      case 'SALE':
        return 'bg-green-100 text-green-800';
      case 'LOSS':
        return 'bg-red-100 text-red-800';
      case 'INTERNAL_USE':
        return 'bg-blue-100 text-blue-800';
      case 'DONATION':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Saídas de estoque</h2>
          <button
            onClick={() => navigate('/inventory/outputs/new')}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700"
          >
            Registrar nova saída
          </button>
        </div>
        
        {/* Filters */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <input
              type="text"
              placeholder="Pesquisar por produto ou observação..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">Todos os tipos</option>
              <option value="SALE">Oferta</option>
              <option value="LOSS">Perda</option>
              <option value="INTERNAL_USE">Uso interno</option>
              <option value="DONATION">Doação</option>
            </select>
          </div>
        </div>
      </div>

      {/* Records list */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Observação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedRecords.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  Nenhuma saída de inventário encontrada
                </td>
              </tr>
            ) : (
              sortedRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(record.outputDate)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-red-100 rounded-full">
                        <ArrowUpCircle className="h-4 w-4 text-red-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{record.productName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{record.quantity} {record.unitOfMeasurement}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getOutputTypeBadge(record.outputType)}`}>
                      {record.outputType.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{record.observation || '-'}</div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryOutputList;
