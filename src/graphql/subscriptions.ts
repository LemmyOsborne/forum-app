/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateThread = /* GraphQL */ `
  subscription OnCreateThread($owner: String) {
    onCreateThread(owner: $owner) {
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
export const onUpdateThread = /* GraphQL */ `
  subscription OnUpdateThread($owner: String) {
    onUpdateThread(owner: $owner) {
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
export const onDeleteThread = /* GraphQL */ `
  subscription OnDeleteThread($owner: String) {
    onDeleteThread(owner: $owner) {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($owner: String) {
    onCreatePost(owner: $owner) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($owner: String) {
    onUpdatePost(owner: $owner) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($owner: String) {
    onDeletePost(owner: $owner) {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($owner: String) {
    onCreateComment(owner: $owner) {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($owner: String) {
    onUpdateComment(owner: $owner) {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($owner: String) {
    onDeleteComment(owner: $owner) {
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
export const onCreateVote = /* GraphQL */ `
  subscription OnCreateVote($owner: String) {
    onCreateVote(owner: $owner) {
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
export const onUpdateVote = /* GraphQL */ `
  subscription OnUpdateVote($owner: String) {
    onUpdateVote(owner: $owner) {
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
export const onDeleteVote = /* GraphQL */ `
  subscription OnDeleteVote($owner: String) {
    onDeleteVote(owner: $owner) {
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
