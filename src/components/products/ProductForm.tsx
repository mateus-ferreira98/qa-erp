import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDatabase } from '@/contexts/DatabaseContext';
import { Product } from '@/types';
import toast from 'react-hot-toast';

interface ProductFormProps {
  mode: 'create' | 'edit';
}

const ProductForm: React.FC<ProductFormProps> = ({ mode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useDatabase();
  
  const [formData, setFormData] = useState<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>({
    name: '',
    description: '',
    unitPrice: 0,
    unitOfMeasurement: '',
    currentStock: 0,
    minimumStock: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // If editing, load product data
  useEffect(() => {
    if (mode === 'edit' && id) {
      const product = state.products.find(p => p.id === Number(id));
      if (product) {
        setFormData({
          name: product.name,
          description: product.description,
          unitPrice: product.unitPrice,
          unitOfMeasurement: product.unitOfMeasurement,
          currentStock: product.currentStock,
          minimumStock: product.minimumStock,
        });

        setFormattedPrice(formatCurrencyInput(product.unitPrice.toString()));
      }
    }
  }, [mode, id, state.products]);

  const formatCurrencyInput = (value: string): string => {
    const cleaned = value.replace(/\D/g, ''); // só números
    const number = parseFloat(cleaned) / 100;
  
    if (isNaN(number)) return '';
  
    return number.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const [formattedPrice, setFormattedPrice] = useState('R$ 0,00');

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
  
    const cleaned = rawValue.replace(/\D/g, '');
    const number = parseFloat(cleaned) / 100;
  
    setFormData(prev => ({
      ...prev,
      unitPrice: isNaN(number) ? 0 : number
    }));
  
    setFormattedPrice(formatCurrencyInput(rawValue));
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Convert numeric values
    if (['unitPrice', 'currentStock', 'minimumStock'].includes(name)) {
      const numericValue = value.replace(/[^0-9]/g, '');

      setFormData(prev => ({
        ...prev,
        [name]: numericValue
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
    
    if (!formData.name.trim()) {
      newErrors.name = 'O nome do produto é obrigatório';
    }
    
    if (formData.unitPrice <= 0) {
      newErrors.unitPrice = 'O preço deve ser maior que 0';
    }
    
    if (!formData.unitOfMeasurement) {
      newErrors.unitOfMeasurement = 'A unidade de medida é obrigatória';
    }

    if (!formData.currentStock) {
      newErrors.currentStock = 'O estoque atual deve ser obrigatório';
    }

    if (formData.currentStock <= 0) {
      newErrors.currentStock = 'O estoque atual deve ser maior que 0';
    }
    
    if (formData.minimumStock < 0) {
      newErrors.minimumStock = 'O estoque mínimo não pode ser negativo';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    if (mode === 'create') {
      dispatch({
        type: 'ADD_PRODUCT',
        payload: formData
      });
      toast.success('Produto criado com sucesso!');
      navigate('/products');
    } else if (mode === 'edit' && id) {
      const productId = Number(id);
      const existingProduct = state.products.find(p => p.id === productId);
      
      if (existingProduct) {
        dispatch({
          type: 'UPDATE_PRODUCT',
          payload: {
            ...formData,
            id: productId,
            createdAt: existingProduct.createdAt,
            updatedAt: new Date()
          }
        });
        toast.success('Produto atualizado com sucesso!');
        navigate('/products');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          {mode === 'create' ? 'Adicionar novo produto' : 'Editar produto'}
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nome do produto *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
        
        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Descrição
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        {/* Price and Unit */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700">
              Preço unitário*
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="text"
                id="unitPrice"
                name="unitPrice"
                step="0.01"
                min="0"
                value={formattedPrice}
                onChange={handlePriceChange}
                className={`pl-7 block w-full border ${errors.unitPrice ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
            </div>
            {errors.unitPrice && <p className="mt-1 text-sm text-red-600">{errors.unitPrice}</p>}
          </div>
          
          <div>
            <label htmlFor="unitOfMeasurement" className="block text-sm font-medium text-gray-700">
              Unidade de Medida *
            </label>
            <select
              id="unitOfMeasurement"
              name="unitOfMeasurement"
              value={formData.unitOfMeasurement}
              onChange={handleChange}
              className={`mt-1 block w-full border ${errors.unitOfMeasurement ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="">Selecione uma unidade</option>
              <option value="UN">Unidade (UN)</option>
              <option value="KG">Quilograma (KG)</option>
              <option value="L">Litro (L)</option>
              <option value="BOX">Caixa (BOX)</option>
              <option value="PKG">Pacote (PKG)</option>
            </select>
            {errors.unitOfMeasurement && <p className="mt-1 text-sm text-red-600">{errors.unitOfMeasurement}</p>}
          </div>
        </div>
        
        {/* Stock Information */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="currentStock" className="block text-sm font-medium text-gray-700">
              Estoque atual *
            </label>
            <input
              type="text"
              id="currentStock"
              name="currentStock"
              value={formData.currentStock}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
             {errors.currentStock && <p className="mt-1 text-sm text-red-600">{errors.currentStock}</p>}
          </div>
          
          <div>
            <label htmlFor="minimumStock" className="block text-sm font-medium text-gray-700">
              Estoque mínimo
            </label>
            <input
              type="number"
              id="minimumStock"
              name="minimumStock"
              min="0"
              value={formData.minimumStock}
              onChange={handleChange}
              className={`mt-1 block w-full border ${errors.minimumStock ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.minimumStock && <p className="mt-1 text-sm text-red-600">{errors.minimumStock}</p>}
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            {mode === 'create' ? 'Criar produto' : 'Atualizar produto'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
