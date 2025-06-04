describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the main heading', () => {
    cy.get('h1').should('be.visible')
  })

  it('should have working navigation', () => {
    // 检查导航链接是否存在
    cy.get('nav').should('exist')
    cy.get('nav a').should('have.length.at.least', 1)
  })

  // it('should load blog posts', () => {
  //   // 检查文章列表是否存在
  //   cy.get('article').should('exist')
  // })
})
