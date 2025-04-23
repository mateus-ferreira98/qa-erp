describe('Fornececdores', () => {
    beforeEach(() => {
        cy.on('uncaught:exception', (err) => {
          console.log('Erro encontrado:', err.message)
          return false 
        })
    
        cy.wait(2000)
        cy.visit('http://localhost:8080/suppliers')
    })

    describe('Adicionar Fornecedores', () => {
        beforeEach(() => {
            cy.contains('button', 'Adicionar novo fornecedor').click()
        })

        it('Adicionar fornecedor vazio', () => {
            cy.contains('button', 'Criar fornecedor').click()
            
            cy.get('[data-component-line="109"]')
              .should('contain', 'O nome do fornecedor é obrigatório')
            
            cy.get('[data-component-line="125"]')
                .should('contain', 'CNPJ é obrigatório')
            
            cy.get('[data-component-line="143"]')
              .should('contain', 'O e-mail é obrigatório')
        })

        it('Adicionar fornecedor válido', () => {
            cy.get('#name').type('Amazon LTDA')
            cy.get('#cnpj').type('35.814.798/0001-62')
            cy.get('#email').type('amazon@email.com')
            cy.get('#phone').type('(62) 99999-9999')

            cy.contains('button', 'Criar fornecedor').click()

            cy.get('main.p-6')
              .should('contain', 'Amazon LTDA')

        })

        it('Adicionar CNPJ sem mascara', () => {
            cy.get('#name').type('Jogos LTDA')
            cy.get('#cnpj').type('34104798000118')
            cy.get('#email').type('jogos@email.com')
            cy.get('#phone').type('(62) 99999-9999')

            cy.contains('button', 'Criar fornecedor').click()

            cy.get('main.p-6')
              .should('contain', '34.104.798/0001-18')
        })

        it('Adicionar e-mail inválido', () => {
            const email = 'exemploemail.com'

            cy.get('#name').type('Exemplo LTDA')
            cy.get('#cnpj').type('35.124.128/002-62')
            cy.get('#email').type(email)
            cy.get('#phone').type('(62) 99999-9999')

            cy.contains('button', 'Criar fornecedor').click()

            cy.get('main.p-6')
              .should('exist', `Inclua um "@" no endereço de e-mail. "${email} está com um "@" faltando."`)
        })

        it('Adicionar telefone sem máscara', () => {
            cy.get('#name').type('Exemplo02 LTDA')
            cy.get('#cnpj').type('35.124.128/002-61')
            cy.get('#email').type('email@email.com')
            cy.get('#phone').type('62999999999')

            cy.contains('button', 'Criar fornecedor').click()

            cy.get('main.p-6')
            .should('contain', '(62) 99999-9999')
        })

        it('Adicionar telefone inválido', () => {
            cy.get('#name').type('Exemplo03 LTDA')
            cy.get('#cnpj').type('35.124.128/002-61')
            cy.get('#email').type('email@email.com')
            cy.get('#phone').type('a')

            cy.contains('button', 'Criar fornecedor').click()

            cy.get('[data-component-line="158"]')
              .should('contain', 'O telefone está inválido')
        })
    })

    describe('Editar fornecedor', () => {
        beforeEach(() => {
          cy.get(':nth-child(1) > .text-right > .flex > .text-blue-600 > .lucide').click()       
        })

        it('Editar fornecedor vazio', () => {
            cy.get('#name').clear()
            cy.get('#cnpj').clear()
            cy.get('#email').clear()
            cy.get('#phone').clear()

            cy.contains('button', 'Atualizar fornecedor').click()
            
            cy.get('[data-component-line="109"]')
              .should('contain', 'O nome do fornecedor é obrigatório')
            
            cy.get('[data-component-line="125"]')
                .should('contain', 'CNPJ é obrigatório')
            
            cy.get('[data-component-line="143"]')
              .should('contain', 'O e-mail é obrigatório')
        })

        it('Editar fornecedor válido', () => {
            cy.get('#name').clear().type('Atualizado LTDA')
            cy.get('#cnpj').clear().type('35.124.128/002-62')

            cy.contains('button', 'Atualizar fornecedor').click()
            
            cy.get('main.p-6')
              .should('contain', 'Atualizado LTDA')
              .and('contain', '35.124.128/002-62')          
        })
    })

    describe.only('Excluir fornecedor', () => {
        it('Excluindo', () => {
            cy.get(':nth-child(1) > .text-right > .flex > .text-red-600 > .lucide').click()
            
            cy.contains('button', 'Confirmar').click()
      
            cy.get('.go2072408551')
              .should('contain', 'Fornecedor excluído com sucesso!')
          })
      
          it('Cancelando', () => {
            cy.get(':nth-child(1) > .text-right > .flex > .text-red-600 > .lucide').click()
            
            cy.contains('button', 'Cancelar').click()
      
            cy.get('main.p-6')
            .should('contain', 'Tech Solutions Inc')
          })
    })
})