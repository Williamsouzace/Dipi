describe('Automação Dippi', () => {

    beforeEach(function () {
      cy.sessionLogin()
    })
    it('Campos obrigatórios no cadastro usuário site', () => {
      cy.requiredFields()
    })
    it('Cadastro usuário pelo site', () => {
       cy.createUsers()
     })
    it('Usuário inválido', () => {
      cy.invalidUser()
    })
    it('Senha inválida', () => {
      cy.invalidPassword()
    })
    it('login', () => {
      cy.login()
    })
  })