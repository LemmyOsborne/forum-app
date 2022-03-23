/// <reference types="cypress"/>
export {}

context("Create page", () => {
  before(() => {
    cy.signIn()
  })

  after(() => {
    cy.clearLocalStorageSnapshot()
    cy.clearLocalStorage()
  })

  beforeEach(() => {
    cy.visit("http://localhost:3000/create")
    cy.restoreLocalStorage()
  })

  afterEach(() => {
    cy.saveLocalStorage()
  })

  // it("let user write a post title", () => {
  //   cy.get("[name='title']").type("Brand new title.")
  //   cy.should("have.value", "Brand new title.")
  // })

  // it("show error if title more than 120 characters", () => {
  //   cy.contains("Please enter a username under 120 characters.").should("not.exist")
  //   cy.get("[name='title']").type(
  //     "Too large titleToo large titleToo large titleToo large titleToo large titleToo large titleToo large titleToo large titleToo large titleToo large title"
  //   )
  //   cy.get("form>button").click()
  //   cy.contains("Please enter a username under 120 characters.").should("exist")
  // })

  // it("let user write a post content", () => {
  //   cy.get("[name='content']").type("Content of my cool post.")
  //   cy.should("have.value", "Content of my cool post.")
  // })

  // it("show error if content more than 1000 characters", () => {
  //   cy.contains("Please enter a text under 1000 characters.").should("not.exist")
  //   cy.get("[name='content']").type("Content of my cool post. ".repeat(41))
  //   cy.get("form>button").click()
  //   cy.contains("Please enter a text under 1000 characters.").should("exist")
  // })

  it("redirect user to post page after post created", () => {
    cy.get("[name='title']").type("Brand new title.")
    cy.get("[name='content']").type("Content of my cool post.")
    cy.get("[name='threadId']").select("main")
    cy.get("form>button").click()
    cy.location("pathname", { timeout: 20000 }).should("match", /post/i)
  })
})
