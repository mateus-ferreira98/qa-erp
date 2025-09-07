describe('Produtos', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', (err) => {
      console.log('Erro encontrado:', err.message)
      return false 
    })

    cy.wait(2000)
    cy.visit('http://localhost:8080/products')
  })

  describe('Adicionar Produtos', () => {
    beforeEach(() => {
          cy.contains('button', 'Adicionar novo produto').click()
      })

    it('Adicionar produto vazio', () => {
      cy.criarProduto({})

      cy.contains('O nome do produto é obrigatório').should('be.visible')   
      cy.contains('O preço deve ser maior que 0').should('be.visible')
      cy.contains('A unidade de medida é obrigatória') .should('be.visible')
      cy.contains('O estoque atual deve ser maior que 0').should('be.visible')
    })

    it('Adicionar produto válido', () => {
      cy.criarProduto({
        nome: 'Teclado Mecânico',
        descricao: 'Switch Blue',
        preco: 200,
        unidade: 'Unidade (UN)',
        estoqueAtual: 5,
        estoqueMinimo: 1
      })

      cy.contains('Produto criado com sucesso!').should('be.visible') 

      cy.get('main.p-6').should('contain', 'Teclado Mecânico')
    })
     
    it('Adicionar produto sem passar estoque atual', () => {  
      cy.criarProduto({
        nome: 'Mouse Gamer',
        descricao: 'Razer',
        preco: 250,
        unidade: 'Unidade (UN)',
        estoqueMinimo: 1
      })

      cy.contains('O estoque atual deve ser maior que 0').should('be.visible')
    })
  })

  describe('Editar produtos', () => {
      beforeEach(() => {
        cy.get(':nth-child(1) > .text-right > .flex > .text-blue-600 > .lucide').click()
      })

    it('Editar vindo com os valores corretos', () => {
      cy.get('input[name="name"]').should('have.value', 'Laptop Dell XPS')
      cy.get('textarea[name="description"').should('have.value', 'High-end laptop with i7 processor and 16GB RAM')
      cy.get('input[name="unitPrice"]').should('have.value', 'R$\u00A01.299,99')
      cy.get('select[name="unitOfMeasurement"]').should('have.value', 'UN')
      cy.get('input[name="currentStock"]').should('have.value', '15')
      cy.get('input[name="minimumStock"]').should('have.value', '5')
    })

    it('Editar produtos vazios', () => {
      cy.editarProduto({
          nome: '',
          descricao: '',
          preco: '',
          unidade: '',
          estoqueAtual: '',
          estoqueMinimo: ''
      })

      cy.contains('O nome do produto é obrigatório').should('be.visible')
      cy.contains('O preço deve ser maior que 0').should('be.visible')
      cy.contains('A unidade de medida é obrigatória').should('be.visible')
      cy.contains('O estoque atual deve ser maior que 0').should('be.visible')
    })

    it('Editando produtos com valores validos', () => {
        cy.editarProduto({
          preco: '1,350.00',
          estoqueAtual: 25
        })

        cy.get('main.p-6').should('contain', 'R$ 1.350,00').and('contain', '25')
        cy.contains('Produto atualizado com sucesso!').should('be.visible')
    })
  })

  describe('Excluir produto', () => {
    it('Excluindo', () => {
      cy.get(':nth-child(1) > .text-right > .flex > .text-red-600 > .lucide').click()
      
      cy.contains('button', 'Confirmar').click()
      cy.contains('Produto excluído com sucesso!').should('be.visible')
    })

    it('Cancelando', () => {
      cy.get(':nth-child(1) > .text-right > .flex > .text-red-600 > .lucide').click()
      cy.contains('button', 'Cancelar').click()
      cy.get('main.p-6').should('contain', 'Laptop Dell XPS')
    })
  })

  describe('Pesquisa', () => {
    it('Pesquisando um produto válido', () => {
      cy.get('.mt-4 > .w-full').type('Laptop')
      cy.contains('Laptop Dell XPS').should('be.visible')
    })

    it('Pesquisando um produto não válido', () => {
      cy.get('.mt-4 > .w-full').type('produto não existente')
      cy.contains('Nenhum produto encontrado').should('be.visible')
    })
  })
})


