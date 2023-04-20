import { faker } from '@faker-js/faker'
let email = faker.internet.email()
let user = 'testeautomacao@multti.com'
let password = '123456'
Cypress.Commands.add('gui_login', (
  
) => {
    cy.visit('/');
    cy.get('#login-email').type(Cypress.env('user'));
    cy.get("#login-password").type(Cypress.env('password'), { log: false });
    cy.get('[class="waves-effect btn btn-primary btn-block"').click()
    cy.get('[class="ficon"').last().click()
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
    cy.clearAllLocalStorage()
    cy.visit('/')
    cy.get('.text-center > .auth-create').click()
    cy.get('[class="waves-effect btn btn-primary btn-block"').click().should('have.text', 'Cadastrar')
    cy.get('[class="mb-1 is-invalid form-control"').first().should('be.visible')
    cy.get('[class="mb-1 is-invalid form-control"').last().should('be.visible')
    cy.get('[class="form-control is-invalid"').should('be.visible')
    cy.get('#login-password').should('be.visible')
    cy.get('[for="policy"').last().should('have.text', 'Li e concordo com a política de privacidade')
})
//login
Cypress.Commands.add('login', () => {
    cy.clearLocalStorage()
    cy.visit('/')
    cy.get('#login-email').type(Cypress.env('user'));
    cy.get("#login-password").type(Cypress.env('password'))
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
