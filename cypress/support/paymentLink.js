import { faker } from '@faker-js/faker'
let cnpj = faker.datatype.number({ min: 10000000000000 })
let valor = '15,50'
let loja = 'XIAOMI BRASIL COMERCIO DE ELETRONICOS EIRELI teste'
//Campos obrigatórios
Cypress.Commands.add('checkRequiredFields', () => {
    cy.visit('/payments-link')
    cy.get('[class="btn btn-primary"').click()
    cy.contains('Confirmar').click().should('be.visible')
    cy.contains('Cancelar').click().should('be.visible')
})
//Gerar link de pagamento 
Cypress.Commands.add('paymentCreate', () => {
    cy.visit('/payments-link')
    cy.get('[class="btn btn-primary"').click()
    cy.get('#StoreId').select(loja)
    cy.get('[name="CustomerName"').type('Teste William')
    cy.get('[name="CustomerIdentity"').type(cnpj)
    cy.get('[name="ZipCode"').type('62322365')
    cy.get('[name="Number"').type('100')
    cy.get('[class="form-control"').eq(11).type(valor)
    cy.get('#Boleto').click({ force: true })
    cy.get('#Installments').select('Em até 1x')
})
Cypress.Commands.add('DateInvalid', () => {
    cy.get('[class="form-control calendar-border"').clear().type('282023')
    cy.contains('Confirmar').click().should('be.visible')
})
Cypress.Commands.add('Datevalid', () => {
    cy.wait(2000)
    cy.intercept('POST', '/api/link/create').as('request')
    cy.contains('Confirmar').click().should('be.visible')  
    cy.contains('Link de pagamento gerado com sucesso')
    cy.wait('@request')
     .then(({ response }) => {
        cy.task('saveNoteId', response.body.Id)
     })
    cy.get('@request').its('response.statusCode').should('eq', 201)  
})
//Acessar ultimo link de pagamento criado
Cypress.Commands.add('LinkPayment', () => {
    cy.task('getNoteId')
      .then(noteId => {
        cy.intercept('Pagar', `/api/link/create/${noteId}`)
          .as('PagarLink')
        cy.visit(`/payment-link/${noteId}`)
      })
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
Cypress.Commands.add('accessLinkPagamneto', () => {
    cy.visit('//transactions')
    cy.get('[data-testid="expander-button-undefined"').eq(0).click()
    cy.contains('d5e473f8-f306-4ae2-b35e-b321a296d701').invoke('removeAttr', 'target').click()
    cy.contains('Pagamento pendente.')
})

