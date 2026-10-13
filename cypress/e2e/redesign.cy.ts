describe('Editorial redesign', () => {
  beforeEach(() => {
    cy.intercept('https://um.qwas.fun/**', { statusCode: 204 })
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('qwas-theme', 'light')
      },
    })
  })

  it('persists the selected theme across reload and archive navigation', () => {
    cy.get('button[aria-label="切换明暗主题"]').should('not.be.disabled')
    cy.get('html').should('not.have.class', 'dark')
    cy.screenshot('home-light', { capture: 'viewport' })
    cy.get('button[aria-label="切换明暗主题"]').click()
    cy.get('html').should('have.class', 'dark')
    cy.screenshot('home-dark', { capture: 'viewport' })
    cy.reload()
    cy.get('html').should('have.class', 'dark')
    cy.get('.primary-nav a[href="/blog"]').click()
    cy.contains('h1', '文章').should('be.visible')
    cy.screenshot('archive-dark', { capture: 'viewport' })
    cy.get('html').should('have.class', 'dark')
    cy.get('button[aria-label="切换明暗主题"]').click()
    cy.get('html').should('not.have.class', 'dark')
    cy.screenshot('archive-light', { capture: 'viewport' })
  })

  it('searches real titles and opens the matching article', () => {
    cy.get('button[aria-label="搜索文章"]').click()
    cy.get('#site-search').should('have.focus').type('Alembic')
    cy.get('.search-results a')
      .should('have.length', 1)
      .and('have.attr', 'href', '/blog/alembic')
      .click()
    cy.location('pathname').should('eq', '/blog/alembic')
    cy.get('dialog').should('not.be.visible')
    cy.contains('h1#title', '使用 Alembic').should('be.visible')
    cy.get('article.prose').should('exist')
  })

  it('supports the keyboard shortcut, empty results and Escape dismissal', () => {
    cy.get('button[aria-label="搜索文章"]').should('not.be.disabled')
    cy.get('body').type('{ctrl}k')
    cy.get('#site-search').should('have.focus').type('不存在的文章标题xyz')
    cy.get('.search-hint').should('contain', '没有找到相关文章')
    cy.get('.search-results a').should('not.exist')
    cy.get('#site-search').type('{esc}')
    cy.get('dialog').should('not.be.visible')
    cy.get('button[aria-label="搜索文章"]').should('have.focus')
  })

  it('keeps every blog article in the archive without duplicates', () => {
    cy.request('/rss.xml').then((response) => {
      const feed = new DOMParser().parseFromString(
        response.body,
        'application/xml'
      )
      const paths = Array.from(feed.querySelectorAll('item > link'))
        .map((link) => new URL(link.textContent!).pathname)
        .filter((path) => path.startsWith('/blog/'))
      cy.visit('/blog')
      cy.get('.archive-post-list a').then((links) => {
        const actual = Array.from(links).map((link) =>
          link.getAttribute('href')
        )
        expect(actual.slice().sort()).to.deep.equal(paths.slice().sort())
        expect(new Set(actual).size).to.equal(actual.length)
      })
    })
  })

  it('keeps mobile navigation and full article titles within the viewport', () => {
    cy.viewport(390, 844)
    cy.get('.site-wordmark').should('be.visible')
    cy.get('.tools-menu summary').click()
    cy.get('.tools-links a[href="/settings"]').should('be.visible').click()
    cy.location('pathname').should('eq', '/settings')
    cy.contains('h1', '设置').should('be.visible')
    cy.get('.primary-nav a[href="/blog"]').click()
    cy.contains('.editorial-post-title', 'uni-app + Vue3').should('be.visible')
    cy.document().then((doc) =>
      expect(doc.documentElement.scrollWidth).to.be.at.most(390)
    )
    cy.scrollTo('top')
    cy.screenshot('archive-mobile', { capture: 'viewport' })
  })
})
