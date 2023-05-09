describe('Link de Pagamento', () => {
    beforeEach(function () {
        cy.sessionLogin()
    })
    it('Verificar campos obrigatórios', () => {
        cy.checkRequiredFields()
    })
    it('Criando link e cancelando', () => {
        let portion = 'Em até 1x'
        let date = '10102030'
        cy.paymentCreate(portion, date)
        cy.paymentCancel()
    })
    it('Gerar um link de pagamento data invalida', () => {
        let portion = 'Em até 1x'
        cy.paymentCreate_date_invalid(portion)
    })
    it.only('Gerar um link de pagamento válido', () => {
        let portion = 'Em até 1x'
        let date = '10102030'
        cy.paymentCreate(portion, date)
    })
    it.only('Realizar pagamento e verificação de status', () => {
        let status = 'Paga'
        let portion = '1'
        cy.linkPayment()
        cy.creditPayment(portion)
        cy.verification_Status(status)
    })
    it('Gerar um link de pagamento parcelado', () => {
        let portion = 'Em até 5x'
        let date = '101030'
        cy.paymentCreate(portion, date)
    })
    it('Realizar pagamento e verificação de status', () => {
        let status = 'Paga'
        let portion = '5'
        cy.linkPayment()
        cy.creditPayment(portion)
        cy.verification_Status(status)
    })
    it('Realizar pagamento com debito e verificação de status', () => {
        let status = 'Paga'
        let portion = 'Em até 1x'
        let date = '10102030'
        cy.paymentCreate(portion, date)
        cy.linkPayment()
        cy.debtPayment()
        cy.verification_Status(status)
    })
    context('Verificação dos filtros', () => {
        beforeEach(function () {
            cy.visit('/payments-link')
            cy.viewport(1920, 1080);
        })
        it('Filtros do link de pagamento', () => {
            cy.filterCustomerSearchTerm()
        })
        it('Filtros por Loja', () => {
            cy.filterStore()
        })
        it('Filtros por CNPJ', () => {
            cy.filterCnpj()
        })
        it('Filtros por data de ciração e expiração', () => {
            cy.filterDate()
        })
        it('Filtros de situação paga', () => {
            cy.filterPay()
        })
        it('Filtros de situação expirada ', () => {
            cy.filterExpired()
        })
        it('Filtros de situação cancelada', () => {
            cy.filterCancel()
        })
        it('Filtros de pago com: aguardando pagamento', () => {
            cy.filterWaiting()
        })
        it('Filtros de pago com: cartão de crédito', () => {
            cy.filterCredit()
        })
        it('Filtros de pago com: Pix', () => {
            cy.filterPix()
        })

    })
})
