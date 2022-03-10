/// <reference types="cypress"/>
export {}

context("Sign in page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/signin")
  })

  it("should let user write username in relative input", () => {
    cy.get("[name='username']").type("my_username")
    cy.should("have.value", "my_username")
  })

  it("should show error if length of username shorter than 3 characters", () => {
    cy.contains("Please enter a username between 3-16 characters.").should("not.exist")
    cy.get("[name='username']").type("my")
    cy.get("form>button").click()
    cy.contains("Please enter a username between 3-16 characters.").should("exist")
  })

  it("should show error if length of username longer than 16 characters", () => {
    cy.contains("Please enter a username between 3-16 characters.").should("not.exist")
    cy.get("[name='username']").type("my_unnecessary_too_large_username")
    cy.get("form>button").click()
    cy.contains("Please enter a username between 3-16 characters.").should("exist")
  })

  it("should show error if length of password shorter than 8 characters", () => {
    cy.contains("Please enter a stronger password.").should("not.exist")
    cy.get("[name='password']").type("weak12")
    cy.get("form>button").click()
    cy.contains("Please enter a stronger password.").should("exist")
  })

  it("redirected to the home page after sign in", () => {
    cy.get("[name='username']").type("some_dude")
    cy.get("[name='password']").type("7+7budet49")
    cy.get("form>button").click()
    cy.url().should("be.equal", "http://localhost:3000/")
  })
})
