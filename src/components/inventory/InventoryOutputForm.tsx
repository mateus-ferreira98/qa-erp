import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDatabase } from '@/contexts/DatabaseContext';
import { OutputType } from '@/types';
import toast from 'react-hot-toast';

const InventoryOutputForm: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useDatabase();
  
  const [formData, setFormData] = useState({
    productId: '',
    quantity: '',
    outputType: 'SALE' as OutputType,
    outputDate: new Date().toISOString().split('T')[0],
    observation: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'quantity') {
      setFormData(prev => ({
        ...prev,
        quantity: value
      }));
    } else if (name === 'outputType') {
      setFormData(prev => ({
        ...prev,
        outputType: value as OutputType
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.productId) {
      newErrors.productId = 'O produto é obrigatório';
    }
    
    if (Number(formData.quantity) <= 0) {
      newErrors.quantity = 'A quantidade deve ser maior que 0';
    }
    
    // Check if there's enough stock
    if (formData.productId && Number(formData.quantity) > 0) {
      const product = state.products.find(p => p.id === Number(formData.productId));
      if (product && product.currentStock < Number(formData.quantity)) {
        newErrors.quantity = `Estoque insuficiente. Disponível: ${product.currentStock}`;
      }
    }
    
    if (!formData.outputDate) {
      newErrors.outputDate = 'A data de saída é obrigatória';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    dispatch({
      type: 'ADD_INVENTORY_OUTPUT',
      payload: {
        productId: Number(formData.productId),
        quantity: Number(formData.quantity),
        outputType: formData.outputType,
        outputDate: new Date(formData.outputDate),
        observation: formData.observation,
      }
    });
    
    toast.success('Saídas de estoque criado com sucesso!');
    navigate('/inventory/outputs');
  };

  // Get current stock for the selected product
  const selectedProduct = formData.productId 
    ? state.products.find(p => p.id === Number(formData.productId))
    : null;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          Registrar saída de estoque
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* Product Selection */}
        <div>
          <label htmlFor="productId" className="block text-sm font-medium text-gray-700">
            Produto *
          </label>
          <select
            id="productId"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            className={`mt-1 block w-full border ${errors.productId ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="">Selecione um produto</option>
            {state.products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name} ({product.unitOfMeasurement}) - In Stock: {product.currentStock}
              </option>
            ))}
          </select>
          {errors.productId && <p className="mt-1 text-sm text-red-600">{errors.productId}</p>}
        </div>
        
        {/* Current Stock Information */}
        {selectedProduct && (
          <div className={`p-3 rounded-md ${selectedProduct.currentStock <= selectedProduct.minimumStock ? 'bg-red-50 text-red-800' : 'bg-blue-50 text-blue-800'}`}>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Estoque atual:</span>
              <span className="text-sm font-semibold">{selectedProduct.currentStock} {selectedProduct.unitOfMeasurement}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm font-medium">Estoque Mínimo:</span>
              <span className="text-sm">{selectedProduct.minimumStock} {selectedProduct.unitOfMeasurement}</span>
            </div>
          </div>
        )}
        
        {/* Output Type and Quantity */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="outputType" className="block text-sm font-medium text-gray-700">
              Tipo de saída *
            </label>
            <select
              id="outputType"
              name="outputType"
              value={formData.outputType}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="SALE">Oferta</option>
              <option value="LOSS">Perda</option>
              <option value="INTERNAL_USE">Uso Interno</option>
              <option value="DONATION">Doação</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantidade *
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              className={`mt-1 block w-full border ${errors.quantity ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
          </div>
        </div>
        
        {/* Additional Information */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="outputDate" className="block text-sm font-medium text-gray-700">
              Data de saída *
            </label>
            <input
              type="date"
              id="outputDate"
              name="outputDate"
              value={formData.outputDate}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              className={`mt-1 block w-full border ${errors.outputDate ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.outputDate && <p className="mt-1 text-sm text-red-600">{errors.outputDate}</p>}
          </div>
        </div>
        
        {/* Observation */}
        <div>
          <label htmlFor="observation" className="block text-sm font-medium text-gray-700">
            Observação
          </label>
          <textarea
            id="observation"
            name="observation"
            rows={3}
            value={formData.observation}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={() => navigate('/inventory/outputs')}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Registrar saída
          </button>
        </div>
      </form>
    </div>
  );
};

export default InventoryOutputForm;
