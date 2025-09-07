/// <reference types="cypress" />

// Criar fornecedor
Cypress.Commands.add('criarFornecedor', (fornecedor = {}) => {
  cy.setValue('#name', fornecedor.nome)
  cy.setValue('#cnpj', fornecedor.cnpj)
  cy.setValue('#email', fornecedor.email)
  cy.setValue('#phone', fornecedor.telefone)

  cy.contains('button', 'Criar fornecedor').click()
})

// Editar fornecedor
Cypress.Commands.add('editarFornecedor', (fornecedor = {}) => {
  cy.updateValue('#name', fornecedor.nome)
  cy.updateValue('#cnpj', fornecedor.cnpj)
  cy.updateValue('#email', fornecedor.email)
  cy.updateValue('#phone', fornecedor.telefone)

  cy.contains('button', 'Atualizar fornecedor').click()
})
