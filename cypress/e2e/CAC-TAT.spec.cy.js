/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  this.beforeEach(function() {
    cy.visit('./cypress-basico-v2/src/index.html')
  })

  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('digita um texto no campo', function() {
    const longText = 'dasda, sdja, isjdiasjdiajidjasidjai'
    cy.get('#open-text-area').type(longText, { delay: 0 }) // diminui o delay de escrita de um texto long
    cy.get('#open-text-area').should('have.value', longText)
  })

  it('marca os tipos de atendimento', function() {
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('have.value', 'feedback')
    cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each(function($radio) { // similiar ao each.do
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })
  })

  it('seleciona arquivo da pasta fixtures', function() {
    // cy.fixture('example.json').as('sampleFile') // ao invés de passar o caminho relativo do arquivo
    cy.get('input[type="file"]')
    .should('not.have.value')
    // .selectFile('@sampleFile')
    .selectFile('./cypress/fixtures/example.json')
    .should(function($input){
      //console.log($input)
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('acessa a página na mesma aba do cypress', function() {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('Talking About Testing').should('be.visible')
  })
})
