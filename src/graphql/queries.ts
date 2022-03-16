/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getThread = /* GraphQL */ `
  query GetThread($id: ID!) {
    getThread(id: $id) {
      id
      posts {
        items {
          id
          title
          content
          image
          createdAt
          updatedAt
          threadPostsId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listThreads = /* GraphQL */ `
  query ListThreads(
    $filter: ModelThreadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listThreads(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        posts {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      content
      image
      thread {
        id
        posts {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
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
      threadPostsId
      owner
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        image
        thread {
          id
          createdAt
          updatedAt
          owner
        }
        comments {
          nextToken
        }
        votes {
          nextToken
        }
        createdAt
        updatedAt
        threadPostsId
        owner
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      post {
        id
        title
        content
        image
        thread {
          id
          createdAt
          updatedAt
          owner
        }
        comments {
          nextToken
        }
        votes {
          nextToken
        }
        createdAt
        updatedAt
        threadPostsId
        owner
      }
      content
      createdAt
      updatedAt
      postCommentsId
      owner
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
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
          threadPostsId
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
`;
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
        thread {
          id
          createdAt
          updatedAt
          owner
        }
        comments {
          nextToken
        }
        votes {
          nextToken
        }
        createdAt
        updatedAt
        threadPostsId
        owner
      }
      createdAt
      updatedAt
      postVotesId
      owner
    }
  }
`;
export const listVotes = /* GraphQL */ `
  query ListVotes(
    $filter: ModelVoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
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
          threadPostsId
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
`;
