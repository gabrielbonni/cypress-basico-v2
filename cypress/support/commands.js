Cypress.Commands.add('PreencheMandatorio', function () {
    cy.get('#firstName').type('Gabriel')    
    cy.get('#lastName').type('Bonni')
    cy.get('#email').type('gabriel.bonni@gmail.com')
    cy.get('#open-text-area').type('Teste')
})

Cypress.Commands.add('PreencheMandatorio2', function (nome,sobrenome,email,desc) {
    cy.get('#firstName').type(nome)    
    cy.get('#lastName').type(sobrenome)
    cy.get('#email').type(email)
    cy.get('#open-text-area').type(desc)
})