
import { Product, Supplier } from '../types';

// Sample data to populate our in-memory database
export const seedProducts: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Laptop Dell XPS',
    description: 'High-end laptop with i7 processor and 16GB RAM',
    unitPrice: 1299.99,
    unitOfMeasurement: 'UN',
    currentStock: 15,
    minimumStock: 5,
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with long battery life',
    unitPrice: 24.99,
    unitOfMeasurement: 'UN',
    currentStock: 45,
    minimumStock: 10,
  },
  {
    name: 'Office Paper',
    description: 'A4 size, 500 sheets per pack',
    unitPrice: 5.99,
    unitOfMeasurement: 'UN',
    currentStock: 100,
    minimumStock: 30,
  },
  {
    name: 'LED Monitor 24"',
    description: 'Full HD monitor with HDMI and DisplayPort',
    unitPrice: 199.99,
    unitOfMeasurement: 'UN',
    currentStock: 8,
    minimumStock: 3,
  },
  {
    name: 'Printer Ink',
    description: 'Black ink cartridge compatible with HP printers',
    unitPrice: 29.99,
    unitOfMeasurement: 'UN',
    currentStock: 12,
    minimumStock: 5,
  }
];

export const seedSuppliers: Omit<Supplier, 'id' | 'createdAt'>[] = [
  {
    name: 'Tech Solutions Inc',
    cnpj: '12.345.678/0001-90',
    phone: '(11) 98765-4321',
    email: 'contact@techsolutions.com',
  },
  {
    name: 'Office Supplies Co',
    cnpj: '98.765.432/0001-10',
    phone: '(11) 91234-5678',
    email: 'sales@officesupplies.com',
  },
  {
    name: 'Hardware Distributors',
    cnpj: '45.678.901/0001-23',
    phone: '(21) 99876-5432',
    email: 'info@hardwaredist.com',
  }
];
