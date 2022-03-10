/// <reference types="cypress"/>
export {}

context("Sign in page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/signup")
  })

  it("should check if email input valid", () => {
    cy.get("[type='email']").type("someemail@mail.ru")
    cy.should("have.value", "someemail@mail.ru")
  })
})
