import { faker } from '@faker-js/faker'
let cnpj = faker.datatype.number({ min: 10000000000000 })
//Campos obrigatórios
Cypress.Commands.add('checkRequiredFields', () => {
    cy.visit('/payments-link')
    cy.get('[class="btn btn-primary"').click()
    cy.contains('Confirmar').click().should('be.visible')
    cy.contains('Cancelar').click().should('be.visible')
})
//Gerar link de pagamento com a data inválida 
Cypress.Commands.add('paymentCreateDateInvalid', () => {
    cy.visit('/payments-link')
    cy.get('[class="btn btn-primary"').click()
    cy.get('#StoreId').select('XIAOMI BRASIL COMERCIO DE ELETRONICOS EIRELI teste')
    cy.get('[name="CustomerName"').type('Teste William')
    cy.get('[name="CustomerIdentity"').type(cnpj)
    cy.get('[name="ZipCode"').type('62322365')
    cy.get('[name="Number"').type('100')
    cy.get('[class="form-control"').eq(11).type('100')
    cy.get('#Boleto').click({ force: true })
    cy.get('#Installments').select('Em até 1x')
    cy.get('[class="form-control calendar-border"').clear().type('28092023')
    cy.contains('Confirmar').click().should('be.visible')
})
Cypress.Commands.add('paymentCancel', () => {
    cy.visit('/payments-link')
    cy.get('[class="btn btn-outline-secondary"').click()
    cy.get('[name="search_term"').type('Teste William')
    cy.get('[class="waves-effect btn btn-primary"').click()
    cy.get('[class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1ua49gz"').first().click({force:true})
    cy.contains('Cancelar link de pagamento').click()
    cy.contains('Confirmar').click()
    cy.get('[class="Toastify__toast-body"').should('have.text', 'Link de pagamento cancelado com sucesso')
})
