describe('Automação Dippi', () => {

    beforeEach(function () {
      cy.sessionLogin()
    })
    it('Campos obrigatórios no cadastro usuário site', () => {
      cy.requiredFields()
    })
    it('Cadastro usuário pelo site', () => {
       cy.createUsersSite()
     })
  })