// cypress/e2e/blog.cy.test.ts

describe('blog Page', () => {
  it('should display the blog list page', () => {
    cy.visit('/blog')
    cy.contains('blog').should('be.visible')
    cy.get('section').within(() => {
      cy.get('ul,ol').should('exist') // PostList renders a list
      cy.get('li').its('length').should('be.gte', 1)
    })
  })

  it('should navigate to a blog post detail page', () => {
    cy.visit('/blog')
    cy.get('section ul li a').first().click()

    // Title should be visible
    cy.get('h1#title').should('be.visible')

    // Publish and update dates
    cy.contains('发表于').should('be.visible')
    cy.contains('最后更新于').should('be.visible')

    // Article content
    cy.get('article.prose').should('exist')

    // Github link
    cy.contains('View this page on Github')
      .should('have.attr', 'href')
      .and('include', 'github.com/qwasfun/blog/blob/main/content/blog/')
  })

  it('should show not found for non-existent post', () => {
    cy.visit('/blog/non-existent-slug', { failOnStatusCode: false })
    cy.contains(/not found|404/i).should('exist')
  })
})
