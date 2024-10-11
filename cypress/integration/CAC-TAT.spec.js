// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = "'No, I'm not alone, 'cause I came with the fire I'm still gon' put it on and my bitch match my vibe (woo) The way the load drop, she might think it's out the sky (drop)"
        cy.get('#firstName').type('Gabriel')    
        cy.get('#lastName').type('Bonni')
        cy.get('#email').type('gabriel.bonni@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Gabriel')    
        cy.get('#lastName').type('Bonni')
        cy.get('#email').type('gabriel.bonni@gmail,com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('check telefone obrigatorio', function(){
        cy.get('#firstName').type('Gabriel')    
        cy.get('#lastName').type('Bonni')
        cy.get('#email').type('gabriel.bonni@gmail,com')
        cy.get('#open-text-area').type('Teste')
        cy.get('#phone-checkbox').click()
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Gabriel')    
        cy.get('#lastName').type('Bonni')
        cy.get('#email').type('gabriel.bonni@gmail.com')
        cy.get('#open-text-area').type('Teste')
        cy.get('#phone-checkbox').click()
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        cy.get('#phone')
        .type('hdiasja')
        .should('have.value', "")
        .type('12339123')

        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function (){
        cy.get('#firstName').type('Gabriel').should('have.value', 'Gabriel')
        cy.get('#lastName').type('Bonni').should('have.value', 'Bonni')
        cy.get('#email').type('gabriel.bonni@gmail.com').should('have.value', 'gabriel.bonni@gmail.com')
        cy.get('#open-text-area').type('Teste').should('have.value', 'Teste')
 
        cy.get('#firstName').clear().should('have.value', '')
        cy.get('#lastName').clear().should('have.value', '')
        cy.get('#email').clear().should('have.value', '')
        cy.get('#open-text-area').clear().should('have.value', '')
    })

    it("callback", function() {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('Cria Comando', function(){
        cy.PreencheMandatorio()
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('Cria Comando2', function(){
        cy.PreencheMandatorio2('Gabriel','Bonni','gabriel@gmail.com','test')
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it.only('Bootao Select', function(){
        cy.PreencheMandatorio2('Gabriel','Bonni','gabriel@gmail.com','test')
        cy.contains('button', 'Enviar').click()
        cy.contains('#product', 'YouTube').select('YouTube').should('have.value', 'youtube')
        cy.contains('#product', 'Mentoria').select(3).should('have.value', 'mentoria')
        cy.get('#product').select('youtube').should('have.value', 'youtube')
        cy.get('.success').should('be.visible')
        cy.get('input[type="radio"][value="feedback"]').check()
    })
  })