describe('Shared editorial lists', () => {
  it('keeps every local list inside the mobile viewport', () => {
    cy.viewport(390, 844)
    for (const [route, title] of [
      ['/travel', '旅行'],
      ['/changelog', '更新记录'],
      ['/excalidraws', 'Excalidraw 画板'],
    ]) {
      cy.visit(route)
      cy.contains('h1', title).should('be.visible')
      cy.get('.article-archive .archive-year').should('exist')
      cy.document().then((doc) =>
        expect(doc.documentElement.scrollWidth).to.be.at.most(390)
      )
      cy.screenshot(route.slice(1) + '-mobile', { capture: 'viewport' })
    }
  })

  it('preserves reader pagination and external article links', () => {
    cy.visit('/reader?p=2')
    cy.contains('h1', '阅读').should('be.visible')
    cy.get('.archive-pagination a[href="/reader?p=1"]').should('be.visible')
    cy.get('.pagination-page').should('contain', '第 2 页')
    cy.get('.article-archive').then((archive) => {
      const links = archive.find('.archive-post-list a')
      if (links.length) {
        for (const link of Array.from(links)) {
          expect(link.getAttribute('target')).to.eq('_blank')
          expect(link.getAttribute('rel')).to.include('noopener')
        }
      } else {
        cy.contains('暂无内容。').should('be.visible')
      }
    })
    cy.screenshot('reader', { capture: 'viewport' })
  })
})
