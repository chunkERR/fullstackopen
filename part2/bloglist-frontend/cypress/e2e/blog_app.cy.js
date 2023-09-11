/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      name: 'Kuba',
      username: 'kuba',
      password: 'Kojima'
    })
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      name: 'Arto Hellas',
      username: 'hellas',
      password: 'secret'
    })
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('log in')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#toggle-button').click()
      cy.get('#username').type('kuba')
      cy.get('#password').type('Kojima')
      cy.get('#login-submit').click()

      cy.contains('Kuba logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#toggle-button').click()
      cy.get('#username').type('kuba')
      cy.get('#password').type('wrong')
      cy.get('#login-submit').click()

      cy.get('#notification')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#toggle-button').click()
      cy.login({ username: 'kuba', password: 'Kojima' })
      cy.createBlog({
          title: 'To Be Removed',
          author: 'Kuba',
          url: 'idk.com'
        })
      })

    })

    it('A blog can be created', function() {
      cy.get('#toggle-button').click()
      cy.get('#username').type('kuba')
      cy.get('#password').type('Kojima')
      cy.get('#login-submit').click()
      cy.contains('new blog').click()
      cy.get('#title').type('You’re NOT gonna need it!')
      cy.get('#author').type('Ron Jeffries')
      cy.get('#url').type('https://ronjeffries.com/xprog/articles/practices/pracnotneed/')
      cy.contains('create').click()

      cy.contains('You’re NOT gonna need it!')
      cy.contains('Ron Jeffries')
    })
  })


  describe('When a blog has been created', function() {
    beforeEach(function() {
      cy.login({ username: 'kuba', password: 'Kojima' })
      cy.createBlog({
        title: 'You’re NOT gonna need it!',
        author: 'Ron Jeffries',
        url: 'https://ronjeffries.com/xprog/articles/practices/pracnotneed//'
      })
    })

    it('it can be liked', function() {
      cy.contains('view').click()
      cy.get('#like').click()

      cy.contains('likes: 1')
    })

    it('the creator can delete it', function() {
      cy.contains('view').click()
      cy.contains('remove').click()

      cy.contains('removed')
      cy.get('html').should('not.contain', 'You’re NOT gonna need it!')
    })

    it('a non creator can not delete a blog', function() {
      cy.contains('logout').click()
      cy.login({ username: 'hellas', password: 'secret' })
      cy.contains('show').click()
      cy.contains('delete').should('not.exist')
    })
  })

  describe('When there exists several blogs', function() {
    const blogs = [
      { title: 'blog1', author: 'author1', url: 'google.com' },
      { title: 'blog2', author: 'author2', url: 'google.com' },
      { title: 'blog3', author: 'author3', url: 'google.com' },
    ]

    beforeEach(function() {
      cy.login({ username: 'kuba', password: 'Kojima' })
      cy.createBlog(blogs[0])
      cy.createBlog(blogs[1])
      cy.createBlog(blogs[2])
    })

    it('those are ordered by the likes', function() {
      cy.contains(blogs[0].title).contains('show').click()
      cy.contains(blogs[0].title).get('#like').as('like0')
      cy.contains(blogs[1].title).contains('show').click()
      cy.contains(blogs[1].title).contains('like').as('like1')
      cy.contains(blogs[2].title).contains('show').click()
      cy.contains(blogs[2].title).contains('like').as('like2')

      cy.get('@like2').click()
      cy.contains(blogs[2].title).contains('likes 1')
      cy.get('@like2').click()
      cy.contains(blogs[2].title).contains('likes 1')
      cy.get('@like2').click()
      cy.contains(blogs[2].title).contains('likes 2')
      cy.get('@like2').click()
      cy.contains(blogs[2].title).contains('likes 3')

      cy.get('@like1').click()
      cy.contains(blogs[1].title).contains('likes 1')
      cy.get('@like1').click()
      cy.contains(blogs[1].title).contains('likes 2')

      cy.get('@like0').click()
      cy.contains(blogs[0].title).contains('likes 1')

      cy.get('.blog').eq(0).should('contain', blogs[2].title)
      cy.get('.blog').eq(1).should('contain', blogs[1].title)
      cy.get('.blog').eq(2).should('contain', blogs[0].title)
    })

  })

