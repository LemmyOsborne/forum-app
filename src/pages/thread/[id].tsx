import { withSSRContext, API, Storage } from "aws-amplify"
import { getThread, listThreads } from "graphql/queries"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api"
import {
  GetThreadQuery,
  ListThreadsQuery,
  Thread,
  UpdateThreadInput,
  UpdateThreadMutation,
} from "API"
import { PostPreview } from "components/post-preview/post-preview"
import { compareDates } from "helpers/compare"
import {
  Container,
  Header,
  Subtitle,
  Title,
  Button,
  CreatedAt,
  Description,
  Info,
  InfoTitle,
  Subs,
  PostsContainer,
  HeaderContent,
  CreatePostButton,
} from "styles/components/thread.styles"
import { useRouter } from "next/router"
import { format } from "date-fns"
import { updateThread } from "graphql/mutations"
import { useUser } from "context/AuthContext"

interface Props {
  thread: Thread
}

const IndividualThread: React.FC<Props> = ({
  thread: { id, name, owner, posts, description, createdAt, subscribers = [], image },
}) => {
  const router = useRouter()
  const [subs, setSubs] = useState<(string | null)[] | null | undefined>()
  const { user } = useUser()
  const username = user?.getUsername()
  const [imageUrl, setImageUrl] = useState("")

  useEffect(() => {
    setSubs(subscribers)
    const getImageUrl = async () => {
      if (image) {
        try {
          const imageUrl = await Storage.get(image)
          setImageUrl(imageUrl)
        } catch (e) {
          console.error(e)
        }
      }
    }

    getImageUrl()
  }, [image])

  const addSubscriber = async () => {
    if (username && subscribers && !subscribers.includes(username)) {
      const updateThreadInput: UpdateThreadInput = {
        id: id,
        subscribers: subscribers.concat(username),
      }

      const addNewSubscriber = (await API.graphql({
        query: updateThread,
        variables: { input: updateThreadInput },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as { data: UpdateThreadMutation }

      setSubs(addNewSubscriber.data.updateThread?.subscribers)
    }
  }

  const deleteSubscriber = async () => {
    if (subscribers && username) {
      const updateThreadInput: UpdateThreadInput = {
        id: id,
        subscribers: subscribers.filter((sub) => sub !== username),
      }

      const addNewSubscriber = (await API.graphql({
        query: updateThread,
        variables: { input: updateThreadInput },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as { data: UpdateThreadMutation }

      setSubs(addNewSubscriber.data.updateThread?.subscribers)
    }
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          {imageUrl && (
            <div style={{ borderRadius: "50%", overflow: "hidden", marginRight: "20px" }}>
              <Image src={imageUrl} layout="intrinsic" objectFit="cover" height={70} width={70} />
            </div>
          )}
          <Title>{name}</Title>
          <Subtitle>
            by <span>{owner}</span>
          </Subtitle>
          {owner !== username ? (
            subs?.includes(username as string) ? (
              <Button onClick={deleteSubscriber}>Leave</Button>
            ) : (
              <Button onClick={addSubscriber}>Join</Button>
            )
          ) : null}
        </HeaderContent>
      </Header>
      <PostsContainer>
        {posts?.items.sort(compareDates).map((post) => (
          <PostPreview key={post.id} post={post} />
        ))}
      </PostsContainer>
      <Info>
        <InfoTitle>About Thread</InfoTitle>
        <Description>{description}</Description>
        <Subs>{subs?.length} subscribers</Subs>
        <CreatedAt>Created at {format(new Date(createdAt), "MMMM d, Y")}</CreatedAt>
        <CreatePostButton onClick={() => router.push("/create")}>Create Post</CreatePostButton>
      </Info>
    </Container>
  )
}

export default IndividualThread

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
    revalidate: 30,
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
