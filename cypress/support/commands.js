//Criar uma loja
Cypress.Commands.add('createStore', () => {
    cy.visit('/stores')
    cy.get('[type="button"').first().click()
    cy.get('[name="StoreCnpj"').type('64.950.981/0001-10').wait(2000)
    cy.get('[name="StoreRazaoSocial"').type('Teste automação')
    cy.get('[name="StoreZipCode"').type('62322240')
    cy.get('[name="StoreNumber"').type('1000')
    cy.get('[name="StoreRepresentative"').type('William Pereira')
    cy.get('[name="StoreRepresentativeCpf"').type('504.630.190-32')
    const uploadImage = ('cypress/fixtures/image.jpg')
    cy.get('[class="custom-dropzone-input "').first().selectFile(uploadImage, {
        action: ('drag-drop')
    })
    cy.get('[class="custom-dropzone-input "').last().selectFile(uploadImage, {
        action: ('drag-drop')
    })
    cy.get('#StoreRepresentativeDocumentType').select('RG')
    cy.get('#StoreRepresentativePixType').select('CPF')
    cy.get('[name="StoreRepresentativePixKey"').type('504.630.190-32')
    //Formas de pagamento
    cy.intercept('POST', '/api/store/create').as('request')
    cy.get('[class="custom-control-input"]').check({ force: true }, { mutiple: true });
    cy.contains('Salvar').click()
    cy.wait('@request')
    cy.get('@request').its('response.statusCode').should('eq', 200)
})
//Verificação dos campos obrigatórios das lojas 
Cypress.Commands.add('storeRequiredFields', () => {
    cy.visit('/stores')
    cy.get('[type="button"]').first().click()
    cy.get('.btn-primary').click()
    cy.get('.form-control.is-invalid, .is-invalid.form-control').should('be.visible')
})
//Verificação se a loja foi criada e está na lista de lojas 
Cypress.Commands.add('storeVerification', () => {
    cy.visit('/stores')
    cy.get('[class="btn btn-outline-secondary"').click()
    cy.get('[placeholder="Digite o que deseja buscar"').type('Teste automação')
})