
// Data Types
export type Product = {
  id: number;
  name: string;
  description: string;
  unitPrice: number;
  unitOfMeasurement: string; // ex: UN, KG, L
  currentStock: number;
  minimumStock: number;
  createdAt: Date;
  updatedAt: Date;
};

export type MovementType = 'INPUT' | 'OUTPUT';

export type StockMovement = {
  id: number;
  productId: number;
  movementType: MovementType;
  quantity: number;
  movementDate: Date;
  origin: string; // Ex: Purchase, Sale, Adjustment
  observation: string;
};

export type Supplier = {
  id: number;
  name: string;
  cnpj: string;
  phone: string;
  email: string;
  createdAt: Date;
};

export type InventoryInput = {
  id: number;
  productId: number;
  supplierId: number;
  quantity: number;
  unitPrice: number;
  entryDate: Date;
  invoice: number;
  observation: string;
};

export type OutputType = 'SALE' | 'LOSS' | 'INTERNAL_USE' | 'DONATION';

export type InventoryOutput = {
  id: number;
  productId: number;
  quantity: number;
  outputType: OutputType;
  outputDate: Date;
  observation: string;
};
