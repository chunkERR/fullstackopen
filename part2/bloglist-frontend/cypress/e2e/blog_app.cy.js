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
      cy.contains('likes: 0')
      cy.get('#like').click({force: true})
      cy.contains('likes: 1')

    })
  })
})