import { GetPostQuery, ListPostsQuery, Post } from "API"
import { withSSRContext } from "aws-amplify"
import { PostPreview } from "components/PostPreview"
import { getPost, listPosts } from "graphql/queries"
import { GetStaticPaths, GetStaticProps } from "next"
import React from "react"
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api"
import styled from "styled-components"
import Link from "next/link"
import * as ROUTES from "constants/routes"
import CloseIcon from "assets/icons/close.svg"
import { PostComment } from "components"

interface Props {
  post: Post
}

const IndividualPost: React.FC<Props> = ({ post }) => {
  console.log("comments: ", post.comments?.items)
  return (
    <Container>
      <Inner>
        <Link href={ROUTES.HOME}>
          <CloseButton>
            <CloseIcon />
            Close
          </CloseButton>
        </Link>
        <PostPreview post={post} />
        {post.comments?.items.map((comment) => (
          <PostComment key={comment?.id} comment={comment} />
        ))}
      </Inner>
    </Container>
  )
}

const Container = styled.main`
  background-color: ${({ theme }) => theme.palette.grey[800]};
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Inner = styled.div`
  background-color: ${({ theme }) => theme.palette.common.black};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 100%;
  position: relative;
`

const CloseButton = styled.button`
  position: absolute;
  top: 50px;
  right: 50px;
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

export default IndividualPost

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const SSR = withSSRContext()
  console.log("params: ", params)
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
  console.log("paths: ", paths)
  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" }
}
