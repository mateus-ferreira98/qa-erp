describe('Inventário Saída Estoque', () => {
    beforeEach(() => {
        cy.on('uncaught:exception', (err) => {
          console.log('Erro encontrado:', err.message)
          return false 
        })
    
        cy.wait(2000)
        cy.visit('http://localhost:8080/inventory/outputs')
    })
    
    it('Adicionar saída vazio', () => {
        cy.contains('button', 'Registrar nova saída').click()
        cy.contains('button', 'Registrar saída').click()

        cy.contains('O produto é obrigatório').should('be.visible')

        cy.contains('O tipo de saída é obrigatório').should('be.visible')

        cy.contains('A quantidade é obrigatória').should('be.visible')

        cy.contains('A data de saída é obrigatória').should('be.visible')
    })

    it('Adicionar saída de estoque válida', () => {
        cy.contains('button', 'Registrar nova saída').click()

        cy.get('#productId').select('Laptop Dell XPS (UN) - In Stock: 15')
        cy.get('#outputType').select('Oferta')
        cy.get('#quantity').type(2)
        cy.get('#outputDate').type('2025-04-27')

        cy.contains('button', 'Registrar saída').click()

        cy.contains('Saída de estoque salvo com sucesso!').should('be.visible')
        cy.contains('Laptop Dell XPS (UN) - In Stock: 15').should('be.visible')
        cy.contains('Oferta').should('be.visible')
        cy.contains('2').should('be.visible')
        cy.contains('Apr 27, 2025').should('be.visible')
        
    })

    it('Campo quantidade não pode ser menor que 1', () => {
        cy.contains('button', 'Registrar nova saída').click()

        cy.get('#quantity').type('{backspace}').should('have.value', '1')

    })

    it('Verificar estoque atual e estoque mínimo', () => {
        cy.contains('button', 'Registrar nova saída').click()

        cy.get('#productId').select('Laptop Dell XPS (UN) - In Stock: 15')

        cy.contains('Estoque atual:').should('be.visible')
        cy.contains('15 UN').should('be.visible')

        cy.contains('Estoque Mínimo:').should('be.visible')
        cy.contains('5 UN').should('be.visible')
    })

    
})

describe('Fazendo pesquisas', () => {
    beforeEach(() => {
        cy.on('uncaught:exception', (err) => {
          console.log('Erro encontrado:', err.message)
          return false 
        })
    
        cy.wait(2000)
        cy.visit('http://localhost:8080/inventory/outputs')    
    })

    it.only('Fazendo uma pesquisa de oferta', () => {
        cy.contains('button', 'Registrar nova saída').click()

        cy.get('#productId').select('Laptop Dell XPS (UN) - In Stock: 15')
        cy.get('#outputType').select('Oferta')
        cy.get('#quantity').type(2)
        cy.get('#outputDate').type('2025-04-27')

        cy.contains('button', 'Registrar saída').click()

        cy.get('[data-component-line="80"] > .w-full')

        cy.contains('Laptop Dell XPS (UN) - In Stock: 15').should('be.visible')
    })

    it('Fazendo uma pesquisa com item inexistente', () => {
        cy.get('.mt-4 > .w-full').type('Lalalalau')

        cy.contains('Nenhuma saída de inventário encontrada').should('be.visible')
    })
})