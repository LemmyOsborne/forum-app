/// <reference types="cypress"/>
export {}

context("Sign up page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/signup")
  })

  it("should let user type valid email", () => {
    cy.contains("Please enter a valid email.").should("not.exist")
    cy.get("[name='email']").type("some_email@mail.ru")
    cy.get("form>button").click()
    cy.contains("Please enter a valid email.").should("not.exist")
  })

  it("should check error message shows if email not valid", () => {
    cy.contains("Please enter a valid email.").should("not.exist")
    cy.get("[name='email']").type("someemail.ru")
    cy.get("form>button").click()
    cy.contains("Please enter a valid email.").should("exist")
  })

  it("should let user write password in relative input", () => {
    cy.get("[type='password']").type("some_passw0rd1234++")
    cy.should("have.value", "some_passw0rd1234++")
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

  it("should show verification code input after validation if user not exist yet", () => {
    cy.get("[name='code']").should("not.exist")
    cy.get("[name='username']").type("my_new_username")
    cy.get("[name='email']").type("my_valid_email@mail.ru")
    cy.get("[name='password']").type("my_strong_password1234++")
    cy.get("form>button").click()
    if (cy.contains("User already exists")) {
      cy.get("[name='code']").should("not.exist")
    } else {
      cy.get("[name='code']").should("exist")
    }
  })
})
