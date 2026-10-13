// cypress/e2e/changelog.cy.test.ts

describe('Changelog Page', () => {
  it('should display the changelog list page', () => {
    cy.visit('/changelog')
    cy.contains('h1', '更新记录').should('be.visible')
    cy.get('.article-archive').within(() => {
      cy.get('ul,ol').should('exist') // PostList renders a list
      cy.get('li').its('length').should('be.gte', 1)
    })
  })

  it('should navigate to a changelog post detail page', () => {
    cy.visit('/changelog')
    cy.get('section ul li a').first().click()

    // Title should be visible
    cy.get('h1#title').should('be.visible')

    // Publish and update dates
    cy.contains('发表于').should('be.visible')
    cy.contains('最后更新于').should('be.visible')

    // Article content
    cy.get('article.prose').should('exist')
  })

  it('should show not found for non-existent post', () => {
    cy.visit('/changelog/non-existent-slug', { failOnStatusCode: false })
    cy.contains(/not found|404/i).should('exist')
  })
})
