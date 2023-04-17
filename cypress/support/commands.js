Cypress.Commands.add('pathToStore', () => {
    cy.visit('/transactions')
    cy.get('[class="ficon"').first().click()
    cy.get('[class="d-flex align-items-center"').first().click().should('have.text', 'Lojas')
})
Cypress.Commands.add('createStore', () => {
    cy.get('[type="button"').first().click()
    cy.get('[class="form-control"').first().type('64.950.981/0001-10').wait(2000)
    cy.get('[class="form-control"').eq(1).type('Teste automação')
    cy.get('[class="form-control"').eq(2).type('62322240')
    cy.get('[class="form-control"').eq(4).type('1000')
    cy.get('[class="form-control"').eq(9).type('William Pereira')
    cy.get('[class="form-control"').eq(10).type('504.630.190-32')
    const uploadImage = ('cypress/fixtures/image.jpg')
    cy.get('[class="custom-dropzone-input "').first().selectFile(uploadImage, {
        action: ('drag-drop')
    })
    cy.get('[class="custom-dropzone-input "').last().selectFile(uploadImage, {
        action: ('drag-drop')
    })
    cy.get('[class="form-control"').eq(13).select('RG')
    cy.get('[class="form-control"').eq(14).select('CPF')
    cy.get('[class="form-control"').eq(15).type('504.630.190-32')
    //Formas de pagamento
    cy.intercept('POST', '/api/store/create').as('request')
    for (let i = 0; i <= 21; i++) {
        if (i !== 12) {
            cy.get('[class="custom-control-input"]').eq(i).check({ force: true });
        }
    }
    cy.get('[type="submit"').last().click().should('have.text', 'Salvar')
    cy.wait('@request')
    cy.get('@request').its('response.statusCode').should('eq', 200)
})
Cypress.Commands.add('storeRequiredFields', () => {
    cy.get('[type="button"').first().click()
    cy.get('[class="btn btn-primary"').click()
    cy.get('[class="form-control is-invalid"').eq(0).should('be.visible')
    cy.get('[class="form-control is-invalid"').eq(1).should('be.visible')
    cy.get('[class="form-control is-invalid"').eq(2).should('be.visible')
    cy.get('[class="is-invalid form-control"').eq(0).should('be.visible')
    cy.get('[class="is-invalid form-control"').eq(1).should('be.visible')
    cy.get('[class="is-invalid form-control"').eq(2).should('be.visible')
    cy.get('[class="is-invalid form-control"').eq(3).should('be.visible')
    cy.get('[class="is-invalid form-control"').eq(4).should('be.visible')
    cy.get('[class="is-invalid form-control"').eq(5).should('be.visible')
    cy.get('[class="is-invalid form-control"').eq(6).should('be.visible')
})
Cypress.Commands.add('storeVerification', () => {
    cy.visit('/stores')
    cy.get('[class="btn btn-outline-secondary"').click()
    cy.get('[placeholder="Digite o que deseja buscar"').type('Teste automação')
})