Cypress.Commands.add('checkRequiredFields', () => {
    cy.visit('/payments-link')
    cy.get('[class="btn btn-primary"').click()
    cy.get('#StoreId').select('XIAOMI BRASIL COMERCIO DE ELETRONICOS EIRELI teste')
})
