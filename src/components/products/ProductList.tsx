import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDatabase } from '@/contexts/DatabaseContext';
import { formatCurrency } from '@/utils/format';
import { Product } from '@/types';
import { Package, AlertCircle, Edit, Trash } from 'lucide-react';

const ProductList: React.FC = () => {
  const { state, dispatch } = useDatabase();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on search query
  const filteredProducts = state.products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle delete product
  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza de que deseja excluir este produto?')) {
      dispatch({ type: 'DELETE_PRODUCT', payload: id });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Produtos</h2>
          <button
            onClick={() => navigate('/products/new')}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700"
          >
            Adicionar novo produto
          </button>
        </div>
        
        {/* Search bar */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Pesquisar produtos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Products list */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Unidade</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Estoque</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  Nenhum produto encontrado
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <ProductRow 
                  key={product.id} 
                  product={product} 
                  onEdit={() => navigate(`/products/edit/${product.id}`)} 
                  onDelete={() => handleDelete(product.id)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface ProductRowProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductRow: React.FC<ProductRowProps> = ({ product, onEdit, onDelete }) => {
  // Determine stock status
  const isLowStock = product.currentStock <= product.minimumStock;
  const stockStatusClass = isLowStock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
  const stockStatus = isLowStock ? 'Low Stock' : 'In Stock';

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
            <Package className="h-5 w-5 text-blue-600" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{product.name}</div>
            <div className="text-sm text-gray-500">{product.description}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900">{formatCurrency(product.unitPrice)}</div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900">{product.unitOfMeasurement}</div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="text-sm text-gray-900">{product.currentStock}</div>
          {isLowStock && (
            <AlertCircle className="h-4 w-4 text-red-500 ml-1" />
          )}
        </div>
        <div className="text-xs text-gray-500">Min: {product.minimumStock}</div>
      </td>
      <td className="px-6 py-4">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${stockStatusClass}`}>
          {stockStatus}
        </span>
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

export default ProductList;
