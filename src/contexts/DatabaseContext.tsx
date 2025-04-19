
import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import {
  Product,
  StockMovement,
  Supplier,
  InventoryInput,
  InventoryOutput,
} from '../types';

// Database state interface
interface DatabaseState {
  products: Product[];
  stockMovements: StockMovement[];
  suppliers: Supplier[];
  inventoryInputs: InventoryInput[];
  inventoryOutputs: InventoryOutput[];
  nextIds: {
    product: number;
    stockMovement: number;
    supplier: number;
    inventoryInput: number;
    inventoryOutput: number;
  };
}

// Initial state of our in-memory database
const initialState: DatabaseState = {
  products: [],
  stockMovements: [],
  suppliers: [],
  inventoryInputs: [],
  inventoryOutputs: [],
  nextIds: {
    product: 1,
    stockMovement: 1,
    supplier: 1,
    inventoryInput: 1,
    inventoryOutput: 1,
  },
};

// Action types
type ActionType =
  | { type: 'ADD_PRODUCT'; payload: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: number }
  | { type: 'ADD_STOCK_MOVEMENT'; payload: Omit<StockMovement, 'id'> }
  | { type: 'ADD_SUPPLIER'; payload: Omit<Supplier, 'id' | 'createdAt'> }
  | { type: 'UPDATE_SUPPLIER'; payload: Supplier }
  | { type: 'DELETE_SUPPLIER'; payload: number }
  | { type: 'ADD_INVENTORY_INPUT'; payload: Omit<InventoryInput, 'id'> }
  | { type: 'ADD_INVENTORY_OUTPUT'; payload: Omit<InventoryOutput, 'id'> };

// Reducer function
const databaseReducer = (state: DatabaseState, action: ActionType): DatabaseState => {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      const newProduct: Product = {
        ...action.payload,
        id: state.nextIds.product,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return {
        ...state,
        products: [...state.products, newProduct],
        nextIds: {
          ...state.nextIds,
          product: state.nextIds.product + 1,
        },
      };
    }
    case 'UPDATE_PRODUCT': {
      const updatedProduct = { ...action.payload, updatedAt: new Date() };
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === updatedProduct.id ? updatedProduct : p
        ),
      };
    }
    case 'DELETE_PRODUCT': {
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };
    }
    case 'ADD_STOCK_MOVEMENT': {
      const newMovement: StockMovement = {
        ...action.payload,
        id: state.nextIds.stockMovement,
      };

      // Update product stock based on movement
      const updatedProducts = state.products.map((product) => {
        if (product.id === newMovement.productId) {
          const stockChange = newMovement.movementType === 'INPUT'
            ? newMovement.quantity
            : -newMovement.quantity;
          
          return {
            ...product,
            currentStock: Math.max(0, product.currentStock + stockChange),
            updatedAt: new Date(),
          };
        }
        return product;
      });

      return {
        ...state,
        stockMovements: [...state.stockMovements, newMovement],
        products: updatedProducts,
        nextIds: {
          ...state.nextIds,
          stockMovement: state.nextIds.stockMovement + 1,
        },
      };
    }
    case 'ADD_SUPPLIER': {
      const newSupplier: Supplier = {
        ...action.payload,
        id: state.nextIds.supplier,
        createdAt: new Date(),
      };
      return {
        ...state,
        suppliers: [...state.suppliers, newSupplier],
        nextIds: {
          ...state.nextIds,
          supplier: state.nextIds.supplier + 1,
        },
      };
    }
    case 'UPDATE_SUPPLIER': {
      return {
        ...state,
        suppliers: state.suppliers.map((s) =>
          s.id === action.payload.id ? action.payload : s
        ),
      };
    }
    case 'DELETE_SUPPLIER': {
      return {
        ...state,
        suppliers: state.suppliers.filter((s) => s.id !== action.payload),
      };
    }
    case 'ADD_INVENTORY_INPUT': {
      const newInput: InventoryInput = {
        ...action.payload,
        id: state.nextIds.inventoryInput,
      };

      // Create a corresponding stock movement
      const stockMovement: Omit<StockMovement, 'id'> = {
        productId: newInput.productId,
        movementType: 'INPUT',
        quantity: newInput.quantity,
        movementDate: newInput.entryDate,
        origin: 'Purchase',
        observation: `Input from supplier ID: ${newInput.supplierId}. Invoice: ${newInput.invoice}`,
      };

      // Find the product to update stock
      const updatedProducts = state.products.map((product) => {
        if (product.id === newInput.productId) {
          return {
            ...product,
            currentStock: product.currentStock + newInput.quantity,
            updatedAt: new Date(),
          };
        }
        return product;
      });

      return {
        ...state,
        inventoryInputs: [...state.inventoryInputs, newInput],
        stockMovements: [
          ...state.stockMovements,
          { ...stockMovement, id: state.nextIds.stockMovement },
        ],
        products: updatedProducts,
        nextIds: {
          ...state.nextIds,
          inventoryInput: state.nextIds.inventoryInput + 1,
          stockMovement: state.nextIds.stockMovement + 1,
        },
      };
    }
    case 'ADD_INVENTORY_OUTPUT': {
      const newOutput: InventoryOutput = {
        ...action.payload,
        id: state.nextIds.inventoryOutput,
      };

      // Create a corresponding stock movement
      const stockMovement: Omit<StockMovement, 'id'> = {
        productId: newOutput.productId,
        movementType: 'OUTPUT',
        quantity: newOutput.quantity,
        movementDate: newOutput.outputDate,
        origin: newOutput.outputType,
        observation: newOutput.observation,
      };

      // Find the product to update stock
      const updatedProducts = state.products.map((product) => {
        if (product.id === newOutput.productId) {
          return {
            ...product,
            currentStock: Math.max(0, product.currentStock - newOutput.quantity),
            updatedAt: new Date(),
          };
        }
        return product;
      });

      return {
        ...state,
        inventoryOutputs: [...state.inventoryOutputs, newOutput],
        stockMovements: [
          ...state.stockMovements,
          { ...stockMovement, id: state.nextIds.stockMovement },
        ],
        products: updatedProducts,
        nextIds: {
          ...state.nextIds,
          inventoryOutput: state.nextIds.inventoryOutput + 1,
          stockMovement: state.nextIds.stockMovement + 1,
        },
      };
    }
    default:
      return state;
  }
};

// Create context
type DatabaseContextType = {
  state: DatabaseState;
  dispatch: React.Dispatch<ActionType>;
};

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

// Provider component
export const DatabaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(databaseReducer, initialState);

  return (
    <DatabaseContext.Provider value={{ state, dispatch }}>
      {children}
    </DatabaseContext.Provider>
  );
};

// Custom hook to use the database context
export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};
