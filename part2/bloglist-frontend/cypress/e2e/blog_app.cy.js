/* eslint-disable no-undef */
describe('My First Test', () => {
  it('Visit the webpage!', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('log in')
  })
})