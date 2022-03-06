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

interface Props {
  post: Post
}

const IndividualPost: React.FC<Props> = ({ post }) => {
  return (
    <Container>
      <Inner>
        <Link href={ROUTES.HOME}>
          <CloseButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 50 50"
              style={{ fill: "#fff" }}
            >
              <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
            </svg>
            Close
          </CloseButton>
        </Link>
        <PostPreview post={post} />
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
