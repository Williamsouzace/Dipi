
describe('Usuário', () => {
  beforeEach(function () {
    cy.sessionLogin()
  })
  it('Campos obrigatórios no cadastro usuário site', () => {
    cy.requiredFields()
  })
  it('Cadastro usuário pelo site', () => {
    cy.createUsersSite()
  })
  it('Cadastro de usuário pela plataforma', () => {
    cy.createUsersPlataform()
  })
  it('Editar usuário', () => {
    cy.editusers()
  })
  it('Inativa e Ativa usuário', () => {
    cy.inactivateActivateUser() 
  })
  it('Deletar Usuário', () => {
    for (let i = 0; i < 2; i++) {
      cy.deleteUsers()
    }
  })
})
