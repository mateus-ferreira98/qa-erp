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
            cy.criarFornecedor({
              nome: '',
              cnpj: '',
              email: '',
              telefone: ''
            })  
                    
            cy.contains('O nome do fornecedor é obrigatório').should('be.visible')
            cy.contains('CNPJ é obrigatório').should('be.visible')
            cy.contains('O e-mail é obrigatório').should('be.visible')
        })

        it('Adicionar fornecedor válido', () => {
          cy.criarFornecedor({
            nome: 'Amazon LTDA',
            cnpj: '35.814.798/0001-62',
            email: 'amazon@email.com',
            telefone: '(62) 99999-9999'
          })

          cy.get('main.p-6').should('contain', 'Amazon LTDA')
            
          cy.contains('Fornecedor criado com sucesso!').should('be.visible')
        })

        it.only('Adicionar CNPJ sem mascara', () => {
          cy.criarFornecedor({
            nome: 'Jogos LTDA',
            cnpj: '34104798000118',
            email: 'jogos@email.com',
            telefone: '(62) 99999-99999'
          })

          cy.get('main.p-6').should('contain', '34.104.798/0001-18')
        })

        it('Adicionar e-mail faltando @', () => {
          const emailFaltando = 'exemploemail.com'

          cy.criarFornecedor({
            nome: 'Exemplo LTDA',
            cnpj: '35104718000118',
            email: emailFaltando,
            telefone: '(62) 99999-9999'
          })

          cy.get('main.p-6').should('exist', `Inclua um "@" no endereço de e-mail. "${emailFaltando} está com um "@" faltando."`)
        })

        it('Adicionar e-mail inválido', () => {
            cy.criarFornecedor({
              nome: 'Exemplo LTDA',
              cnpj: '35104718000118',
              email: 'exemplo@email',
              telefone: '(62) 99999-9999'
            })
   
            cy.contains('O e-mail é inválido').should('be.visible')
        })

        it('Adicionar telefone sem máscara', () => {
            cy.criarFornecedor({
              nome: 'Exemplo02 LTDA',
              cnpj: '35.124.128/0026-12',
              email: 'email@email.com',
              telefone: '62999999999'
            })

            cy.get('main.p-6').should('contain', '(62) 99999-9999')
        })

        it('Adicionar telefone inválido', () => {
             cy.criarFornecedor({
              nome: 'Exemplo02 LTDA',
              cnpj: '35.124.128/0026-12',
              email: 'email@email.com',
              telefone: '333'
            })

            cy.contains('Telefone deve ter 10 ou 11 dígitos').should('be.visible')
        })
      })

    describe('Editar fornecedor', () => {
        beforeEach(() => {
          cy.get(':nth-child(1) > .text-right > .flex > .text-blue-600 > .lucide').click()       
        })

        it('Editar fornecedor vazio', () => {
            cy.editarFornecedor({})
            
            cy.contains('O nome do fornecedor é obrigatório').should('be.visible')
            cy.contains('CNPJ é obrigatório').should('be.visible')
            cy.contains('O e-mail é obrigatório').should('be.visible')
        })

        it('Editar fornecedor válido', () => {
            cy.editarFornecedor({
               nome: 'Atualizado LTDA',
               cnpj: '35.124.128/0022-62',
               email: 'amazon@email.com',
               telefone: '(62) 99999-9999'
            })

            cy.get('main.p-6').should('contain', 'Atualizado LTDA').and('contain', '35.124.128/0022-62')
              
            cy.contains('Fornecedor atualizado com sucesso!').should('be.visible')  
        })
    })

    describe('Excluir fornecedor', () => {
        it('Excluindo', () => {
            cy.get(':nth-child(1) > .text-right > .flex > .text-red-600 > .lucide').click()
            
            cy.contains('button', 'Confirmar').click()

            cy.contains('Fornecedor excluído com sucesso!')
              .should('be.visible')
          })
      
          it('Cancelando', () => {
            cy.get(':nth-child(1) > .text-right > .flex > .text-red-600 > .lucide').click()
            
            cy.contains('button', 'Cancelar').click()
      
            cy.get('main.p-6').should('contain', 'Tech Solutions Inc')
          })
    })

    describe('Pesquisa', () => {
      it('Pesquisando um fornecedor válido', () => {
        cy.get('.mt-4 > .w-full').type('Tech')
        
        cy.contains('Tech Solutions Inc').should('be.visible')
      })
  
      it('Pesquisando um fornecedor não existente', () => {
        cy.get('.mt-4 > .w-full').type('fornecedor não existente')

        cy.contains('Nenhum fornecedor encontrado').should('be.visible')
      })
    })
})