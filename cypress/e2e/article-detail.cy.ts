describe('Article detail redesign', () => {
  beforeEach(() => {
    cy.intercept('https://um.qwas.fun/**', { statusCode: 204 })
  })

  it('renders real content and links its directory to actual headings', () => {
    cy.visit('/blog/alembic')
    cy.contains('h1', '使用 Alembic 实现数据迁移管理').should('be.visible')
    cy.contains('.article-dates', '2025/12/21').should('be.visible')
    cy.get('.article-toc summary').click()
    cy.get('.article-toc a')
      .should('have.length', 2)
      .each((link) => {
        const id = decodeURIComponent(link.attr('href')!.slice(1))
        cy.document().then((doc) =>
          expect(doc.getElementById(id)?.textContent).to.eq(link.text())
        )
      })
    cy.contains('.article-toc a', '当修改数据字段时').click()
    cy.location('hash').should(
      'eq',
      '#' + encodeURIComponent('当修改数据字段时')
    )
    cy.get('.article-git-info').should('have.css', 'position', 'static')
    cy.get('.article-git-info a').should(
      'have.attr',
      'href',
      'https://github.com/qwasfun/blog/commits/main/content/blog/alembic.md'
    )
    cy.get('.article-return-link').click()
    cy.location('pathname').should('eq', '/blog')
  })

  it('copies the original code without syntax markup and announces success', () => {
    cy.visit('/blog/alembic', {
      onBeforeLoad(win) {
        const writeText = cy.stub().as('writeClipboard')
        writeText.resolves()
        Object.defineProperty(win.navigator, 'clipboard', {
          configurable: true,
          value: { writeText },
        })
      },
    })
    cy.get('.article-code-block')
      .first()
      .within(() => {
        cy.get('.article-code-toolbar').should('contain', 'shell')
        cy.get('pre')
          .invoke('text')
          .then((text) => {
            cy.get('button').click()
            cy.get('@writeClipboard').should(
              'have.been.calledOnceWithExactly',
              text
            )
            expect(text.trim()).to.eq('uv add alembic')
          })
        cy.get('button').should('contain', '已复制')
        cy.get('[role="status"]').should('contain', '代码已复制')
      })
  })

  it('provides an actionable fallback when clipboard access fails', () => {
    cy.visit('/blog/alembic', {
      onBeforeLoad(win) {
        Object.defineProperty(win.navigator, 'clipboard', {
          configurable: true,
          value: {
            writeText: cy.stub().rejects(new Error('Clipboard denied')),
          },
        })
      },
    })
    cy.get('.article-code-block button').first().click()
    cy.get('.copy-error')
      .should('be.visible')
      .and('contain', '请选中代码手动复制')
  })

  it('keeps long code inside its own scroller in both themes and on mobile', () => {
    cy.viewport(1440, 1000)
    cy.visit('/blog/alembic', {
      onBeforeLoad(win) {
        win.localStorage.setItem('qwas-theme', 'light')
      },
    })
    cy.get('.article-detail').invoke('outerWidth').should('be.at.most', 740)
    cy.screenshot('article-light', { capture: 'viewport' })
    cy.get('button[aria-label="切换明暗主题"]').click()
    cy.get('html').should('have.class', 'dark')
    cy.get('.article-code-block pre')
      .first()
      .should('have.css', 'color', 'rgb(232, 232, 232)')
    cy.screenshot('article-dark', { capture: 'viewport' })
    cy.viewport(390, 844)
    cy.get('.article-code-block pre').should('have.css', 'overflow-x', 'auto')
    cy.document().then((doc) =>
      expect(doc.documentElement.scrollWidth).to.be.at.most(390)
    )
    cy.get('.article-code-block pre')
      .eq(3)
      .then((pre) =>
        expect(pre[0].scrollWidth).to.be.greaterThan(pre[0].clientWidth)
      )
    cy.scrollTo('top')
    cy.screenshot('article-mobile', { capture: 'viewport' })
  })

  it('shares the article reading layout with changelog pages', () => {
    cy.visit('/changelog/demo-component')
    cy.get('h1#title').should('be.visible')
    cy.get('.article-detail').should('be.visible')
    cy.get('.article-return-link').should('have.attr', 'href', '/changelog')
  })
})
