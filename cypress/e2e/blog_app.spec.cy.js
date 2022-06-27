describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      name: 'matt',
      username: 'matt586',
      password: '216'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('login').click()
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('matt586')
      cy.get('#password').type('216')
      cy.get('#login-button').click()
      cy.contains('matt(username: matt586) is logged in!')
    })
    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('matt586')
      cy.get('#password').type('wrong pass')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'matt(username: matt586) is logged in!')
    })

  })
})