import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDatabase } from '@/contexts/DatabaseContext';
import { Supplier } from '@/types';
import { formatDate } from '@/utils/format';
import { Users, Edit, Trash } from 'lucide-react';
import ConfirmModal from '../modal/ConfirmModal';
import toast from 'react-hot-toast';

const SupplierList: React.FC = () => {
  const { state, dispatch } = useDatabase();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState<number | null>(null);

  // Filter suppliers based on search query
  const filteredSuppliers = state.suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.cnpj.includes(searchQuery) ||
    supplier.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle delete supplier
  const handleDelete = (id: number) => {
    setSupplierToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (supplierToDelete !== null) {
      dispatch({ type: 'DELETE_SUPPLIER', payload: supplierToDelete });
      toast.success('Fornecedor excluído com sucesso!');
      setSupplierToDelete(null);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Fornecedores</h2>
          <button
            onClick={() => navigate('/suppliers/new')}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700"
          >
            Adicionar novo fornecedor
          </button>
        </div>
        
        {/* Search bar */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Pesquisar fornecedores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Suppliers list */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">CNPJ</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Contato</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Criado em</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredSuppliers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  Nenhum fornecedor encontrado
                </td>
              </tr>
            ) : (
              filteredSuppliers.map((supplier) => (
                <SupplierRow 
                  key={supplier.id} 
                  supplier={supplier} 
                  onEdit={() => navigate(`/suppliers/edit/${supplier.id}`)} 
                  onDelete={() => handleDelete(supplier.id)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="Confirmar exclusão">
        <p>
          Deseja realmente excluir o fornecedor?<br />
          Essa ação não poderá ser desfeita.
        </p>
      </ConfirmModal>
    </div>
  );
};

interface SupplierRowProps {
  supplier: Supplier;
  onEdit: () => void;
  onDelete: () => void;
}

const SupplierRow: React.FC<SupplierRowProps> = ({ supplier, onEdit, onDelete }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
            <Users className="h-5 w-5 text-blue-600" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900">{supplier.cnpj}</div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900">{supplier.email}</div>
        <div className="text-sm text-gray-500">{supplier.phone}</div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900">{formatDate(supplier.createdAt)}</div>
      </td>
      <td className="px-6 py-4 text-right text-sm font-medium">
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-900"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-900"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default SupplierList;
