describe('RSS', () => {
  it('should be accessible and have correct content type', () => {
    cy.request('/rss.xml').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.headers['content-type']).to.include('application/rss+xml')
      expect(response.body).to.include('<?xml')
      expect(response.body).to.include('<rss')
    })
  })
})
