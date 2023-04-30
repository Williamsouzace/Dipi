describe('Link de Pagamento', () => {
    beforeEach(function () {
        cy.sessionLogin()
    })
    it('Verificar campos obrigatórios', () => {
        cy.checkRequiredFields()
    })
    it.only('Gerar um link de pagamento', () => {
        cy.paymentCreateDateInvalid()
    })
    it.only('Cancelar pagamento', () => {
        cy.paymentCancel()
    })
})