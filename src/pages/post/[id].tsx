import {
  Comment,
  CreateCommentInput,
  CreateCommentMutation,
  GetPostQuery,
  ListPostsQuery,
  Post,
} from "API"
import { withSSRContext } from "aws-amplify"
import { PostPreview } from "components/PostPreview"
import { getPost, listPosts } from "graphql/queries"
import { GetStaticPaths, GetStaticProps } from "next"
import React, { useState } from "react"
import API, { GRAPHQL_AUTH_MODE } from "@aws-amplify/api"
import styled from "styled-components"
import Link from "next/link"
import * as ROUTES from "constants/routes"
import CloseIcon from "assets/icons/close.svg"
import { PostComment } from "components"
import { SubmitHandler, useForm } from "react-hook-form"
import { createComment } from "graphql/mutations"

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

  const compare = (a: Comment, b: Comment) => {
    const firstDate = Number(new Date(a.createdAt))
    const secondDate = Number(new Date(b.createdAt))
    if (firstDate > secondDate) return -1
    if (firstDate < secondDate) return 1
    return 0
  }

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
        <Inner>
          <Link href={ROUTES.HOME}>
            <CloseButton>
              <CloseIcon />
              Close
            </CloseButton>
          </Link>
          <PostPreview post={post} />
          {comments.sort(compare).map((comment) => (
            <PostComment key={comment?.id} comment={comment} />
          ))}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Textarea
              placeholder="Have thoughts to share?"
              {...register("comment", {
                required: { value: true, message: "Please enter a username." },
                maxLength: {
                  value: 300,
                  message: "Comment can't be more than 300 characters.",
                },
              })}
            />
            {errors.comment && <ErrorMessage>{errors.comment.message}</ErrorMessage>}
            <Button type="submit">Comment</Button>
          </form>
        </Inner>
      </Wrapper>
    </Container>
  )
}

const Container = styled.main`
  background-color: ${({ theme }) => theme.palette.grey[800]};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.common.black};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 100%;
  position: relative;
  padding: 6rem 0;
`

const Inner = styled.div`
  background-color: ${({ theme }) => theme.palette.grey[100]};
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  max-width: 60%;
`

const CloseButton = styled.button`
  position: absolute;
  top: 100px;
  right: 100px;
  color: white;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;

  svg {
    margin-right: 3px;
  }

  :hover {
    opacity: 0.8;
  }
`

const Textarea = styled.textarea`
  min-height: 150px;
  min-width: 100%;
  max-width: 100%;
  padding: 20px;
  border-radius: 3px;
  background-color: inherit;
  border: 1px solid lightgrey;
`

const Button = styled.button`
  max-height: 30px;
  padding: 5px 20px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.palette.secondary.dark};
  color: ${({ theme }) => theme.palette.secondary.contrastText};
`

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.palette.warning.light};
  width: 100%;
  margin: 10px 0 15px;
`

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
