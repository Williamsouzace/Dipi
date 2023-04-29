import './store'
import './login'
import './users'
import './paymentLink'

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
  })