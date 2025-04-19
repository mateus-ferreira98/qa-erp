
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DatabaseProvider, useDatabase } from '../contexts/DatabaseContext';
import MainLayout from '../components/layout/MainLayout';
import Dashboard from '../components/dashboard/Dashboard';
import ProductList from '../components/products/ProductList';
import ProductForm from '../components/products/ProductForm';
import SupplierList from '../components/suppliers/SupplierList';
import SupplierForm from '../components/suppliers/SupplierForm';
import InventoryInputList from '../components/inventory/InventoryInputList';
import InventoryInputForm from '../components/inventory/InventoryInputForm';
import InventoryOutputList from '../components/inventory/InventoryOutputList';
import InventoryOutputForm from '../components/inventory/InventoryOutputForm';

// Import seed data
import { seedProducts, seedSuppliers } from '../data/seedData';

const App: React.FC = () => {
  // Database initialization will be handled by the DatabaseProvider

  return (
    <DatabaseProvider>
      <AppContent />
    </DatabaseProvider>
  );
};

const AppContent: React.FC = () => {
  const { dispatch } = useDatabase();

  // Initialize with seed data
  useEffect(() => {
    // Add seed products
    seedProducts.forEach(product => {
      dispatch({
        type: 'ADD_PRODUCT',
        payload: product
      });
    });
    
    // Add seed suppliers
    seedSuppliers.forEach(supplier => {
      dispatch({
        type: 'ADD_SUPPLIER',
        payload: supplier
      });
    });
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          
          {/* Products Routes */}
          <Route path="products" element={<ProductList />} />
          <Route path="products/new" element={<ProductForm mode="create" />} />
          <Route path="products/edit/:id" element={<ProductForm mode="edit" />} />
          
          {/* Suppliers Routes */}
          <Route path="suppliers" element={<SupplierList />} />
          <Route path="suppliers/new" element={<SupplierForm mode="create" />} />
          <Route path="suppliers/edit/:id" element={<SupplierForm mode="edit" />} />
          
          {/* Inventory Routes */}
          <Route path="inventory/inputs" element={<InventoryInputList />} />
          <Route path="inventory/inputs/new" element={<InventoryInputForm />} />
          <Route path="inventory/outputs" element={<InventoryOutputList />} />
          <Route path="inventory/outputs/new" element={<InventoryOutputForm />} />
          
          {/* Catch all and redirect to dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
