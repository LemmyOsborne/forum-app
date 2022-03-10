/// <reference types="cypress"/>
export {}

import { ListPostsQuery, Post } from "API"
import { Amplify, API } from "aws-amplify"
import { listPosts } from "graphql/queries"
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api"
import awsconfig from "../../src/aws-exports"
import { Auth } from "aws-amplify"
import { CognitoUser } from "@aws-amplify/auth"

Amplify.configure({ ...awsconfig, ssr: true })

let user: CognitoUser

const getUser = async () => {
  try {
    user = await Auth.currentAuthenticatedUser()
    return user
  } catch (e) {
    console.error(e)
  }
}

getUser()

const getAllPosts = async () => {
  const allPosts = (await API.graphql({
    query: listPosts,
    authMode: GRAPHQL_AUTH_MODE.API_KEY,
  })) as {
    data: ListPostsQuery
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: any[]
  }

  return allPosts
}

let posts: Post[] = []

getAllPosts().then((allPosts) => {
  posts = allPosts.data.listPosts.items as Post[]
})

context("Home page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/")
  })

  it("render array of posts for guest user", () => {
    if (posts && !user) {
      cy.get("#posts-container>article").each((post) => {
        cy.wrap(post).should("exist")
      })
    }
  })

  it("render array of posts for auth user", () => {
    Auth.signIn({
      username: "some_dude",
      password: "7+7budet49",
    })

    if (posts && user) {
      cy.get("#posts-container>article").each((post) => {
        cy.wrap(post).should("exist")
      })
    }
  })

  it("render loading skeleton while posts is fetching", () => {
    if (!posts) {
      cy.get("#posts-skeleton-container>div").each((skeleton) => {
        cy.wrap(skeleton).should("exist")
      })
    }
  })

  it("does not render loading skeleton after posts is fetched", () => {
    if (posts) {
      cy.get("#posts-skeleton-container>div").should("not.exist")
    }
  })
})
