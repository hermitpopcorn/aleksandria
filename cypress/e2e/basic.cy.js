describe('sample test', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays the site name', () => {
    cy.get('h1')
    .contains('Aleksandria');
  })
})
