/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateThreadInput = {
  id?: string | null
  name: string
  description?: string | null
  image?: string | null
  subscribers?: Array<string | null> | null
}

export type ModelThreadConditionInput = {
  name?: ModelStringInput | null
  description?: ModelStringInput | null
  image?: ModelStringInput | null
  subscribers?: ModelStringInput | null
  and?: Array<ModelThreadConditionInput | null> | null
  or?: Array<ModelThreadConditionInput | null> | null
  not?: ModelThreadConditionInput | null
}

export type ModelStringInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
  size?: ModelSizeInput | null
}

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}

export type ModelSizeInput = {
  ne?: number | null
  eq?: number | null
  le?: number | null
  lt?: number | null
  ge?: number | null
  gt?: number | null
  between?: Array<number | null> | null
}

export type Thread = {
  __typename: "Thread"
  id: string
  name: string
  description?: string | null
  image?: string | null
  subscribers?: Array<string | null> | null
  posts?: {
    __typename: "ModelPostConnection"
    nextToken?: string | null
    items: Array<Post>
  }
  createdAt: string
  updatedAt: string
  owner: string
}

export type ModelPostConnection = {
  __typename: "ModelPostConnection"
  items: Array<Post>
  nextToken?: string | null
}

export type Post = {
  __typename: "Post"
  id: string
  title: string
  content: string
  image?: string | null
  thread: Thread
  comments: ModelCommentConnection
  votes: ModelVoteConnection
  createdAt: string
  updatedAt: string
  threadPostsId: string
  owner: string
}

export type ModelCommentConnection = {
  __typename: "ModelCommentConnection"
  items: Array<Comment>
  nextToken?: string | null
}

export type Comment = {
  __typename: "Comment"
  id: string
  post: Post
  content: string
  createdAt: string
  updatedAt: string
  postCommentsId: string
  owner: string
}

export type ModelVoteConnection = {
  __typename: "ModelVoteConnection"
  items: Array<Vote>
  nextToken?: string | null
}

export type Vote = {
  __typename: "Vote"
  id: string
  vote: string
  post: Post
  createdAt: string
  updatedAt: string
  postVotesId: string
  owner: string
}

export type UpdateThreadInput = {
  id: string
  name?: string | null
  description?: string | null
  image?: string | null
  subscribers?: Array<string | null> | null
}

export type DeleteThreadInput = {
  id: string
}

export type CreatePostInput = {
  id?: string | null
  title: string
  content?: string | null
  image?: string | null
  threadPostsId: string
}

export type ModelPostConditionInput = {
  title?: ModelStringInput | null
  content?: ModelStringInput | null
  image?: ModelStringInput | null
  and?: Array<ModelPostConditionInput | null> | null
  or?: Array<ModelPostConditionInput | null> | null
  not?: ModelPostConditionInput | null
  threadPostsId?: ModelIDInput | null
}

export type ModelIDInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
  size?: ModelSizeInput | null
}

export type UpdatePostInput = {
  id: string
  title?: string | null
  content?: string | null
  image?: string | null
  threadPostsId?: string | null
}

export type DeletePostInput = {
  id: string
}

export type CreateCommentInput = {
  id?: string | null
  content: string
  postCommentsId: string
}

export type ModelCommentConditionInput = {
  content?: ModelStringInput | null
  and?: Array<ModelCommentConditionInput | null> | null
  or?: Array<ModelCommentConditionInput | null> | null
  not?: ModelCommentConditionInput | null
  postCommentsId?: ModelIDInput | null
}

export type UpdateCommentInput = {
  id: string
  content?: string | null
  postCommentsId?: string | null
}

export type DeleteCommentInput = {
  id: string
}

export type CreateVoteInput = {
  id?: string | null
  vote: string
  postVotesId: string
}

export type ModelVoteConditionInput = {
  vote?: ModelStringInput | null
  and?: Array<ModelVoteConditionInput | null> | null
  or?: Array<ModelVoteConditionInput | null> | null
  not?: ModelVoteConditionInput | null
  postVotesId?: ModelIDInput | null
}

