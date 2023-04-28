<<<<<<< HEAD
Cypress.Commands.add('gui_login', (
) => {
=======
Cypress.Commands.add('gui_login', () => {
>>>>>>> ec32f104ce0b30feb8035eef0601f4280a7fb76b
    cy.visit('/');
    cy.get('#login-email').type(Cypress.env('user'));
    cy.get("#login-password").type(Cypress.env('password'), { log: false });
    cy.get('[class="waves-effect btn btn-primary btn-block"').click()
    cy.get('[class="ficon"').last().click()
    cy.contains('Extratos de Transações')
});
//Criando a seção para compartilhar o login entre cenario
Cypress.Commands.add('sessionLogin', (
    user = Cypress.env('user'),
    password = Cypress.env('password')
) => {
    const options = {
        cacheAcrossSpecs: true
    }
    const login = () => cy.gui_login(user, password);
    cy.session(user, login, options)
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
    cy.contains('Bem vindo, Mpays').should('be.visible')
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
