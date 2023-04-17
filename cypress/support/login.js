import { faker } from '@faker-js/faker'
let email = faker.internet.email()
let user = 'testeautomacao@multti.com'
let password = '123456'
Cypress.Commands.add('gui_login', (
    user = 'testeautomacao@multti.com',
    password = "123456",
) => {
    cy.visit('/');
    cy.get('#login-email').type(user);
    cy.get("#login-password").type(password, { log: false });
    cy.get('[class="waves-effect btn btn-primary btn-block"').click()
    cy.contains('Extratos de Transações')
});

Cypress.Commands.add('sessionLogin', (
    user = 'testeautomacao@multti.com',
    password = "123456"
) => {
    const login = () => cy.gui_login(user, password);

    cy.session(user, login);
    
});
//Verificação dos campos obrigatórios de criar usuário via site 
Cypress.Commands.add('requiredFields', () => {
    cy.visit('/')
    cy.get('[class="avatar-content"').click()
    cy.get('[class="dropdown-item"').last().click()
    cy.get('.text-center > .auth-create').click()
    cy.get('[class="waves-effect btn btn-primary btn-block"').click().should('have.text', 'Cadastrar')
    cy.get('[class="mb-1 is-invalid form-control"').first().should('be.visible')
    cy.get('[class="mb-1 is-invalid form-control"').last().should('be.visible')
    cy.get('[class="form-control is-invalid"').should('be.visible')
    cy.get('#login-password').should('be.visible')
})
//Criar usuário via site
Cypress.Commands.add('createUsers', () => {
    cy.clearAllLocalStorage()
    cy.clearAllCookies()
    cy.visit('/')
    cy.get('.text-center > .auth-create').last().click()
    cy.get('[class="mb-1 form-control"').first().type('Teste Automação').should('be.visible')
    cy.get('[class="mb-1 form-control"').last().type(email).should('be.visible')
    cy.get('[class="form-control"').first().type('88998141112').should('be.visible')
    cy.get('#login-password').type('123456').should('be.visible')
    cy.get('[class="cursor-pointer input-group-text"').click()
    cy.get('[class="custom-control-label"').click({force:true})
    cy.intercept('POST', '/api/auth/register').as('request')
    cy.get('[class="waves-effect btn btn-primary btn-block"').click().should('have.text', 'Cadastrar')
    cy.wait('@request')
    cy.get('@request').its('response.statusCode').should('eq', 200)
})
//login
Cypress.Commands.add('login', () => {
    cy.clearLocalStorage()
    cy.visit('/')
    cy.get('#login-email').type(user);
    cy.get("#login-password").type(password)
    cy.get('[class="waves-effect btn btn-primary btn-block"').click()
    cy.contains('Bem vindo, teste automação').should('be.visible')
    cy.get('[class="ficon"').last().click()
   
})
//usuário inválido 
Cypress.Commands.add('invalidUser', () => {
    cy.clearLocalStorage()
    cy.visit('/')    
    cy.get('#login-email').type('testeteste@teste.com')
    cy.get("#login-password").type('123456')
    cy.get('[class="waves-effect btn btn-primary btn-block"').click()
    cy.get('[class="Toastify__toast-body"').should('have.text', 'O campo email selecionado é inválido.')
})
//Senha inválida 
Cypress.Commands.add('invalidPassword', () => {
    cy.clearLocalStorage()
    cy.visit('/')
    cy.get('#login-email').type('testeautomacao@multti.com');
    cy.get("#login-password").type('654123')
    cy.get('[class="waves-effect btn btn-primary btn-block"').click()
    cy.get('[class="Toastify__toast-body"').should('have.text', 'Email ou senha inválido')
})
