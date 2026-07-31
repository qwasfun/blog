describe('travel Page', () => {
  it('should display the travel list page', () => {
    cy.visit('/travel')
    cy.contains('travel').should('be.visible')
    cy.get('section').within(() => {
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
