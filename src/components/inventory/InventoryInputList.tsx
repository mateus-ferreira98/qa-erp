import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDatabase } from '@/contexts/DatabaseContext';
import { formatDate, formatCurrency } from '@/utils/format';
import { ArrowDownCircle } from 'lucide-react';

const InventoryInputList: React.FC = () => {
  const { state } = useDatabase();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Enhanced records with product and supplier info
  const inventoryInputRecords = state.inventoryInputs.map(input => {
    const product = state.products.find(p => p.id === input.productId);
    const supplier = state.suppliers.find(s => s.id === input.supplierId);
    
    return {
      ...input,
      productName: product?.name || 'Produto desconhecido',
      supplierName: supplier?.name || 'Fornecedor desconhecido',
      totalCost: input.quantity * input.unitPrice
    };
  });

  // Filter records based on search query
  const filteredRecords = inventoryInputRecords.filter((record) =>
    record.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.supplierName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort by date (newest first)
  const sortedRecords = [...filteredRecords].sort((a, b) => 
    b.entryDate.getTime() - a.entryDate.getTime()
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Entradas de estoque</h2>
          <button
            onClick={() => navigate('/inventory/inputs/new')}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700"
          >
            Registrar nova entrada
          </button>
        </div>
        
        {/* Search bar */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Pesquise por produto, fornecedor ou fatura.."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Records list */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Fornecedor</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Preço unitário</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Custo total</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Fatura</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedRecords.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  Nenhuma entrada de inventário encontrada
                </td>
              </tr>
            ) : (
              sortedRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(record.entryDate)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-blue-100 rounded-full">
                        <ArrowDownCircle className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{record.productName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{record.supplierName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{record.quantity}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{formatCurrency(record.unitPrice)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(record.totalCost)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{record.invoice || '-'}</div>
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

export default InventoryInputList;
