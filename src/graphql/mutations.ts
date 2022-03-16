/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createThread = /* GraphQL */ `
  mutation CreateThread(
    $input: CreateThreadInput!
    $condition: ModelThreadConditionInput
  ) {
    createThread(input: $input, condition: $condition) {
      id
      name
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
export const updateThread = /* GraphQL */ `
  mutation UpdateThread(
    $input: UpdateThreadInput!
    $condition: ModelThreadConditionInput
  ) {
    updateThread(input: $input, condition: $condition) {
      id
      name
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
export const deleteThread = /* GraphQL */ `
  mutation DeleteThread(
    $input: DeleteThreadInput!
    $condition: ModelThreadConditionInput
  ) {
    deleteThread(input: $input, condition: $condition) {
      id
      name
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      title
      content
      image
      thread {
        id
        name
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      title
      content
      image
      thread {
        id
        name
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      title
      content
      image
      thread {
        id
        name
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      post {
        id
        title
        content
        image
        thread {
          id
          name
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      post {
        id
        title
        content
        image
        thread {
          id
          name
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      post {
        id
        title
        content
        image
        thread {
          id
          name
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
export const createVote = /* GraphQL */ `
  mutation CreateVote(
    $input: CreateVoteInput!
    $condition: ModelVoteConditionInput
  ) {
    createVote(input: $input, condition: $condition) {
      id
      vote
      post {
        id
        title
        content
        image
        thread {
          id
          name
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
export const updateVote = /* GraphQL */ `
  mutation UpdateVote(
    $input: UpdateVoteInput!
    $condition: ModelVoteConditionInput
  ) {
    updateVote(input: $input, condition: $condition) {
      id
      vote
      post {
        id
        title
        content
        image
        thread {
          id
          name
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
export const deleteVote = /* GraphQL */ `
  mutation DeleteVote(
    $input: DeleteVoteInput!
    $condition: ModelVoteConditionInput
  ) {
    deleteVote(input: $input, condition: $condition) {
      id
      vote
      post {
        id
        title
        content
        image
        thread {
          id
          name
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
