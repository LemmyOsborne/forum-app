/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createComment = /* GraphQL */ `
  mutation CreateComment($input: CreateCommentInput!, $condition: ModelCommentConditionInput) {
    createComment(input: $input, condition: $condition) {
      id
      postId
      post {
        id
        title
        comments {
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
    }
  }
`
export const updateComment = /* GraphQL */ `
  mutation UpdateComment($input: UpdateCommentInput!, $condition: ModelCommentConditionInput) {
    updateComment(input: $input, condition: $condition) {
      id
      postId
      post {
        id
        title
        comments {
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
    }
  }
`
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment($input: DeleteCommentInput!, $condition: ModelCommentConditionInput) {
    deleteComment(input: $input, condition: $condition) {
      id
      postId
      post {
        id
        title
        comments {
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
    }
  }
`
export const createPost = /* GraphQL */ `
  mutation CreatePost($input: CreatePostInput!, $condition: ModelPostConditionInput) {
    createPost(input: $input, condition: $condition) {
      id
      title
      comments {
        items {
          id
          postId
          content
          createdAt
          updatedAt
          postCommentsId
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`
export const updatePost = /* GraphQL */ `
  mutation UpdatePost($input: UpdatePostInput!, $condition: ModelPostConditionInput) {
    updatePost(input: $input, condition: $condition) {
      id
      title
      comments {
        items {
          id
          postId
          content
          createdAt
          updatedAt
          postCommentsId
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`
export const deletePost = /* GraphQL */ `
  mutation DeletePost($input: DeletePostInput!, $condition: ModelPostConditionInput) {
    deletePost(input: $input, condition: $condition) {
      id
      title
      comments {
        items {
          id
          postId
          content
          createdAt
          updatedAt
          postCommentsId
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`
