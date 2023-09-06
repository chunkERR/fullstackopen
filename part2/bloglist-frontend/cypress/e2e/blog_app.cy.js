/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: "Kuba",
      username: 'kuba',
      password: 'Kojima'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#toggle-button').click()
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it("succeeds with correct credentials", function() {
      cy.get('#toggle-button').click()
      cy.get('#username').type('kuba')
      cy.get('#password').type('Kojima')
      cy.get('#login-submit').click()
      cy.contains('Kuba logged in')
    })

    it('fails with the wrong credentials', function() {
      cy.get('#toggle-button').click({force: true})
      cy.get('#username').type('kuba')
      cy.get('#password').type('wrong')
      cy.get('#login-submit').click()

      cy.get('#notification')
      .and('contain', 'Wrong credentials')
    })
  })
})