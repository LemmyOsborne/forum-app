/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      content
      image
      comments {
        items {
          id
          content
          createdAt
          updatedAt
          postCommentsId
          owner
        }
        nextToken
      }
      votes {
        items {
          id
          vote
          createdAt
          updatedAt
          postVotesId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`
export const listPosts = /* GraphQL */ `
  query ListPosts($filter: ModelPostFilterInput, $limit: Int, $nextToken: String) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        image
        comments {
          nextToken
          items {
            content
            createdAt
            id
            owner
            postCommentsId
          }
        }
        votes {
          nextToken
          items {
            id
            vote
            owner
            postVotesId
          }
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      post {
        id
        title
        content
        image
        comments {
          nextToken
        }
        votes {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      content
      createdAt
      updatedAt
      postCommentsId
      owner
    }
  }
`
export const listComments = /* GraphQL */ `
  query ListComments($filter: ModelCommentFilterInput, $limit: Int, $nextToken: String) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        post {
          id
          title
          content
          image
          createdAt
          updatedAt
          owner
        }
        content
        createdAt
        updatedAt
        postCommentsId
        owner
      }
      nextToken
    }
  }
`
export const getVote = /* GraphQL */ `
  query GetVote($id: ID!) {
    getVote(id: $id) {
      id
      vote
      post {
        id
        title
        content
        image
        comments {
          nextToken
        }
        votes {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      postVotesId
      owner
    }
  }
`
export const listVotes = /* GraphQL */ `
  query ListVotes($filter: ModelVoteFilterInput, $limit: Int, $nextToken: String) {
    listVotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        vote
        post {
          id
          title
          content
          image
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        postVotesId
        owner
      }
      nextToken
    }
  }
`
