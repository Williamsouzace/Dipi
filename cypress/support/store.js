import { faker } from '@faker-js/faker'
let cnpj = faker.datatype.number({ min: 10000000000000 })
let cpf = faker.datatype.number({ min: 10000000000 })
//Criar uma loja
Cypress.Commands.add('createStore', () => {
    cy.visit('/stores')
    cy.get('[type="button"').first().click()
    cy.get('[name="StoreCnpj"').type(cnpj).wait(2000)
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
    cy.contains('Salvar').click()
    cy.get('.form-control.is-invalid, .is-invalid.form-control').should('be.visible')
})
//Verificação se a loja foi criada e está na lista de lojas 
Cypress.Commands.add('storeVerification', () => {
    cy.visit('/stores')
    cy.get('[class="btn btn-outline-secondary"').click()
    cy.get('[placeholder="Digite o que deseja buscar"').type('Teste automação')
})
Cypress.Commands.add('editStore', () => {
    cy.visit('/stores')
    cy.get('[class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1ua49gz"').eq(0).click()
    cy.get('[class="align-middle ml-50"').first().click()
    cy.get('[name="StoreCnpj"').type(cnpj).wait(2000)
    cy.get('[name="StoreRazaoSocial"').type('Teste automação')
    cy.get('[name="StoreZipCode"').type('62322240')
    cy.get('[name="StoreNumber"').type('1000')
    cy.get('[name="StoreRepresentative"').type('William Pereira')
    cy.get('[name="StoreRepresentativeCpf"').type(cpf)
    const uploadImage = ('cypress/fixtures/image.jpg')
    cy.get('[class="custom-dropzone-input "').first().selectFile(uploadImage, {
        action: ('drag-drop')
    })
    cy.get('[class="custom-dropzone-input "').last().selectFile(uploadImage, {
        action: ('drag-drop')
    })
    cy.get('#StoreRepresentativeDocumentType').select('RG')
    cy.get('#StoreRepresentativePixType').select('CPF')
    cy.get('[name="StoreRepresentativePixKey"').type(cpf)
    for (let i = 0; i <= 10; i++) {
        cy.get('[class="custom-control-input"]').eq(i).check({ force: true });
    }
    cy.contains('Salvar').click()
})
Cypress.Commands.add('deleteStore', () => {
    cy.visit('/stores')
    cy.get('[class="btn btn-outline-secondary"').click()
    cy.get('[placeholder="Digite o que deseja buscar"').type('Teste automação')
    cy.get('[class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1ua49gz"').eq(0).click()
    cy.contains('Excluir').click({ force: true })
    cy.contains('Sim, excluir.').click()
    cy.get('[role="alert"').should('have.text', 'Loja removida com sucesso')
})