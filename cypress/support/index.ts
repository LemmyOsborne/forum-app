/* eslint-disable */
import "./commands"
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.signIn()
       */
      signIn(): Chainable<Element>
    }
  }
}
