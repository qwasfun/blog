describe('Reader', () => {
  it('should be accessible and have correct content type', () => {
    cy.request('/reader').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.headers['content-type']).to.include('text/html')
    })
  })
})
