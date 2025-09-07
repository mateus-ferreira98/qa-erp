# Changelog

## [07/09/2025]
- [x] Refatoração dos testes de usando comandos customizados.
- [x] Correção dos bugs em inventário:
    - Entradas: mensagens de erro em campos obrigatórios, toast de sucesso, validação de quantidade e cálculo do custo total.
    - Saídas: mensagens de erro em campos obrigatórios, toast de sucesso, validação de quantidade, pesquisa de saídas cadastradas e mensagens para produtos inexistentes.

## [28/04/2025]
- [x] Criação dos testes automatizados de inventário entradas e saídas: 
  - Entradas: [`inventario-entrada.spec.cy.js`](./cypress/e2e/inventario-entrada.cy.js) 
  - Saídas: [`inventario-saida.spec.cy.js`](./cypress/e2e/inventario-saida.cy.js)
- [x] Documentação dos casos de teste de inventário:
  - Entradas: [`docs/caso-testes/ct-inventario-entrada.md`](./docs/caso-testes/ct-inventario-entrada.md)
  - Saídas: [`docs/caso-testes/ct-inventario-saida.md`](./docs/caso-testes/ct-inventario-saida.md)
- [x] Documentação dos bugs encontrados em inventário:
  - Entradas: [`docs/bugs/bugs-inventario-entrada.md`](./docs/bugs/bugs-inventario-entrada.md)
  - Saídas: [`docs/bugs/bugs-inventario-saida.md`](./docs/bugs/bugs-inventario-saida.md)

## [25/04/2025]
- [x] Correção dos bugs listados em [`docs/bugs/bugs-fornecedores.md`](./docs/bugs/bugs-fornecedores.md)
- [x] Atualizações nos testes Cypress: [`produtos.spec.cy.js`](./cypress/e2e/produtos.cy.js) e [`fornecedores.spec.cy.js`](./cypress/e2e/fornecedores.cy.js)

## [23/04/2025]
- [x] Criação dos testes automatizados de fornecedores: [`fornecedores.spec.cy.js`](./cypress/e2e/fornecedores.cy.js)
- [x] Documentação dos casos de teste de fornecedores: [`docs/caso-testes/ct-fornecedores.md`](./docs/caso-testes/ct-fornecedores.md)
- [x] Documentação dos bugs encontrados na gestão de fornecedores: [`docs/bugs/bugs-fornecedores.md`](./docs/bugs/bugs-fornecedores)

## [21/04/2025]
- [x] Correção dos bugs listados em [`docs/bugs/bugs-produtos.md`](./docs/bugs/bugs-produtos.md)
- [x] Atualizações nos testes Cypress: [`produto.spec.cy.js`](./cypress/e2e/produtos.cy.js)
