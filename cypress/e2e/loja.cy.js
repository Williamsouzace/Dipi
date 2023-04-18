describe('Automação Dippi', () => {

    beforeEach(function () {
      cy.sessionLogin()
    })
    
    it('Verificar campos obrigatórios da loja', () => {
      cy.storeRequiredFields()
    })
    it('Criar loja', () => {
      cy.createStore()
    })
    it('Verficação de loja', () => {
      cy.storeVerification()
    })
  })