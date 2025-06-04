describe('Excalidraws Page', () => {
  beforeEach(() => {
    cy.visit('/excalidraws')
  })

  it('should display the main heading', () => {
    cy.get('h1').should('be.visible')
  })
})
