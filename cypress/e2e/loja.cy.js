describe('Automação Dippi', () => {
  beforeEach(function () {
    cy.sessionLogin()
  })
  it('Verificar campos obrigatórios da loja', () => {
    cy.storeRequiredFields()
  })
  it.only('Criar loja', () => {
    cy.createStore()
  })
  it('Verficação de loja', () => {
    cy.storeVerification()
  })
  it('Editar loja', () => {
    cy.editStore()
  })
  it('Deletar loja', () => {
    for (let i = 0; i < 1; i++) {
      cy.deleteStore()
    }
  })
})