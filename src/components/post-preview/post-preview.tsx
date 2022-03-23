import {
  Post,
  UpdateVoteMutation,
  CreateVoteMutation,
  UpdateVoteInput,
  CreateVoteInput,
  DeletePostInput,
  UpdatePostInput,
} from "API"
import React, { SyntheticEvent, useEffect, useState } from "react"
import Downvote from "assets/icons/downvote.svg"
import Upvote from "assets/icons/upvote.svg"
import UpvoteFill from "assets/icons/upvote-fill.svg"
import DownvoteFill from "assets/icons/downvote-fill.svg"
import CommentIcon from "assets/icons/comment.svg"
import TrashboxIcon from "assets/icons/trashbox.svg"
import UpdatePostIcon from "assets/icons/update-post.svg"
import { formatDate } from "helpers/formatDate"
import { API, Storage } from "aws-amplify"
import { updateVote, createVote, deletePost, updatePost } from "graphql/mutations"
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api"
import Image from "next/image"
import { useRouter } from "next/router"
import { createPortal } from "react-dom"
import TextareaAutosize from "react-textarea-autosize"
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
  UpdatePostIconWrapper,
  ButtonGroup,
  Button,
  TextWrapper,
} from "styles/components/post-preview/post-preview.styles"
import { DeletePostWarn } from "./delete-post-warn"
import { useAppSelector } from "features/store"

interface Props {
  post: Post
}

export const PostPreview: React.FC<Props> = ({ post, children }) => {
  const [isPostDelete, setIsPostDelete] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const router = useRouter()
  const user = useAppSelector((state) => state.authReducer.user)
  const [existingVote, setExistingVote] = useState<string | undefined>(undefined)
  const [existingVoteId, setExistingVoteId] = useState<string | undefined>(undefined)
  const [upvotes, setUpvotes] = useState<number>(
    post.votes.items ? post.votes.items.filter((vote) => vote.vote === "upvote").length : 0
  )

  const [downvotes, setDownvotes] = useState<number>(
    post.votes.items ? post.votes.items.filter((vote) => vote.vote === "downvote").length : 0
  )
  const [isUpdatePostText, setIsUpdatePostText] = useState(false)
  const [postText, setPostText] = useState(post.content)
  const [showWarn, setShowWarn] = useState(false)
  const [showDeletePostWarn, setShowDeletePostWarn] = useState(false)

  useEffect(() => {
    if (user) {
      const tryFindVote = post.votes?.items?.find((vote) => vote?.owner === user)

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

  const updatePostText = async (postId: string, content: string) => {
    const updatePostTextInput: UpdatePostInput = {
      id: postId,
      content: content,
    }

    await API.graphql({
      query: updatePost,
      variables: { input: updatePostTextInput },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })
    setIsUpdatePostText(false)
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

  const handleThreadRedirect = (e: SyntheticEvent) => {
    e.stopPropagation()
    router.push(`/thread/${post.threadPostsId}`)
  }

  return !isPostDelete ? (
    <Container id={`container-${post.id}`} style={{ position: "relative" }}>
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
          {showWarn && <Warn setShowWarn={setShowWarn} postId={post.id} />}
          <UpvoteWrapper onClick={() => setShowWarn((showWarn) => !showWarn)}>
            <Upvote />
          </UpvoteWrapper>
          <p>{upvotes - downvotes}</p>
          <DownvoteWrapper onClick={() => setShowWarn((showWarn) => !showWarn)}>
            <Downvote />
          </DownvoteWrapper>
        </VoteSection>
      )}
      {user === post.owner ? (
        <ButtonGroup>
          {showDeletePostWarn && (
            <DeletePostWarn
              deleteExistingPost={deleteExistingPost}
              setShowDeletePostWarn={setShowDeletePostWarn}
              id={post.id}
            />
          )}
          <UpdatePostIconWrapper onClick={() => setIsUpdatePostText((prevState) => !prevState)}>
            <UpdatePostIcon />
          </UpdatePostIconWrapper>
          <TrashboxIconWrapper onClick={() => setShowDeletePostWarn(true)}>
            <TrashboxIcon />
          </TrashboxIconWrapper>
        </ButtonGroup>
      ) : null}
      <ContentSection onClick={() => router.push(`/post/${post.id}`)}>
        <TextWrapper>
          {post.thread?.name && (
            <SmallText onClick={handleThreadRedirect}>
              From <b>{post.thread.name}</b>
            </SmallText>
          )}
          <SmallText>
            Posted by <b>{post.owner}</b> {formatDate(post.createdAt)} hours ago.
          </SmallText>
        </TextWrapper>
        <Title>{post.title}</Title>
        {postText && isUpdatePostText ? (
          <>
            <TextareaAutosize
              value={postText}
              onChange={({ target }) => setPostText(target.value)}
              autoFocus
              style={{
                padding: "4px",
                overflow: "hidden",
                margin: "10px 0",
                borderRadius: "4px",
                resize: "vertical",
              }}
            />
            <Button onClick={() => updatePostText(post.id, postText)}>Save</Button>
          </>
        ) : (
          <Text>{post.content}</Text>
        )}
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
          {post.comments.items ? post.comments.items.length : "0"} Comment(s)
        </Comment>
        {children}
      </ContentSection>
    </Container>
  ) : null
}

interface IWarn {
  setShowWarn: React.Dispatch<React.SetStateAction<boolean>>
  postId: string
}

const Warn: React.FC<IWarn> = ({ postId, setShowWarn }) => {
  useEffect(() => {
    setTimeout(() => setShowWarn(false), 2000)
  }, [])

  return createPortal(
    <WarnContainer onBlur={() => setShowWarn(false)}>
      <p>In order to upvote/downvote post you should be authorized.</p>
    </WarnContainer>,
    document.getElementById(`container-${postId}`) as Element
  )
}
