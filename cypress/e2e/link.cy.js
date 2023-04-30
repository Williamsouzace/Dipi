describe('Link de Pagamento', () => {
    beforeEach(function () {
        cy.sessionLogin()
    })
    it('Verificar campos obrigatórios', () => {
        cy.checkRequiredFields()
    })
    it.only('Gerar um link de pagamento válido', () => {
        cy.paymentCreate()
        cy.Datevalid()
    })
    it.only('Realizar pagamento', () => {
        cy.makePayment()
    })

    //it.only('Cancelar pagamento', () => {
      //  cy.paymentCancel()
    //})
})