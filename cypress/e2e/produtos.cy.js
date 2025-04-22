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
    it('Adicionar produto vazio', () => {
      cy.contains('button', 'Adicionar novo produto').click()
  
      cy.contains('button', 'Criar produto').click()
  
      cy.get('[data-component-line="169"] > .text-red-600')
        .should('contain', 'O nome do produto é obrigatório')

      cy.get('[data-component-line="201"] > .text-red-600')
        .should('contain', 'O preço deve ser maior que 0')

      cy.get('[data-component-line="223"] > .text-red-600')
        .should('contain', 'A unidade de medida é obrigatória')

      cy.get('[data-component-line="247"] > .text-red-600')
        .should('contain', 'O estoque atual deve ser maior que 0')
    })

    it('Adicionar produto válido', () => {
      cy.contains('button', 'Adicionar novo produto').click()
  
      cy.get('#name').type('Samsung Celular Galaxy A16')
      cy.get('#description').type('256GB + 8GB RAM, Câmera de até 50MP, Tela 6.7", NFC, IP54, Bateria 5000 mAh (Cinza)')
      cy.get('#unitPrice').type(1159)
      cy.get('#unitOfMeasurement').select('Unidade (UN)')
      cy.get('#currentStock').clear().type(10)
      cy.get('#minimumStock').clear().type(3)
  
      cy.contains('button', 'Criar produto').click()
      cy.get('.go2072408551').should('contain', 'Produto criado com sucesso!')

      cy.get('main.p-6')
        .should('contain', 'Samsung Celular Galaxy A16')
    })
     
    it('Adicionar produto sem passar estoque atual', () => {
      cy.contains('button', 'Adicionar novo produto').click()
  
      cy.get('#name').type('Fone de Ouvido Bluetooth 5.3')
      cy.get('#description').type('Tipo USB C Fone de Ouvido Sem Fio com Microfone, Earphone Sem Fio Bluetooth')
      cy.get('#unitPrice').type(64)
      cy.get('#unitOfMeasurement').select('Unidade (UN)')
  
      cy.contains('button', 'Criar produto').click()
  
      cy.get('[data-component-line="247"] > .text-red-600')
        .should('contain', 'O estoque atual deve ser maior que 0')
    })
  })

  describe('Editar produtos', () => {
    it('Editar vindo com os valores corretos', () => {
      cy.get(':nth-child(1) > .text-right > .flex > .text-blue-600 > .lucide').click()

      cy.get('input[name="name"]').should('have.value', 'Laptop Dell XPS')
      cy.get('textarea[name="description"').should('have.value', 'High-end laptop with i7 processor and 16GB RAM')
      cy.get('input[name="unitPrice"]').should('have.value', 'R$\u00A01.299,99')
      cy.get('select[name="unitOfMeasurement"]').should('have.value', 'UN')
      cy.get('input[name="currentStock"]').should('have.value', '15')
      cy.get('input[name="minimumStock"]').should('have.value', '5')
    })

    it('Editar produtos vazios', () => {
      cy.get(':nth-child(1) > .text-right > .flex > .text-blue-600 > .lucide').click()

      cy.get('#name').clear()
      cy.get('#description').clear()
      cy.get('#unitPrice').clear()
      cy.get('#unitOfMeasurement').select('Selecione uma unidade')
      cy.get('#currentStock').clear()
      cy.get('#minimumStock').clear()

      cy.contains('button', 'Atualizar produto').click()

      cy.get('[data-component-line="169"] > .text-red-600')
        .should('contain', 'O nome do produto é obrigatório')

      cy.get('[data-component-line="201"] > .text-red-600')
        .should('contain', 'O preço deve ser maior que 0')

      cy.get('[data-component-line="223"] > .text-red-600')
        .should('contain', 'A unidade de medida é obrigatória')

      cy.get('[data-component-line="247"] > .text-red-600')
        .should('contain', 'O estoque atual deve ser maior que 0')
    })

    it('Editando produtos com valores validos', () => {
      cy.get(':nth-child(1) > .text-right > .flex > .text-blue-600 > .lucide').click()

      cy.get('#unitPrice').clear().type('1,350.00')
      cy.get('#currentStock').clear().type(25)

      cy.contains('button', 'Atualizar produto').click()
      cy.get('main.p-6')
        .should('contain', '1,350.00')
        .and('contain', '25')
      
      cy.get('.go2072408551')
        .should('contain', 'Produto atualizado com sucesso!')
    })
  })

  describe('Excluir produto', () => {
    it('Excluindo', () => {
      cy.get(':nth-child(1) > .text-right > .flex > .text-red-600 > .lucide').click()
      
      cy.contains('button', 'Confirmar').click()

      cy.get('.go2072408551')
        .should('contain', 'Produto excluído com sucesso!')
    })

    it('Cancelando', () => {
      cy.get(':nth-child(1) > .text-right > .flex > .text-red-600 > .lucide').click()
      
      cy.contains('button', 'Cancelar').click()

      cy.get('main.p-6')
      .should('contain', 'Laptop Dell XPS')
    })
  })

  describe('Pesquisa', () => {
    it('Pesquisando um produto válido', () => {
      cy.get('.mt-4 > .w-full').type('Laptop')
      cy.get('main.p-6')
        .should('contain', 'Laptop Dell XPS')
        .and('to.be.visible')
    })

    it('Pesquisando um produto não válido', () => {
      cy.get('.mt-4 > .w-full').type('produto não existente')
      cy.get('main.p-6')
        .should('contain', 'Nenhum produto encontrado')
    })
  })
})


