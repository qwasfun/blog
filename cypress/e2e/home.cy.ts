// cypress/e2e/page.cy.ts

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('should render the main section and heading', () => {
    cy.get('section').should('exist')
    cy.contains('h1', '最新文章').should('be.visible')
    cy.get('main').contains('Qwas').should('not.exist')
  })

  it('should render the description paragraph', () => {
    cy.contains('记录技术实践与日常思考。').should('be.visible')
  })

  it('should have working navigation', () => {
    // 检查导航链接是否存在
    cy.get('nav').should('exist')
    cy.get('nav a').should('have.length.at.least', 1)
  })

  it('should render the PostList with at least one post', () => {
    cy.get('section').within(() => {
      cy.get('ul,ol').should('exist')
      cy.get('.editorial-post-list > li').should('have.length', 6)
    })
  })

  it('should navigate to a blog post detail page', () => {
    cy.get('section ul li a').first().click()

    // Title should be visible
    cy.get('h1#title').should('be.visible')

    // Publish and update dates
    cy.contains('发表于').should('be.visible')
    cy.contains('最后更新于').should('be.visible')

    // Article content
    cy.get('article.prose').should('exist')
  })
})