export type UpdateVoteInput = {
  id: string
  vote?: string | null
  postVotesId?: string | null
}

export type DeleteVoteInput = {
  id: string
}

export type ModelThreadFilterInput = {
  id?: ModelIDInput | null
  name?: ModelStringInput | null
  description?: ModelStringInput | null
  image?: ModelStringInput | null
  subscribers?: ModelStringInput | null
  and?: Array<ModelThreadFilterInput | null> | null
  or?: Array<ModelThreadFilterInput | null> | null
  not?: ModelThreadFilterInput | null
}

export type ModelThreadConnection = {
  __typename: "ModelThreadConnection"
  items: Array<Thread | null>
  nextToken?: string | null
}

export type ModelPostFilterInput = {
  id?: ModelIDInput | null
  title?: ModelStringInput | null
  content?: ModelStringInput | null
  image?: ModelStringInput | null
  and?: Array<ModelPostFilterInput | null> | null
  or?: Array<ModelPostFilterInput | null> | null
  not?: ModelPostFilterInput | null
  threadPostsId?: ModelIDInput | null
}

export type ModelCommentFilterInput = {
  id?: ModelIDInput | null
  content?: ModelStringInput | null
  and?: Array<ModelCommentFilterInput | null> | null
  or?: Array<ModelCommentFilterInput | null> | null
  not?: ModelCommentFilterInput | null
  postCommentsId?: ModelIDInput | null
}

export type ModelVoteFilterInput = {
  id?: ModelIDInput | null
  vote?: ModelStringInput | null
  and?: Array<ModelVoteFilterInput | null> | null
  or?: Array<ModelVoteFilterInput | null> | null
  not?: ModelVoteFilterInput | null
  postVotesId?: ModelIDInput | null
}

export type CreateThreadMutationVariables = {
  input: CreateThreadInput
  condition?: ModelThreadConditionInput | null
}

