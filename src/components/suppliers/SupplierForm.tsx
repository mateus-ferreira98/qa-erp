import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDatabase } from '@/contexts/DatabaseContext';
import { Supplier } from '@/types';
import toast from 'react-hot-toast';

interface SupplierFormProps {
  mode: 'create' | 'edit';
}

const SupplierForm: React.FC<SupplierFormProps> = ({ mode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useDatabase();
  
  const [formData, setFormData] = useState<Omit<Supplier, 'id' | 'createdAt'>>({
    name: '',
    cnpj: '',
    phone: '',
    email: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // If editing, load supplier data
  useEffect(() => {
    if (mode === 'edit' && id) {
      const supplier = state.suppliers.find(s => s.id === Number(id));
      if (supplier) {
        setFormData({
          name: supplier.name,
          cnpj: supplier.cnpj,
          phone: supplier.phone,
          email: supplier.email,
        });
      }
    }
  }, [mode, id, state.suppliers]);

  // Função para formatar o CNPJ
  const maskCNPJ = (value: string): string => {
    // Remove todos os caracteres não numéricos
    const cnpjOnly = value.replace(/\D/g, '');
    
    // Limita a 14 dígitos
    const cnpjLimited = cnpjOnly.slice(0, 14);
    
    // Aplica a formatação de CNPJ: XX.XXX.XXX/XXXX-XX
    let maskedCNPJ = '';
    
    if (cnpjLimited.length > 0) {
      maskedCNPJ = cnpjLimited.replace(
        /^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2}).*/, 
        (_, p1, p2, p3, p4, p5) => {
          let result = '';
          if (p1) result += p1;
          if (p2) result += (p1 ? '.' : '') + p2;
          if (p3) result += (p2 ? '.' : '') + p3;
          if (p4) result += (p3 ? '/' : '') + p4;
          if (p5) result += (p4 ? '-' : '') + p5;
          return result;
        }
      );
    }
    
    return maskedCNPJ;
  };

  
const validateCNPJ = (cnpj: string): boolean => {
  // Remove caracteres não numéricos e verifica se tem 14 dígitos
  const cnpjClean = cnpj.replace(/\D/g, '');
  return cnpjClean.length === 14;
};

// Função simplificada para validar telefone - apenas verifica se tem 10 ou 11 dígitos
const validatePhone = (phone: string): boolean => {
  // Remove caracteres não numéricos e verifica se tem 10 ou 11 dígitos
  const phoneClean = phone.replace(/\D/g, '');
  return phoneClean.length === 10 || phoneClean.length === 11;
};

  // Máscara para telefone
  const maskPhone = (value: string): string => {
    // Remove todos os caracteres não numéricos
    const phoneOnly = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos (DDD + número)
    const phoneLimited = phoneOnly.slice(0, 11);
    
    // Aplica a formatação de telefone: (XX) XXXXX-XXXX
    let maskedPhone = '';
    
    if (phoneLimited.length > 0) {
      maskedPhone = phoneLimited.replace(
        /^(\d{0,2})(\d{0,5})(\d{0,4}).*/, 
        (_, ddd, prefix, suffix) => {
          let result = '';
          if (ddd) result += `(${ddd}`;
          if (prefix) result += (ddd ? ') ' : '(') + prefix;
          if (suffix) result += (prefix ? '-' : '') + suffix;
          return result;
        }
      );
    }
    
    return maskedPhone;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Aplica máscara apropriada com base no nome do campo
    if (name === 'cnpj') {
      setFormData(prev => ({
        ...prev,
        [name]: maskCNPJ(value)
      }));
    } else if (name === 'phone') {
      setFormData(prev => ({
        ...prev,
        [name]: maskPhone(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Remove erros ao digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'O nome do fornecedor é obrigatório';
    }
    
    if (!formData.cnpj.trim()) {
      newErrors.cnpj = 'CNPJ é obrigatório';
    } else if (!validateCNPJ(formData.cnpj)) {
      newErrors.cnpj = 'CNPJ deve ter 14 dígitos';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'O e-mail é obrigatório';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'O e-mail é inválido';
    }

    if (formData.phone.trim() && !validatePhone(formData.phone)) {
      newErrors.phone = 'Telefone deve ter 10 ou 11 dígitos';
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
        type: 'ADD_SUPPLIER',
        payload: formData
      });
      toast.success('Fornecedor criado com sucesso!');
      navigate('/suppliers');
    } else if (mode === 'edit' && id) {
      const supplierId = Number(id);
      const existingSupplier = state.suppliers.find(s => s.id === supplierId);
      
      if (existingSupplier) {
        dispatch({
          type: 'UPDATE_SUPPLIER',
          payload: {
            ...formData,
            id: supplierId,
            createdAt: existingSupplier.createdAt
          }
        });
        toast.success('Fornecedor atualizado com sucesso!');
        navigate('/suppliers');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          {mode === 'create' ? 'Adicionar novo fornecedor' : 'Editar fornecedor'}
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* Supplier Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nome do Fornecedor *
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
        
        {/* CNPJ */}
        <div>
          <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700">
            CNPJ *
          </label>
          <input
            type="text"
            id="cnpj"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
            placeholder="XX.XXX.XXX/XXXX-XX"
            className={`mt-1 block w-full border ${errors.cnpj ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.cnpj && <p className="mt-1 text-sm text-red-600">{errors.cnpj}</p>}
        </div>
        
        {/* Contact Information */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Telefone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(XX) XXXXX-XXXX"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={() => navigate('/suppliers')}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            {mode === 'create' ? 'Criar fornecedor' : 'Atualizar fornecedor'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SupplierForm;