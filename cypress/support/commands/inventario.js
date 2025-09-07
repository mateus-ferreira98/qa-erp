/// <reference types="cypress" />

// Inventário - Entrada
Cypress.Commands.add('adicionarInventarioEntrada', (entrada = {}) => {
  cy.setValueSelect('#productId', entrada.produto)
  cy.setValueSelect('#supplierId', entrada.fornecedor)
  cy.setValue('#quantity', entrada.quantidade)
  cy.setValue('#entryDate', entrada.data)
  cy.setValue('#invoice', entrada.fatura)
  cy.setValue('#observation', entrada.observacao)

  cy.contains('button', 'Registrar entrada').click()
})

// Inventário - Saída
Cypress.Commands.add('adicionarInventarioSaida', (saida = {}) => {
  cy.setValueSelect('#productId', saida.produto)
  cy.setValueSelect('#outputType', saida.tipoSaida)
  cy.setValue('#quantity', saida.quantidade)
  cy.setValue('#outputDate', saida.data)
  cy.setValue('#observation', saida.observacao)

  cy.contains('button', 'Registrar saída').click()
})
