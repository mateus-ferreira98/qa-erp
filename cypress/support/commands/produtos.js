/// <reference types="cypress" />

// Criar produto
Cypress.Commands.add('criarProduto', (produto = {}) => {
  cy.setValue('#name', produto.nome)
  cy.setValue('#description', produto.descricao)
  cy.setValue('#unitPrice', produto.preco)
  cy.setValueSelect('#unitOfMeasurement', produto.unidade)
  cy.setValue('#currentStock', produto.estoqueAtual)
  cy.setValue('#minimumStock', produto.estoqueMinimo)

  cy.contains('button', 'Criar produto').click()
})

// Editar produto
Cypress.Commands.add('editarProduto', (produto = {}) => {
  cy.updateValue('#name', produto.nome)
  cy.updateValue('#description', produto.descricao)
  cy.updateValue('#unitPrice', produto.preco)
  cy.updateValueSelect('#unitOfMeasurement', produto.unidade)
  cy.updateValue('#currentStock', produto.estoqueAtual)
  cy.updateValue('#minimumStock', produto.estoqueMinimo)

  cy.contains('button', 'Atualizar produto').click()
})
