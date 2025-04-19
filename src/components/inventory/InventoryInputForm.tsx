import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDatabase } from '@/contexts/DatabaseContext';
import { formatCurrency } from '@/utils/format';

const InventoryInputForm: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useDatabase();
  
  const [formData, setFormData] = useState({
    productId: '',
    supplierId: '',
    quantity: 1,
    unitPrice: 0,
    entryDate: new Date().toISOString().split('T')[0],
    invoice: '',
    observation: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Convert numeric values
    if (['quantity', 'unitPrice'].includes(name)) {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? 0 : Number(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // If product is selected, set the default unit price
    if (name === 'productId' && value) {
      const product = state.products.find(p => p.id === Number(value));
      if (product) {
        setFormData(prev => ({
          ...prev,
          unitPrice: product.unitPrice
        }));
      }
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.productId) {
      newErrors.productId = 'O produto é obrigatório';
    }
    
    if (!formData.supplierId) {
      newErrors.supplierId = 'O fornecedor é obrigatório';
    }
    
    if (formData.quantity <= 0) {
      newErrors.quantity = 'A quantidade deve ser maior que 0';
    }
    
    if (formData.unitPrice < 0) {
      newErrors.unitPrice = 'O preço não pode ser negativo';
    }
    
    if (!formData.entryDate) {
      newErrors.entryDate = 'A data de entrada é obrigatória';
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
      type: 'ADD_INVENTORY_INPUT',
      payload: {
        productId: Number(formData.productId),
        supplierId: Number(formData.supplierId),
        quantity: formData.quantity,
        unitPrice: formData.unitPrice,
        entryDate: new Date(formData.entryDate),
        invoice: formData.invoice,
        observation: formData.observation,
      }
    });
    
    navigate('/inventory/inputs');
  };

  // Calculate total cost
  const totalCost = formData.quantity * formData.unitPrice;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          Registrar entrada de inventário
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* Product and Supplier Selection */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                  {product.name} ({product.unitOfMeasurement})
                </option>
              ))}
            </select>
            {errors.productId && <p className="mt-1 text-sm text-red-600">{errors.productId}</p>}
          </div>
          
          <div>
            <label htmlFor="supplierId" className="block text-sm font-medium text-gray-700">
              Fornecedor *
            </label>
            <select
              id="supplierId"
              name="supplierId"
              value={formData.supplierId}
              onChange={handleChange}
              className={`mt-1 block w-full border ${errors.supplierId ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="">Selecione um fornecedor</option>
              {state.suppliers.map(supplier => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
            {errors.supplierId && <p className="mt-1 text-sm text-red-600">{errors.supplierId}</p>}
          </div>
        </div>
        
        {/* Quantity and Unit Price */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
          
          <div>
            <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700">
              Preço unitário *
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="unitPrice"
                name="unitPrice"
                step="0.01"
                min="0"
                value={formData.unitPrice}
                onChange={handleChange}
                className={`pl-7 block w-full border ${errors.unitPrice ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
            </div>
            {errors.unitPrice && <p className="mt-1 text-sm text-red-600">{errors.unitPrice}</p>}
          </div>
        </div>
        
        {/* Total Cost (Calculated) */}
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Custo total:</span>
            <span className="text-lg font-semibold text-blue-600">{formatCurrency(totalCost)}</span>
          </div>
        </div>
        
        {/* Additional Information */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="entryDate" className="block text-sm font-medium text-gray-700">
              Data de entrada *
            </label>
            <input
              type="date"
              id="entryDate"
              name="entryDate"
              value={formData.entryDate}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              className={`mt-1 block w-full border ${errors.entryDate ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.entryDate && <p className="mt-1 text-sm text-red-600">{errors.entryDate}</p>}
          </div>
          
          <div>
            <label htmlFor="invoice" className="block text-sm font-medium text-gray-700">
               Número da fatura
            </label>
            <input
              type="text"
              id="invoice"
              name="invoice"
              value={formData.invoice}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
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
            onClick={() => navigate('/inventory/inputs')}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Registrar entrada
          </button>
        </div>
      </form>
    </div>
  );
};

export default InventoryInputForm;
