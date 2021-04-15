describe('Pokedex', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:3001')
    cy.contains('Phonebook')   
  })

  it('add new person CypressTest', function() {
    cy.visit('http://localhost:3001')
    cy.contains('Add a new')
    cy.get('#newName').type('CypressTest')
    cy.get('#newNumber').type('1234-5678')
    cy.get('#addPerson').click()

    cy.contains('CypressTest')
  })

  it('delete CypressTest person', function() {
    cy.visit('http://localhost:3001')
    cy.contains('CypressTest')   
    cy.get('#delete-CypressTest').click()

    cy.contains('CypressTest').should('not.exist')
  })

})