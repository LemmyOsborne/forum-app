import { ListPostsQuery, Post } from "API"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { API } from "aws-amplify"
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api"
import { listPosts } from "graphql/queries"
import { PostPreview } from "components/post-preview/post-preview"
import { compare } from "helpers/compare"
import { Skeleton, SkeletonText, SkeletonTitle } from "styles/skeleton.styles"
import { useUser } from "context/AuthContext"
import { useAppDispatch, useAppSelector } from "features/store"
import { fetchThreads } from "features/slices/threadsSlice"
import { ThreadPreview } from "components/thread-preview"

export default function Home() {
  const [posts, setPosts] = useState<Post[]>()
  const { user } = useUser()
  const username = user?.getUsername()

  useEffect(() => {
    const getAllPosts = async () => {
      const allPosts = (await API.graphql({
        query: listPosts,
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })) as {
        data: ListPostsQuery
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        errors: any[]
      }
      try {
        if (allPosts && user && username) {
          const filteredPosts = allPosts.data.listPosts.items.filter((post) =>
            post.thread.subscribers?.includes(username)
          ) as Post[]
          setPosts(filteredPosts)
        } else {
          setPosts(allPosts.data.listPosts.items as Post[])
        }
      } catch (e) {
        console.log(e)
      }
    }

    getAllPosts()
  }, [])

  const dispatch = useAppDispatch()
  const threads = useAppSelector((state) => state.threadsReducer.threads)

  useEffect(() => {
    dispatch(fetchThreads())
  }, [])

  return posts ? (
    <Container id="posts-container">
      <PostsSection>
        {posts.sort(compare).map((post) => (
          <PostPreview key={post.id} post={post} />
        ))}
      </PostsSection>
      <ThreadsSection>
        <ThreadSectionHeader>
          <h1>Top Threads</h1>
        </ThreadSectionHeader>
        {threads.map((thread, index) => (
          <ThreadPreview key={thread.id} thread={thread} index={index} />
        ))}
      </ThreadsSection>
    </Container>
  ) : (
    <Container id="posts-skeleton-container">
      {Array(9)
        .fill("")
        .map((_, index) => (
          <Skeleton key={index}>
            <SkeletonText style={{ width: "50%" }} />
            <SkeletonTitle />
            {Array(9)
              .fill("")
              .map((_, index) => (
                <SkeletonText key={index} />
              ))}
          </Skeleton>
        ))}
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  justify-content: center;
  margin-top: 5rem;
  overflow-x: hidden;
  grid-template-columns: minmax(310px, 700px) minmax(0, 300px);
  padding: 0 2rem;
  column-gap: 20px;

  @media (max-width: ${({ theme }) => theme.media.sm}) {
    grid-template-columns: minmax(310px, 700px);
  }
`

const ThreadsSection = styled.section`
  background-color: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.secondary.contrastText};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.palette.secondary.dark};
  align-self: start;

  @media (max-width: ${({ theme }) => theme.media.sm}) {
    display: none;
  }
`

const ThreadSectionHeader = styled.div`
  font-weight: 500;
  text-align: center;
  background-color: ${({ theme }) => theme.palette.primary.dark};
  border-radius: 4px 4px 0 0;
  padding: 10px;
`

const PostsSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`
