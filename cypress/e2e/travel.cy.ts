describe('travel Page', () => {
  beforeEach(() => {
    cy.intercept('https://um.qwas.fun/**', { statusCode: 204 })
  })
  it('should display the travel list page', () => {
    cy.visit('/travel')
    cy.contains('h1', '旅行').should('be.visible')
    cy.get('.article-archive').within(() => {
      cy.get('ul,ol').should('exist')
      cy.get('li').its('length').should('be.gte', 1)
    })
  })

  it('should navigate to a travel detail page', () => {
    cy.visit('/travel')
    cy.get('section ul li a').first().click()

    cy.get('h1#title').should('be.visible')
    cy.contains('发表于').should('be.visible')
    cy.contains('最后更新于').should('be.visible')
    cy.get('article.prose').should('exist')
  })
})
