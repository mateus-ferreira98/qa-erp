describe('Inventário Entrada', () => {
    beforeEach(() => {
        cy.on('uncaught:exception', (err) => {
          console.log('Erro encontrado:', err.message)
          return false 
        })
    
        cy.wait(2000)
        cy.visit('http://localhost:8080/inventory/inputs')
    })

    it('Adicionar entrada vazio', () => {
        cy.contains('button', 'Registrar nova entrada').click()
        cy.contains('button', 'Registrar entrada').click()

        cy.contains('O produto é obrigatório')
          .should('be.visible')

        cy.contains('O fornecedor é obrigatório')
          .should('be.visible')
        
        cy.contains('A quantidade é obrigatória')
          .should('be.visible')

        cy.contains('A data de entrada é obrigatória')
          .should('be.visible')

        cy.contains('O número da fatura é obrigatório')
          .should('be.visible')
    })

    it('Adicionar entrada válida', () => {
        cy.contains('button', 'Registrar nova entrada').click()

        cy.get('#productId').select('Laptop Dell XPS (UN)')
        cy.get('#supplierId').select('Tech Solutions Inc')
        cy.get('#quantity').type(1)
        cy.get('#entryDate').type('2025-04-26')
        cy.get('#invoice').type(209872)

        cy.contains('button', 'Registrar entrada').click()
        cy.contains('Entrada criado com sucesso!')

        cy.contains('Apr 26, 2025').should('be.visible')

        cy.contains('Laptop Dell XPS').should('be.visible')

        cy.contains('Tech Solutions Inc').should('be.visible')

        cy.contains('1').should('be.visible')

        cy.contains('R$ 1.299,00').should('be.visible')
    })

    it('Verificar custo total', () => {
        const quantidade = 2;
        const preco = 1299.99;

        cy.contains('button', 'Registrar nova entrada').click()

        cy.get('#productId').select('Laptop Dell XPS (UN)')

        cy.get('#quantity').type(quantidade)

        cy.contains(`Custo total: ${quantidade * preco}`)
          .should('be.visible')
    })

    it('Verificar campo preço unitário desabilitado', () => {
      cy.contains('button', 'Registrar nova entrada').click()

      cy.get('#unitPrice').should('be.disabled')
    })
    
    it('Verificar se número aceita campos não númericos', () => {
      cy.contains('button', 'Registrar nova entrada').click()

      cy.get('#invoice').type('abcdef').should('have.value', '') 
    })

    it('Verificar se o campo quantidade não aceita números meneros que 1', () => {
      cy.contains('button', 'Registrar nova entrada').click()

      cy.get('#quantity').type('{backspace}').should('have.value', '1')
    })

    it('Pesquisando itens válidos', () => {
      cy.contains('button', 'Registrar nova entrada').click()

        cy.get('#productId').select('Laptop Dell XPS (UN)')
        cy.get('#supplierId').select('Tech Solutions Inc')
        cy.get('#quantity').type(1)
        cy.get('#entryDate').type('2025-04-26')
        cy.get('#invoice').type(209872)

        cy.contains('button', 'Registrar entrada').click()

      cy.get('.mt-4 > .w-full').type('Laptop Dell XPS')
      
      cy.contains('Laptop Dell XPS').should('be.visible')
    })

    it('Pesquisando itens não existentes', () => {
       cy.get('.mt-4 > .w-full').type('Acer Notebook')

       cy.contains('Nenhuma entrada de inventário encontrada').should('be.visible')
    })
})