export type CreateThreadMutation = {
  createThread?: {
    __typename: "Thread"
    id: string
    name: string
    description?: string | null
    image?: string | null
    subscribers?: Array<string | null> | null
    posts?: {
      __typename: "ModelPostConnection"
      items: Array<{
        __typename: "Post"
        id: string
        title: string
        content?: string | null
        image?: string | null
        createdAt: string
        updatedAt: string
        threadPostsId: string
        owner?: string | null
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type UpdateThreadMutationVariables = {
  input: UpdateThreadInput
  condition?: ModelThreadConditionInput | null
}

export type UpdateThreadMutation = {
  updateThread?: {
    __typename: "Thread"
    id: string
    name: string
    description?: string | null
    image?: string | null
    subscribers?: Array<string | null> | null
    posts?: {
      __typename: "ModelPostConnection"
      items: Array<{
        __typename: "Post"
        id: string
        title: string
        content?: string | null
        image?: string | null
        createdAt: string
        updatedAt: string
        threadPostsId: string
        owner?: string | null
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type DeleteThreadMutationVariables = {
  input: DeleteThreadInput
  condition?: ModelThreadConditionInput | null
}

export type DeleteThreadMutation = {
  deleteThread?: {
    __typename: "Thread"
    id: string
    name: string
    description?: string | null
    image?: string | null
    subscribers?: Array<string | null> | null
    posts?: {
      __typename: "ModelPostConnection"
      items: Array<{
        __typename: "Post"
        id: string
        title: string
        content?: string | null
        image?: string | null
        createdAt: string
        updatedAt: string
        threadPostsId: string
        owner?: string | null
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type CreatePostMutationVariables = {
  input: CreatePostInput
  condition?: ModelPostConditionInput | null
}

export type CreatePostMutation = {
  createPost?: {
    __typename: "Post"
    id: string
    title: string
    content?: string | null
    image?: string | null
    thread?: {
      __typename: "Thread"
      id: string
      name: string
      description?: string | null
      image?: string | null
      subscribers?: Array<string | null> | null
      posts?: {
        __typename: "ModelPostConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      owner?: string | null
    } | null
    comments?: {
      __typename: "ModelCommentConnection"
      items: Array<{
        __typename: "Comment"
        id: string
        content: string
        createdAt: string
        updatedAt: string
        postCommentsId: string
        owner?: string | null
      } | null>
      nextToken?: string | null
    } | null
    votes?: {
      __typename: "ModelVoteConnection"
      items: Array<{
        __typename: "Vote"
        id: string
        vote: string
        createdAt: string
        updatedAt: string
        postVotesId: string
        owner?: string | null
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
    threadPostsId: string
    owner?: string | null
  } | null
}

export type UpdatePostMutationVariables = {
  input: UpdatePostInput
  condition?: ModelPostConditionInput | null
}

export type UpdatePostMutation = {
  updatePost?: {
    __typename: "Post"
    id: string
    title: string
    content?: string | null
    image?: string | null
    thread?: {
      __typename: "Thread"
      id: string
      name: string
      description?: string | null
      image?: string | null
      subscribers?: Array<string | null> | null
      posts?: {
        __typename: "ModelPostConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      owner?: string | null
    } | null
    comments?: {
      __typename: "ModelCommentConnection"
      items: Array<{
        __typename: "Comment"
        id: string
        content: string
        createdAt: string
        updatedAt: string
        postCommentsId: string
        owner?: string | null
      } | null>
      nextToken?: string | null
    } | null
    votes?: {
      __typename: "ModelVoteConnection"
      items: Array<{
        __typename: "Vote"
        id: string
        vote: string
        createdAt: string
        updatedAt: string
        postVotesId: string
        owner?: string | null
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
    threadPostsId: string
    owner?: string | null
  } | null
}

export type DeletePostMutationVariables = {
  input: DeletePostInput
  condition?: ModelPostConditionInput | null
}

export type DeletePostMutation = {
  deletePost?: {
    __typename: "Post"
    id: string
    title: string
    content?: string | null
    image?: string | null
    thread?: {
      __typename: "Thread"
      id: string
      name: string
      description?: string | null
      image?: string | null
      subscribers?: Array<string | null> | null
      posts?: {
        __typename: "ModelPostConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      owner?: string | null
    } | null
    comments?: {
      __typename: "ModelCommentConnection"
      items: Array<{
        __typename: "Comment"
        id: string
        content: string
        createdAt: string
        updatedAt: string
        postCommentsId: string
        owner?: string | null
      } | null>
      nextToken?: string | null
    } | null
    votes?: {
      __typename: "ModelVoteConnection"
      items: Array<{
        __typename: "Vote"
        id: string
        vote: string
        createdAt: string
        updatedAt: string
        postVotesId: string
        owner?: string | null
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
    threadPostsId: string
    owner?: string | null
  } | null
}

export type CreateCommentMutationVariables = {
  input: CreateCommentInput
  condition?: ModelCommentConditionInput | null
}

export type CreateCommentMutation = {
  createComment?: {
    __typename: "Comment"
    id: string
    post?: {
      __typename: "Post"
      id: string
      title: string
      content?: string | null
      image?: string | null
      thread?: {
        __typename: "Thread"
        id: string
        name: string
        description?: string | null
        image?: string | null
        subscribers?: Array<string | null> | null
        createdAt: string
        updatedAt: string
        owner?: string | null
      } | null
      comments?: {
        __typename: "ModelCommentConnection"
        nextToken?: string | null
      } | null
      votes?: {
        __typename: "ModelVoteConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      threadPostsId: string
      owner?: string | null
    } | null
    content: string
    createdAt: string
    updatedAt: string
    postCommentsId: string
    owner?: string | null
  } | null
}

export type UpdateCommentMutationVariables = {
  input: UpdateCommentInput
  condition?: ModelCommentConditionInput | null
}

export type UpdateCommentMutation = {
  updateComment?: {
    __typename: "Comment"
    id: string
    post?: {
      __typename: "Post"
      id: string
      title: string
      content?: string | null
      image?: string | null
      thread?: {
        __typename: "Thread"
        id: string
        name: string
        description?: string | null
        image?: string | null
        subscribers?: Array<string | null> | null
        createdAt: string
        updatedAt: string
        owner?: string | null
      } | null
      comments?: {
        __typename: "ModelCommentConnection"
        nextToken?: string | null
      } | null
      votes?: {
        __typename: "ModelVoteConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      threadPostsId: string
      owner?: string | null
    } | null
    content: string
    createdAt: string
    updatedAt: string
    postCommentsId: string
    owner?: string | null
  } | null
}

export type DeleteCommentMutationVariables = {
  input: DeleteCommentInput
  condition?: ModelCommentConditionInput | null
}

export type DeleteCommentMutation = {
  deleteComment?: {
    __typename: "Comment"
    id: string
    post?: {
      __typename: "Post"
      id: string
      title: string
      content?: string | null
      image?: string | null
      thread?: {
        __typename: "Thread"
        id: string
        name: string
        description?: string | null
        image?: string | null
        subscribers?: Array<string | null> | null
        createdAt: string
        updatedAt: string
        owner?: string | null
      } | null
      comments?: {
        __typename: "ModelCommentConnection"
        nextToken?: string | null
      } | null
      votes?: {
        __typename: "ModelVoteConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      threadPostsId: string
      owner?: string | null
    } | null
    content: string
    createdAt: string
    updatedAt: string
    postCommentsId: string
    owner?: string | null
  } | null
}

export type CreateVoteMutationVariables = {
  input: CreateVoteInput
  condition?: ModelVoteConditionInput | null
}

export type CreateVoteMutation = {
  createVote?: {
    __typename: "Vote"
    id: string
    vote: string
    post?: {
      __typename: "Post"
      id: string
      title: string
      content?: string | null
      image?: string | null
      thread?: {
        __typename: "Thread"
        id: string
        name: string
        description?: string | null
        image?: string | null
        subscribers?: Array<string | null> | null
        createdAt: string
        updatedAt: string
        owner?: string | null
      } | null
      comments?: {
        __typename: "ModelCommentConnection"
        nextToken?: string | null
      } | null
      votes?: {
        __typename: "ModelVoteConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      threadPostsId: string
      owner?: string | null
    } | null
    createdAt: string
    updatedAt: string
    postVotesId: string
    owner?: string | null
  } | null
}

export type UpdateVoteMutationVariables = {
  input: UpdateVoteInput
  condition?: ModelVoteConditionInput | null
}

export type UpdateVoteMutation = {
  updateVote?: {
    __typename: "Vote"
    id: string
    vote: string
    post?: {
      __typename: "Post"
      id: string
      title: string
      content?: string | null
      image?: string | null
      thread?: {
        __typename: "Thread"
        id: string
        name: string
        description?: string | null
        image?: string | null
        subscribers?: Array<string | null> | null
        createdAt: string
        updatedAt: string
        owner?: string | null
      } | null
      comments?: {
        __typename: "ModelCommentConnection"
        nextToken?: string | null
      } | null
      votes?: {
        __typename: "ModelVoteConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      threadPostsId: string
      owner?: string | null
    } | null
    createdAt: string
    updatedAt: string
    postVotesId: string
    owner?: string | null
  } | null
}

export type DeleteVoteMutationVariables = {
  input: DeleteVoteInput
  condition?: ModelVoteConditionInput | null
}

export type DeleteVoteMutation = {
  deleteVote?: {
    __typename: "Vote"
    id: string
    vote: string
    post?: {
      __typename: "Post"
      id: string
      title: string
      content?: string | null
      image?: string | null
      thread?: {
        __typename: "Thread"
        id: string
        name: string
        description?: string | null
        image?: string | null
        subscribers?: Array<string | null> | null
        createdAt: string
        updatedAt: string
        owner?: string | null
      } | null
      comments?: {
        __typename: "ModelCommentConnection"
        nextToken?: string | null
      } | null
      votes?: {
        __typename: "ModelVoteConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      threadPostsId: string
      owner?: string | null
    } | null
    createdAt: string
    updatedAt: string
    postVotesId: string
    owner?: string | null
  } | null
}

export type GetThreadQueryVariables = {
  id: string
}

export type GetThreadQuery = {
  getThread?: {
    __typename: "Thread"
    id: string
    name: string
    description?: string | null
    image?: string | null
    subscribers?: Array<string | null> | null
    posts?: {
      __typename: "ModelPostConnection"
      items: Array<{
        __typename: "Post"
        id: string
        title: string
        content?: string | null
        image?: string | null
        createdAt: string
        updatedAt: string
        threadPostsId: string
        owner: string
        comments?: {
          __typename: "ModelCommentConnection"
          items: Array<{
            __typename: "Comment"
            id: string
            content: string
            createdAt: string
            updatedAt: string
            postCommentsId: string
            owner?: string | null
          }>
          nextToken?: string | null
        }
        votes?: {
          __typename: "ModelVoteConnection"
          items: Array<{
            __typename: "Vote"
            id: string
            vote: string
            createdAt: string
            updatedAt: string
            postVotesId: string
            owner?: string
          }>
          nextToken?: string | null
        }
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type ListThreadsQueryVariables = {
  filter?: ModelThreadFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListThreadsQuery = {
  listThreads: {
    __typename: "ModelThreadConnection"
    items: Array<{
      __typename: "Thread"
      id: string
      name: string
      description?: string | null
      image?: string | null
      subscribers?: Array<string | null> | null
      posts?: {
        __typename: "ModelPostConnection"
        nextToken?: string | null
        items: Array<Post>
      }
      createdAt: string
      updatedAt: string
      owner: string
    }>
    nextToken?: string | null
  }
}

export type GetPostQueryVariables = {
  id: string
}

export type GetPostQuery = {
  getPost?: {
    __typename: "Post"
    id: string
    title: string
    content?: string | null
    image?: string | null
    thread?: {
      __typename: "Thread"
      id: string
      name: string
      description?: string | null
      image?: string | null
      subscribers?: Array<string | null> | null
      posts?: {
        __typename: "ModelPostConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      owner?: string | null
    } | null
    comments?: {
      __typename: "ModelCommentConnection"
      items: Array<{
        __typename: "Comment"
        id: string
        content: string
        createdAt: string
        updatedAt: string
        postCommentsId: string
        owner?: string | null
      }>
      nextToken?: string | null
    }
    votes?: {
      __typename: "ModelVoteConnection"
      items: Array<{
        __typename: "Vote"
        id: string
        vote: string
        createdAt: string
        updatedAt: string
        postVotesId: string
        owner: string
      }>
      nextToken?: string | null
    }
    createdAt: string
    updatedAt: string
    threadPostsId: string
    owner: string
  } | null
}

export type ListPostsQueryVariables = {
  filter?: ModelPostFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListPostsQuery = {
  listPosts: {
    __typename: "ModelPostConnection"
    items: Array<{
      __typename: "Post"
      id: string
      title: string
      content?: string | null
      image?: string | null
      thread: {
        __typename: "Thread"
        id: string
        name: string
        description?: string | null
        image?: string | null
        subscribers?: Array<string>
        createdAt: string
        updatedAt: string
        owner: string
      }
      comments: {
        __typename: "ModelCommentConnection"
        nextToken?: string | null
        items: Array<Comment>
      }
      votes: {
        __typename: "ModelVoteConnection"
        nextToken?: string | null
        items: Array<Vote>
      }
      createdAt: string
      updatedAt: string
      threadPostsId: string
      owner?: string | null
    }>
    nextToken?: string | null
  }
}

export type GetCommentQueryVariables = {
  id: string
}

export type GetCommentQuery = {
  getComment?: {
    __typename: "Comment"
    id: string
    post?: {
      __typename: "Post"
      id: string
      title: string
      content?: string | null
      image?: string | null
      thread?: {
        __typename: "Thread"
        id: string
        name: string
        description?: string | null
        image?: string | null
        subscribers?: Array<string | null> | null
        createdAt: string
        updatedAt: string
        owner?: string | null
      } | null
      comments?: {
        __typename: "ModelCommentConnection"
        nextToken?: string | null
      } | null
      votes?: {
        __typename: "ModelVoteConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      threadPostsId: string
      owner?: string | null
    } | null
    content: string
    createdAt: string
    updatedAt: string
    postCommentsId: string
    owner?: string | null
  } | null
}

export type ListCommentsQueryVariables = {
  filter?: ModelCommentFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListCommentsQuery = {
  listComments?: {
    __typename: "ModelCommentConnection"
    items: Array<{
      __typename: "Comment"
      id: string
      post?: {
        __typename: "Post"
        id: string
        title: string
        content?: string | null
        image?: string | null
        createdAt: string
        updatedAt: string
        threadPostsId: string
        owner?: string | null
      } | null
      content: string
      createdAt: string
      updatedAt: string
      postCommentsId: string
      owner?: string | null
    } | null>
    nextToken?: string | null
  } | null
}

export type GetVoteQueryVariables = {
  id: string
}

export type GetVoteQuery = {
  getVote?: {
    __typename: "Vote"
    id: string
    vote: string
    post?: {
      __typename: "Post"
      id: string
      title: string
      content?: string | null
      image?: string | null
      thread?: {
        __typename: "Thread"
        id: string
        name: string
        description?: string | null
        image?: string | null
        subscribers?: Array<string | null> | null
        createdAt: string
        updatedAt: string
        owner?: string | null
      } | null
      comments?: {
        __typename: "ModelCommentConnection"
        nextToken?: string | null
      } | null
      votes?: {
        __typename: "ModelVoteConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      threadPostsId: string
      owner?: string | null
    } | null
    createdAt: string
    updatedAt: string
    postVotesId: string
    owner?: string | null
  } | null
}

export type ListVotesQueryVariables = {
  filter?: ModelVoteFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListVotesQuery = {
  listVotes?: {
    __typename: "ModelVoteConnection"
    items: Array<{
      __typename: "Vote"
      id: string
      vote: string
      post?: {
        __typename: "Post"
        id: string
        title: string
        content?: string | null
        image?: string | null
        createdAt: string
        updatedAt: string
        threadPostsId: string
        owner?: string | null
      } | null
      createdAt: string
      updatedAt: string
      postVotesId: string
      owner?: string | null
    } | null>
    nextToken?: string | null
  } | null
}

export type OnCreateThreadSubscriptionVariables = {
  owner?: string | null
}

export type OnCreateThreadSubscription = {
  onCreateThread?: {
    __typename: "Thread"
    id: string
    name: string
    description?: string | null
    image?: string | null
    subscribers?: Array<string | null> | null
    posts?: {
      __typename: "ModelPostConnection"
      items: Array<{
        __typename: "Post"
        id: string
        title: string
        content?: string | null
        image?: string | null
        createdAt: string
        updatedAt: string
        threadPostsId: string
        owner?: string | null
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type OnUpdateThreadSubscriptionVariables = {
  owner?: string | null
}

export type OnUpdateThreadSubscription = {
  onUpdateThread?: {
    __typename: "Thread"
    id: string
    name: string
    description?: string | null
    image?: string | null
    subscribers?: Array<string | null> | null
    posts?: {
      __typename: "ModelPostConnection"
      items: Array<{
        __typename: "Post"
        id: string
        title: string
        content?: string | null
        image?: string | null
        createdAt: string
        updatedAt: string
        threadPostsId: string
        owner?: string | null
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type OnDeleteThreadSubscriptionVariables = {
  owner?: string | null
}

export type OnDeleteThreadSubscription = {
  onDeleteThread?: {
    __typename: "Thread"
    id: string
    name: string
    description?: string | null
    image?: string | null
    subscribers?: Array<string | null> | null
    posts?: {
      __typename: "ModelPostConnection"
      items: Array<{
        __typename: "Post"
        id: string
        title: string
        content?: string | null
        image?: string | null
        createdAt: string
        updatedAt: string
        threadPostsId: string
        owner?: string | null
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type OnCreatePostSubscriptionVariables = {
  owner?: string | null
}

export type OnCreatePostSubscription = {
  onCreatePost?: {
    __typename: "Post"
    id: string
    title: string
    content?: string | null
    image?: string | null
    thread?: {
      __typename: "Thread"
      id: string
      name: string
      description?: string | null
      image?: string | null
      subscribers?: Array<string | null> | null
      posts?: {
        __typename: "ModelPostConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      owner?: string | null
    } | null
    comments?: {
      __typename: "ModelCommentConnection"
      items: Array<{
        __typename: "Comment"
        id: string
        content: string
        createdAt: string
        updatedAt: string
        postCommentsId: string
        owner?: string | null
      } | null>
      nextToken?: string | null
    } | null
    votes?: {
      __typename: "ModelVoteConnection"
      items: Array<{
        __typename: "Vote"
        id: string
        vote: string
        createdAt: string
        updatedAt: string
        postVotesId: string
        owner?: string | null
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
    threadPostsId: string
    owner?: string | null
  } | null
}

export type OnUpdatePostSubscriptionVariables = {
  owner?: string | null
}

export type OnUpdatePostSubscription = {
  onUpdatePost?: {
    __typename: "Post"
    id: string
    title: string
    content?: string | null
    image?: string | null
    thread?: {
      __typename: "Thread"
      id: string
      name: string
      description?: string | null
      image?: string | null
      subscribers?: Array<string | null> | null
      posts?: {
        __typename: "ModelPostConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      owner?: string | null
    } | null
    comments?: {
      __typename: "ModelCommentConnection"
      items: Array<{
        __typename: "Comment"
        id: string
        content: string
        createdAt: string
        updatedAt: string
        postCommentsId: string
        owner?: string | null
      } | null>
      nextToken?: string | null
    } | null
    votes?: {
      __typename: "ModelVoteConnection"
      items: Array<{
        __typename: "Vote"
        id: string
        vote: string
        createdAt: string
        updatedAt: string
        postVotesId: string
        owner?: string | null
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
    threadPostsId: string
    owner?: string | null
  } | null
}

export type OnDeletePostSubscriptionVariables = {
  owner?: string | null
}

export type OnDeletePostSubscription = {
  onDeletePost?: {
    __typename: "Post"
    id: string
    title: string
    content?: string | null
    image?: string | null
    thread?: {
      __typename: "Thread"
      id: string
      name: string
      description?: string | null
      image?: string | null
      subscribers?: Array<string | null> | null
      posts?: {
        __typename: "ModelPostConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      owner?: string | null
    } | null
    comments?: {
      __typename: "ModelCommentConnection"
      items: Array<{
        __typename: "Comment"
        id: string
        content: string
        createdAt: string
        updatedAt: string
        postCommentsId: string
        owner?: string | null
      } | null>
      nextToken?: string | null
    } | null
    votes?: {
      __typename: "ModelVoteConnection"
      items: Array<{
        __typename: "Vote"
        id: string
        vote: string
        createdAt: string
        updatedAt: string
        postVotesId: string
        owner?: string | null
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
    threadPostsId: string
    owner?: string | null
  } | null
}

export type OnCreateCommentSubscriptionVariables = {
  owner?: string | null
}

export type OnCreateCommentSubscription = {
  onCreateComment?: {
    __typename: "Comment"
    id: string
    post?: {
      __typename: "Post"
      id: string
      title: string
      content?: string | null
      image?: string | null
      thread?: {
        __typename: "Thread"
        id: string
        name: string
        description?: string | null
        image?: string | null
        subscribers?: Array<string | null> | null
        createdAt: string
        updatedAt: string
        owner?: string | null
      } | null
      comments?: {
        __typename: "ModelCommentConnection"
        nextToken?: string | null
      } | null
      votes?: {
        __typename: "ModelVoteConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      threadPostsId: string
      owner?: string | null
    } | null
    content: string
    createdAt: string
    updatedAt: string
    postCommentsId: string
    owner?: string | null
  } | null
}

export type OnUpdateCommentSubscriptionVariables = {
  owner?: string | null
}

export type OnUpdateCommentSubscription = {
  onUpdateComment?: {
    __typename: "Comment"
    id: string
    post?: {
      __typename: "Post"
      id: string
      title: string
      content?: string | null
      image?: string | null
      thread?: {
        __typename: "Thread"
        id: string
        name: string
        description?: string | null
        image?: string | null
        subscribers?: Array<string | null> | null
        createdAt: string
        updatedAt: string
        owner?: string | null
      } | null
      comments?: {
        __typename: "ModelCommentConnection"
        nextToken?: string | null
      } | null
      votes?: {
        __typename: "ModelVoteConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      threadPostsId: string
      owner?: string | null
    } | null
    content: string
    createdAt: string
    updatedAt: string
    postCommentsId: string
    owner?: string | null
  } | null
}

export type OnDeleteCommentSubscriptionVariables = {
  owner?: string | null
}

export type OnDeleteCommentSubscription = {
  onDeleteComment?: {
    __typename: "Comment"
    id: string
    post?: {
      __typename: "Post"
      id: string
      title: string
      content?: string | null
      image?: string | null
      thread?: {
        __typename: "Thread"
        id: string
        name: string
        description?: string | null
        image?: string | null
        subscribers?: Array<string | null> | null
        createdAt: string
        updatedAt: string
        owner?: string | null
      } | null
      comments?: {
        __typename: "ModelCommentConnection"
        nextToken?: string | null
      } | null
      votes?: {
        __typename: "ModelVoteConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      threadPostsId: string
      owner?: string | null
    } | null
    content: string
    createdAt: string
    updatedAt: string
    postCommentsId: string
    owner?: string | null
  } | null
}

export type OnCreateVoteSubscriptionVariables = {
  owner?: string | null
}

export type OnCreateVoteSubscription = {
  onCreateVote?: {
    __typename: "Vote"
    id: string
    vote: string
    post?: {
      __typename: "Post"
      id: string
      title: string
      content?: string | null
      image?: string | null
      thread?: {
        __typename: "Thread"
        id: string
        name: string
        description?: string | null
        image?: string | null
        subscribers?: Array<string | null> | null
        createdAt: string
        updatedAt: string
        owner?: string | null
      } | null
      comments?: {
        __typename: "ModelCommentConnection"
        nextToken?: string | null
      } | null
      votes?: {
        __typename: "ModelVoteConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      threadPostsId: string
      owner?: string | null
    } | null
    createdAt: string
    updatedAt: string
    postVotesId: string
    owner?: string | null
  } | null
}

export type OnUpdateVoteSubscriptionVariables = {
  owner?: string | null
}

export type OnUpdateVoteSubscription = {
  onUpdateVote?: {
    __typename: "Vote"
    id: string
    vote: string
    post?: {
      __typename: "Post"
      id: string
      title: string
      content?: string | null
      image?: string | null
      thread?: {
        __typename: "Thread"
        id: string
        name: string
        description?: string | null
        image?: string | null
        subscribers?: Array<string | null> | null
        createdAt: string
        updatedAt: string
        owner?: string | null
      } | null
      comments?: {
        __typename: "ModelCommentConnection"
        nextToken?: string | null
      } | null
      votes?: {
        __typename: "ModelVoteConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      threadPostsId: string
      owner?: string | null
    } | null
    createdAt: string
    updatedAt: string
    postVotesId: string
    owner?: string | null
  } | null
}

export type OnDeleteVoteSubscriptionVariables = {
  owner?: string | null
}

export type OnDeleteVoteSubscription = {
  onDeleteVote?: {
    __typename: "Vote"
    id: string
    vote: string
    post?: {
      __typename: "Post"
      id: string
      title: string
      content?: string | null
      image?: string | null
      thread?: {
        __typename: "Thread"
        id: string
        name: string
        description?: string | null
        image?: string | null
        subscribers?: Array<string | null> | null
        createdAt: string
        updatedAt: string
        owner?: string | null
      } | null
      comments?: {
        __typename: "ModelCommentConnection"
        nextToken?: string | null
      } | null
      votes?: {
        __typename: "ModelVoteConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      threadPostsId: string
      owner?: string | null
    } | null
    createdAt: string
    updatedAt: string
    postVotesId: string
    owner?: string | null
  } | null
}
