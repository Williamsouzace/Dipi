describe('Link de Pagamento', () => {
    beforeEach(function () {
        cy.sessionLogin()
      })
    it('Verificar campos obrigatórios', () => {
        cy.checkRequiredFields()
    })
})