describe('login', () => {
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
