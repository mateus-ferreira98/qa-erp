
// Utility functions for formatting data

// Formatar moeda em Reais (BRL)
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

// Formatar data completa com hora
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'long', // ex.: janeiro
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

// Formatar data curta (sem hora)
export const formatShortDate = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit', // ex.: 07
    day: '2-digit',
  }).format(date);
};


// Generate a unique ID (for local use only)
export const generateId = (): number => {
  return Math.floor(Math.random() * 1000000);
};
