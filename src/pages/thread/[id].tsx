import { withSSRContext } from "aws-amplify"
import { getThread, listThreads } from "graphql/queries"
import { GetStaticPaths, GetStaticProps } from "next"
import React from "react"
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api"
import { GetThreadQuery, ListThreadsQuery, Thread } from "API"
import { PostPreview } from "components/post-preview/post-preview"
import styled from "styled-components"
import { compare } from "helpers/compare"

interface Props {
  thread: Thread
}

const IndividualThread: React.FC<Props> = ({ thread }) => {
  return (
    <Container>
      <Header>
        <Title>{thread.name}</Title>
        <Subtitle>
          by <span>{thread.owner}</span>
        </Subtitle>
      </Header>
      {thread.posts?.items.sort(compare).map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </Container>
  )
}

export default IndividualThread

const Container = styled.div`
  margin-top: 3.7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.secondary.dark};
`

const Header = styled.header`
  background-color: ${({ theme }) => theme.palette.secondary.light};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: baseline;
  padding: 20px;
  margin-bottom: 40px;
`

const Title = styled.h1`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 40px;
  margin-right: 10px;
`

const Subtitle = styled.h2`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 30px;

  span {
    text-decoration: underline;
    cursor: pointer;
  }
`

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const SSR = withSSRContext()

  const { data } = (await SSR.API.graphql({
    query: getThread,
    variables: {
      id: params?.id,
    },
    authMode: GRAPHQL_AUTH_MODE.API_KEY,
  })) as { data: GetThreadQuery }

  return {
    props: {
      thread: data.getThread as Thread,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const SSR = withSSRContext()

  const { data } = (await SSR.API.graphql({
    query: listThreads,
    authMode: GRAPHQL_AUTH_MODE.API_KEY,
  })) as {
    data: ListThreadsQuery
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: any[]
  }

  // Get the paths we want to pre-render based on posts
  const paths = data.listThreads.items.map((thread) => ({
    params: { id: thread?.id },
  }))
  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.

  return { paths, fallback: "blocking" }
}
