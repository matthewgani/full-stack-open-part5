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
  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'matt586', password: '216' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title-input').type('cat')
      cy.get('#author-input').type('dr seuss')
      cy.get('#url-input').type('www.cat.com')
      cy.get('#create-button').click()

      cy.contains('cat, author: dr seuss')
    })

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first blog',
          author: 'mr mouse',
          url: 'www.example1.com'
        })
        cy.createBlog({
          title: 'second blog',
          author: 'mr house',
          url: 'www.example2.com'
        })
        cy.createBlog({
          title: 'third blog',
          author: 'mr claus',
          url: 'www.example3.com'
        })
      })
      it('user can like a specific blog', function() {

        cy.contains('second blog')
          .contains('show')
          .click()

        cy.contains('second blog').parent().contains('like').click()
        cy.contains('second blog')
          .parent()
          .contains('likes: 1')

      })
      it('user can delete his blog', function() {
        cy.contains('third blog')
          .contains('show')
          .click()

        cy.contains('third blog').parent().contains('remove').click()

        cy.get('html').should('not.contain', 'third blog')
      })
      it('blogs are ordered according to most likes', function() {
        cy.contains('second blog')
          .contains('show')
          .click()
          .parent()
          .parent()
          .contains('like')
          .click()
        cy.contains('third blog')
          .contains('show')
          .click()
          .parent()
          .parent()
          .contains('like')
          .click()
        cy.contains('second blog')
          .parent()
          .contains('like')
          .click()

        cy.get('.blog').eq(0).should('contain', 'second blog')
        cy.get('.blog').eq(1).should('contain', 'third blog')
      })


    })


  })
})