import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from './pages/Index';
import { Toaster } from 'react-hot-toast';

// Create a query client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Index />
    <Toaster position="bottom-right" /> 
  </QueryClientProvider>
);

export default App;
