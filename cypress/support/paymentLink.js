import { faker } from '@faker-js/faker'
let cnpj = faker.datatype.number({ min: 10000000000000 })
let valor = '0.02'
let loja = 'EMPRESA PARA TESTE'
let cliente = 'Teste William'
const cardName = Cypress.env('nome_Cartao')
const numeroCartao = Cypress.env('numeroCartao')
const cod_Seg = Cypress.env('cod_Seg')
const data_Exp = Cypress.env('data_Exp')
//Campos obrigatórios
Cypress.Commands.add('checkRequiredFields', () => {
    cy.visit('/payments-link')
    cy.get('[class="btn btn-primary"').click()
    cy.contains('Confirmar').click().should('be.visible')
    cy.contains('Cancelar').click().should('be.visible')
})
//Gerar link de pagamento
Cypress.Commands.add('paymentCreate', (portion, date) => {
    cy.visit('/payments-link')
    cy.get('[class="btn btn-primary"').click()
    cy.get('#StoreId').select(loja)
    cy.get('[name="CustomerName"').type(cliente)
    cy.get('[name="CustomerIdentity"').type(cnpj)
    cy.get('[name="ZipCode"').type('62322365')
    cy.get('[name="Number"').type('100')
    cy.get('[class="form-control"').eq(11).type(valor)
    cy.get('[class="form-control calendar-border"').clear().type(date)
    cy.get('#Boleto').click({ force: true })
    cy.get('#Installments').select(portion, { force: true })
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
//Gerar link de pagamento com a data inválida
Cypress.Commands.add('paymentCreate_date_invalid', (portion) => {
    cy.visit('/payments-link')
    cy.get('[class="btn btn-primary"').click()
    cy.get('#StoreId').select(loja)
    cy.get('[name="CustomerName"').type('Teste William')
    cy.get('[name="CustomerIdentity"').type(cnpj)
    cy.get('[name="ZipCode"').type('62322365')
    cy.get('[name="Number"').type('100')
    cy.get('[class="form-control"').eq(11).type(valor)
    cy.get('[class="form-control calendar-border"').clear().type('07052023')
    cy.get('#Boleto').click({ force: true })
    cy.get('#Installments').select(portion, { force: true })
    cy.wait(2000)
    cy.contains('Confirmar').click().should('be.visible')
    cy.get('[class="Toastify__toast-body"').should('have.text', 'Erro ao gerar link de pagamento!')
})
//Acessar ultimo link de pagamento criado
Cypress.Commands.add('linkPayment', () => {
    cy.task('getNoteId')
        .then(noteId => {
            Cypress.env('idLink', noteId)
            cy.log(Cypress.env('idLink'))
            cy.intercept('Pagar', `/api/link/create/${noteId}`)
                .as('PagarLink')
            cy.visit(`/payment-link/${noteId}`)
        })
})
//Cancelar link de pagamento
Cypress.Commands.add('paymentCancel', () => {
    cy.visit('/payments-link')
    cy.get('[class="btn btn-outline-secondary"').click()
    cy.get('[name="search_term"').type(cliente)
    cy.get('[class="waves-effect btn btn-primary"').click()
    cy.get('[class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1ua49gz"').first().click({ force: true })
    cy.contains('Cancelar link de pagamento').click()
    cy.contains('Confirmar').click()
    cy.get('[class="Toastify__toast-body"').should('have.text', 'Link de pagamento cancelado com sucesso')
})
//Pagar link de pagamento com cartão de crédito 
Cypress.Commands.add('creditPayment', (portion) => {
    cy.get('[name="cardNumber"').first().type(numeroCartao)
    cy.get('[name="holder"').first().type(cardName)
    cy.get('[name="cardExpirationDate"').first().type(data_Exp)
    cy.get('#installments').select(portion)
    cy.get('[name="cardCvv"').first().type(cod_Seg)
    cy.intercept('POST', '/api/payments/create').as('request')
    cy.contains('Pagar com cartão de crédito').click()
    cy.wait('@request')
    cy.get('@request').its('response.statusCode').should('eq', 201)
})
//Pagar link de pagamento com cartão de débito
Cypress.Commands.add('debtPayment', () => {
    cy.get('[name="cardNumber"').last().type(numeroCartao)
    cy.get('[name="holder"').last().type(cardName)
    cy.get('[name="cardExpirationDate"').last().type(data_Exp)
    cy.get('[name="cardCvv"').last().type(cod_Seg)
    cy.intercept('POST', '/api/payments/create').as('request')
    cy.contains('Pagar com cartão de débito').click()
    cy.wait('@request')
    cy.get('@request').its('response.statusCode').should('eq', 201)
})
//verificação do status de pagamento
Cypress.Commands.add('verification_Status', (status) => {
    cy.visit('/payments-link')
    cy.intercept('GET', '/api/link/list?orderBy=PaymentLinkId&orderByType=desc&order_by=PaymentLinkId&order_by_type=desc&per_page=10&page=1').as('request')
    cy.wait('@request')
    cy.log('antes do while')
    cy.get('@request').then((interception) => {
        const checkStatus = () => {
            let statusName = interception.response.body.data[0].StatusName;
            cy.log(statusName);
            if (statusName === 'Pendente') {
                cy.wait(5000);
                cy.visit('/payments-link');
                cy.intercept('GET', '/api/link/list?orderBy=PaymentLinkId&orderByType=desc&order_by=PaymentLinkId&order_by_type=desc&per_page=10&page=1').as('request');
                cy.wait('@request').then((updatedInterception) => {
                    interception = updatedInterception;
                    checkStatus();
                });
            } else {
                cy.get('@request').its('response.body.data[0].StatusName').should('eq', status);
                cy.get('@request').its('response.body.data[0].Value').should('eq', valor);
            }
        };

        checkStatus();
    });
})
//Verificação dos filtros
Cypress.Commands.add('filterCustomerSearchTerm', () => {
    cy.get('[class="btn btn-outline-secondary"').click()
    cy.get('[name="search_term"').type(cliente)
    cy.get('[type="submit"').click({ force: true })//Botão de filtrar
    cy.contains(cliente).should('be.visible')//verificação se está visivel na plataforma 
    cy.contains('Limpar').click()//Limpar filtros
})
//Buscar por loja
Cypress.Commands.add('filterStore', () => {
    cy.get('[class="btn btn-outline-secondary"').click()
    cy.get('[class="select__value-container select__value-container--is-multi css-1hwfws3"').first().click().type('EMPRESA PARA TESTE{enter}')
    cy.get('[type="submit"').click({ force: true })//Botão de filtrar
    cy.get('[class="btn btn-outline-secondary"').click()
    cy.contains('EMPRESA PARA TESTE').should('be.visible')
    cy.get('[class="btn btn-outline-secondary"').click()
})
//Filtrar por cliente
Cypress.Commands.add('filterCustomer', () => {
    cy.get('[class="btn btn-outline-secondary"').click()
    cy.get('[name="CustomerName"').type(cliente)
    cy.get('[type="submit"').click({ force: true })//Botão de filtrar
    cy.contains(cliente).should('be.visible')
})
//Filtrar por CNPJ
Cypress.Commands.add('filterCnpj', () => {
    //    cy.get('[class="btn btn-outline-secondary"').click()
    //cy.get('[name="CustomerIdentity"').type(cnpj)
    //cy.get('[type="submit"').click({ force: true })//Botão de filtrar
    //cy.contains('EMPRESA PARA TESTE').should('be.visible')
})
//Filtrar por data
Cypress.Commands.add('filterDate', () => {
    cy.get('[class="btn btn-outline-secondary"').click()
    cy.get('[placeholder="Data de criação"').type('08/05/2023')
    cy.get('[type="submit"').click({ force: true })//Botão de filtrar
    cy.contains('08/05/2023').should('be.visible')
    //cy.get('[placeholder="Data de vencimento"').type('08/05/2023')
})
//situação
//Filtrar por Pendente
Cypress.Commands.add('filterPending', () => {
    cy.get('[class="btn btn-outline-secondary"').click()
    cy.get('[class="select__value-container select__value-container--is-multi css-1hwfws3"').eq(0).click().type('Pendente{enter}')
    cy.get('[type="submit"').click({ force: true })//Botão de filtrar
    cy.get('[class="btn btn-outline-secondary"').click()
    cy.wait(3000)
    cy.contains('Pendente').should('be.visible')
    cy.get('[class="btn btn-outline-secondary"').click()
})
//Filtrar por Paga
Cypress.Commands.add('filterPay', () => {
    cy.get('[class="btn btn-outline-secondary"').click()
    cy.get('[class="select__value-container select__value-container--is-multi css-1hwfws3"').eq(0).click().type('Pago{enter}')
    cy.get('[type="submit"').click({ force: true })//Botão de filtrar
    cy.get('[class="badge badge-light-success badge-pill"').first().should('have.text', 'Paga')
})
//Filtrar por Cancelado
Cypress.Commands.add('filterCancel', () => {
    cy.get('[class="btn btn-outline-secondary"').click()
    cy.get('[class="select__value-container select__value-container--is-multi css-1hwfws3"').eq(0).click().type('Cancelado{enter}')
    cy.get('[type="submit"').click({ force: true })//Botão de filtrar
    cy.get('[class="btn btn-outline-secondary"').click()
    cy.contains('Cancelado').should('be.visible')
    cy.get('[class="btn btn-outline-secondary"').click()
})
//elementos de pago com:
//Filtrar por Aguardando pagamento
Cypress.Commands.add('filterWaiting', () => {
    cy.get('[class="btn btn-outline-secondary"').click()
    cy.get('[class="select__value-container select__value-container--is-multi css-1hwfws3"').last().click().type('Aguardando{enter}')
    cy.get('[type="submit"').click({ force: true })//Botão de filtrar
    cy.get('[class="btn btn-outline-secondary"').click()
    cy.contains('Aguardando pagamento').should('be.visible')
    cy.get('[class="btn btn-outline-secondary"').click()
})
//Filtrar por cartão de crédito
Cypress.Commands.add('filterCredit', () => {
    cy.get('[class="btn btn-outline-secondary"').click()
    cy.get('[class="select__value-container select__value-container--is-multi css-1hwfws3"').last().click().type('Crédito{enter}')
    cy.get('[type="submit"').click({ force: true })//Botão de filtrar
    cy.get('[class="btn btn-outline-secondary"').click()
    cy.contains('Cartão de Crédito').should('be.visible')
    cy.get('[class="btn btn-outline-secondary"').click()
    cy.get('[class="css-xb97g8 select__multi-value__remove"').click()//Limpar clicando no 'x'
})
//Filtrar por Pix
Cypress.Commands.add('filterPix', () => {
    cy.get('[class="btn btn-outline-secondary"').click()
    cy.get('[class="select__value-container select__value-container--is-multi css-1hwfws3"').last().click().type('Pix{enter}')
    cy.get('[type="submit"').click({ force: true })//Botão de filtrar
    cy.get('[class="btn btn-outline-secondary"').click()
    cy.contains('Pix').should('be.visible')
    cy.get('[class="btn btn-outline-secondary"').click()
})
