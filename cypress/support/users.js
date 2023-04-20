//Criar um usuário via plataforma 
Cypress.Commands.add('createUsersPlataform', () => {
    cy.visit('/users')
    cy.get('[class="btn btn-primary"').click()
})
//Criar usuário via site
Cypress.Commands.add('createUsersSite', () => {
    cy.clearAllLocalStorage()
    cy.clearAllCookies()
    cy.visit('/')
    cy.get('.text-center > .auth-create').last().click()
    cy.get('[class="mb-1 form-control"').first().type('Teste Automação').should('be.visible')
    cy.get('[class="mb-1 form-control"').last().type(email).should('be.visible')
    cy.get('[class="form-control"').first().type('88998141112').should('be.visible')
    cy.get('#login-password').type('123456').should('be.visible')
    cy.get('[class="cursor-pointer input-group-text"').click()
    cy.get('[class="custom-control-label"').click({ force: true })
    cy.intercept('POST', '/api/auth/register').as('request')
    cy.get('[class="waves-effect btn btn-primary btn-block"').click().should('have.text', 'Cadastrar')
    cy.wait('@request')
    cy.get('@request').its('response.statusCode').should('eq', 200)
})