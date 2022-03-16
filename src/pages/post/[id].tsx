import {
  Comment,
  CreateCommentInput,
  CreateCommentMutation,
  GetPostQuery,
  ListPostsQuery,
  Post,
} from "API"
import { withSSRContext } from "aws-amplify"
import { PostPreview } from "components/post-preview/post-preview"
import { getPost, listPosts } from "graphql/queries"
import { GetStaticPaths, GetStaticProps } from "next"
import React, { useState } from "react"
import API, { GRAPHQL_AUTH_MODE } from "@aws-amplify/api"
import Link from "next/link"
import * as ROUTES from "constants/routes"
import CloseIcon from "assets/icons/close.svg"
import { PostComment } from "components/post-comment"
import { SubmitHandler, useForm } from "react-hook-form"
import { createComment } from "graphql/mutations"
import { useUser } from "context/AuthContext"
import {
  Button,
  CloseButton,
  Container,
  ErrorMessage,
  Textarea,
  Wrapper,
} from "styles/components/post.styles"
import { compare } from "helpers/compare"

interface Props {
  post: Post
}

interface IFormData {
  comment?: string
}

const IndividualPost: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>(post.comments?.items as Comment[])
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm()
  const { user } = useUser()

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    if (data.comment) {
      try {
        const createNewCommentInput: CreateCommentInput = {
          content: data.comment,
          postCommentsId: post.id,
        }
        const createNewComment = (await API.graphql({
          query: createComment,
          variables: { input: createNewCommentInput },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as { data: CreateCommentMutation }
        setComments([...comments, createNewComment.data.createComment as Comment])
        resetField("comment")
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <Container>
      <Wrapper>
        <Link href={ROUTES.HOME}>
          <CloseButton>
            <CloseIcon />
          </CloseButton>
        </Link>
        <PostPreview post={post}>
          {user && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Textarea
                placeholder="Have thoughts to share?"
                {...register("comment", {
                  required: { value: true, message: "Please enter a comment." },
                  maxLength: {
                    value: 300,
                    message: "Comment can't be more than 300 characters.",
                  },
                })}
              />
              {errors.comment && <ErrorMessage>{errors.comment.message}</ErrorMessage>}
              <Button type="submit">Comment</Button>
            </form>
          )}
          <div>
            {comments.sort(compare).map((comment) => (
              <PostComment key={comment?.id} comment={comment} />
            ))}
          </div>
        </PostPreview>
      </Wrapper>
    </Container>
  )
}

export default IndividualPost

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const SSR = withSSRContext()

  const { data } = (await SSR.API.graphql({
    query: getPost,
    variables: {
      id: params?.id,
    },
    authMode: GRAPHQL_AUTH_MODE.API_KEY,
  })) as { data: GetPostQuery }
  // By returning { props: { post } }, the Post component
  // will receive `post` as a prop at build time

  return {
    props: {
      post: data.getPost as Post,
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const SSR = withSSRContext()

  const { data } = (await SSR.API.graphql({
    query: listPosts,
    authMode: GRAPHQL_AUTH_MODE.API_KEY,
  })) as {
    data: ListPostsQuery
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: any[]
  }

  // Get the paths we want to pre-render based on posts
  const paths = data.listPosts.items.map((post) => ({
    params: { id: post?.id },
  }))
  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.

  return { paths, fallback: "blocking" }
}
