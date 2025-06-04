describe('Changelog Page', () => {
  beforeEach(() => {
    cy.visit('/changelog')
  })

  it('should display the main heading', () => {
    cy.get('h1').should('be.visible')
  })
})
