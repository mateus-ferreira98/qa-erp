/// <reference types="cypress" />

Cypress.Commands.add('criarFornecedor', (fornecedor = {}) => {
  // Nome
  cy.get('#name').clear()
  if (fornecedor.nome) {
    cy.get('#name').type(fornecedor.nome)
  }

  // CNPJ
  cy.get('#cnpj').clear()
  if (fornecedor.cnpj) {
     cy.get('#cnpj').type(fornecedor.cnpj)
  }

  // Email
  cy.get('#email').clear()
  if (fornecedor.email) {
    cy.get('#email').type(fornecedor.email)
  }

  // Telefone
  cy.get('#phone').clear()
  if (fornecedor.telefone) {
    cy.get('#phone').type(fornecedor.telefone)
  }
  
  cy.contains('button', 'Criar fornecedor').click()
})

Cypress.Commands.add('criarProduto', (produto = {}) => {
    // Nome
    cy.get('#name').clear()
    if (produto.nome) {
      cy.get('#name').type(produto.nome)
    }

    // Descrição
    cy.get('#description').clear()
    if (produto.descricao) {
      cy.get('#description').type(produto.descricao)
    }

    // Preço
    cy.get('#unitPrice').clear()
    if (produto.preco) {
      cy.get('#unitPrice').type(produto.preco)
    }

    // Unidade
    if (produto.unidade) {
      cy.get('#unitOfMeasurement').select(produto.unidade)
    }

    // Estoque atual
    cy.get('#currentStock').clear()
    if (produto.estoqueAtual) {
      cy.get('#currentStock').type(produto.estoqueAtual)
    }

    // Estoque mínimo
    cy.get('#minimumStock').clear()
    if (produto.estoqueMinimo) {
      cy.get('#minimumStock').type(produto.estoqueMinimo)
    }

    cy.contains('button', 'Criar produto').click()  
})
