
import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from './pages/Index';

// Create a query client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Index />
  </QueryClientProvider>
);

export default App;
