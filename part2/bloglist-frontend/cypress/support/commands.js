/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const STORAGE_KEY = 'bloggappUser'

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('BACKEND')}/login`,
    body: { username, password },
    failOnStatusCode: false, // Allow non-2xx responses for error handling
  }).then((response) => {
    if (response.status === 200) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(response.body))
      cy.visit('')
    } else {
      // Handle login failure (e.g., show an error message)
      cy.log(`Login failed with status: ${response.status}`)
    }
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url:  `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: { title, author, url },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem(STORAGE_KEY)).token}`
    }
  })

  cy.visit('')
})