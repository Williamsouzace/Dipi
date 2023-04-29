Cypress.Commands.add('checkRequiredFields', () => {
    cy.visit('/payments-link')
    cy.get('[class="btn btn-primary"').click()
})
