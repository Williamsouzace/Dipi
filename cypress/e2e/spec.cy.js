describe('Automação Dippi', () => {

  beforeEach(function () {
    cy.sessionLogin()
  })
  it('Campos obrigatórios usuário', () => {
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
  it('Caminho para a loja', () => {
    cy.pathToStore()
  })
  it('Verificar campos obrigatórios da loja', () => {
    cy.pathToStore()
    cy.storeRequiredFields()
  })
  it('Criar loja', () => {
    cy.pathToStore()
    cy.createStore()
  })
  it('Verficação de loja', () => {
    cy.storeVerification()
  })
})
