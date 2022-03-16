import {
  Post,
  UpdateVoteMutation,
  CreateVoteMutation,
  UpdateVoteInput,
  CreateVoteInput,
  DeletePostInput,
} from "API"
import React, { useEffect, useState } from "react"
import Downvote from "assets/icons/downvote.svg"
import Upvote from "assets/icons/upvote.svg"
import UpvoteFill from "assets/icons/upvote-fill.svg"
import DownvoteFill from "assets/icons/downvote-fill.svg"
import { formatDate } from "helpers/formatDate"
import { API, Storage } from "aws-amplify"
import { updateVote, createVote, deletePost } from "graphql/mutations"
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api"
import { useUser } from "context/AuthContext"
import Image from "next/image"
import { useRouter } from "next/router"
import CommentIcon from "assets/icons/comment.svg"
import TrashboxIcon from "assets/icons/trashbox.svg"
import { createPortal } from "react-dom"
import {
  Comment,
  Container,
  ContentSection,
  DownvoteWrapper,
  SmallText,
  Text,
  Title,
  UpvoteWrapper,
  VoteSection,
  WarnContainer,
  TrashboxIconWrapper,
} from "styles/components/post-preview.styles"

interface Props {
  post: Post
}

export const PostPreview: React.FC<Props> = ({ post, children }) => {
  const [isPostDelete, setIsPostDelete] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const router = useRouter()
  const { user } = useUser()
  const [existingVote, setExistingVote] = useState<string | undefined>(undefined)
  const [existingVoteId, setExistingVoteId] = useState<string | undefined>(undefined)
  const [upvotes, setUpvotes] = useState<number>(
    post.votes?.items ? post.votes?.items.filter((vote) => vote?.vote === "upvote").length : 0
  )

  const [downvotes, setDownvotes] = useState<number>(
    post.votes.items ? post.votes.items.filter((vote) => vote?.vote === "downvote").length : 0
  )
  useEffect(() => {
    if (user) {
      const tryFindVote = post.votes.items?.find((vote) => vote.owner === user.getUsername())

      if (tryFindVote) {
        setExistingVote(tryFindVote.vote)
        setExistingVoteId(tryFindVote.id)
      }
    }
  }, [user])

  useEffect(() => {
    const getPostImageUrl = async () => {
      if (post.image) {
        try {
          const imageUrl = await Storage.get(post.image)
          setImageUrl(imageUrl)
        } catch (error) {
          console.error(error)
        }
      }
    }
    getPostImageUrl()
  }, [])

  const addVote = async (voteType: string) => {
    if (existingVote && existingVoteId && existingVote !== voteType) {
      const updateVoteInput: UpdateVoteInput = {
        id: existingVoteId,
        vote: voteType,
        postVotesId: post.id,
      }

      const updateThisVote = (await API.graphql({
        query: updateVote,
        variables: { input: updateVoteInput },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as { data: UpdateVoteMutation }

      if (voteType === "upvote") {
        setUpvotes(upvotes + 1)
        setDownvotes(downvotes - 1)
      }

      if (voteType === "downvote") {
        setUpvotes(upvotes - 1)
        setDownvotes(downvotes + 1)
      }
      setExistingVote(voteType)
      setExistingVoteId(updateThisVote.data.updateVote?.id)
    }

    if (!existingVote) {
      const createNewVoteInput: CreateVoteInput = {
        vote: voteType,
        postVotesId: post.id,
      }

      const createNewVote = (await API.graphql({
        query: createVote,
        variables: { input: createNewVoteInput },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as { data: CreateVoteMutation }

      if (createNewVote.data.createVote?.vote === "downvote") {
        setDownvotes(downvotes + 1)
      }
      if (createNewVote.data.createVote?.vote === "upvote") {
        setUpvotes(upvotes + 1)
      }
      setExistingVote(voteType)
      setExistingVoteId(createNewVote.data.createVote?.id)
    }
  }

  const deleteExistingPost = async (postId: string) => {
    const deletePostInput: DeletePostInput = {
      id: postId,
    }
    await API.graphql({
      query: deletePost,
      variables: { input: deletePostInput },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })
    setIsPostDelete(true)
  }

  const [showWarn, setShowWarn] = useState(false)

  return !isPostDelete ? (
    <Container id="container" style={{ position: "relative" }}>
      {user ? (
        <VoteSection>
          <UpvoteWrapper onClick={() => addVote("upvote")}>
            {existingVote === "upvote" ? <UpvoteFill /> : <Upvote />}
          </UpvoteWrapper>
          <p>{upvotes - downvotes}</p>
          <DownvoteWrapper onClick={() => addVote("downvote")}>
            {existingVote === "downvote" ? <DownvoteFill /> : <Downvote />}
          </DownvoteWrapper>
        </VoteSection>
      ) : (
        <VoteSection>
          {showWarn && <Warn />}
          <UpvoteWrapper onClick={() => setShowWarn((showWarn) => !showWarn)}>
            <Upvote />
          </UpvoteWrapper>
          <p>{upvotes - downvotes}</p>
          <DownvoteWrapper onClick={() => setShowWarn((showWarn) => !showWarn)}>
            <Downvote />
          </DownvoteWrapper>
        </VoteSection>
      )}
      {user?.getUsername() === post.owner ? (
        <TrashboxIconWrapper onClick={() => deleteExistingPost(post.id)}>
          <TrashboxIcon />
        </TrashboxIconWrapper>
      ) : null}
      <ContentSection onClick={() => router.push(`/post/${post.id}`)}>
        <SmallText>
          Posted by <b>{post.owner}</b> {formatDate(post.createdAt)} hours ago.
        </SmallText>
        <Title>{post.title}</Title>
        <Text>{post.content}</Text>
        {post.image && imageUrl && (
          <Image
            src={imageUrl}
            height={540}
            width={980}
            objectPosition={"left"}
            objectFit={"contain"}
            layout="intrinsic"
            alt="Post image"
          />
        )}
        <Comment>
          <CommentIcon />
          {post.comments?.items.length} Comment(s)
        </Comment>
        {children}
      </ContentSection>
    </Container>
  ) : null
}

const Warn = () => {
  return createPortal(
    <WarnContainer>
      <p>In order to upvote/downvote post you should be authorized.</p>
    </WarnContainer>,
    document.getElementById("container") as Element
  )
}
