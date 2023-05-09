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
    it('Gerar um link de pagamento válido', () => {
        let portion = 'Em até 1x'
        let date = '10102030'
        cy.paymentCreate(portion, date)
    })
    it('Realizar pagamento e verificação de status', () => {
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
    it('Verificação dos filtros', () => {
        cy.paymentLinkFilters()
    })

})