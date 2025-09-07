/// <reference types="cypress" />

// Para criar (sempre limpa antes de preencher)
Cypress.Commands.add('setValue', (selector, value) => {
  if (value !== undefined) {
    cy.get(selector).clear().type(value)
  }
})

// Para editar (só mexe no campo se o valor foi passado)
Cypress.Commands.add('updateValue', (selector, value) => {
  if (value === undefined) {
    return // não mexe no campo
  }

  cy.get(selector).clear() // limpa sempre que o valor for definido

  if (value !== '') {
    cy.get(selector).type(value) // digita só se tiver valor
  }
})


// Para criar (select sempre deve ter valor definido)
Cypress.Commands.add('setValueSelect', (selector, value) => {
  if (value !== undefined) {
    cy.get(selector).select(value)
  }
})

// Para editar (só troca o valor do select se foi passado)
Cypress.Commands.add('updateValueSelect', (selector, value) => {
  if (value !== undefined) {
    cy.get(selector).select(value)
  }
})

