import { Post, UpdateVoteMutation, CreateVoteMutation, UpdateVoteInput, CreateVoteInput } from "API"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Downvote from "assets/icons/downvote.svg"
import Upvote from "assets/icons/upvote.svg"
import UpvoteFill from "assets/icons/upvote-fill.svg"
import DownvoteFill from "assets/icons/downvote-fill.svg"
import { formatDate } from "helpers/formatDate"
import { API, Storage } from "aws-amplify"
import { updateVote, createVote } from "graphql/mutations"
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api"
import { useUser } from "context/AuthContext"
import Image from "next/image"
import { useRouter } from "next/router"

interface Props {
  post: Post
}

export const PostPreview: React.FC<Props> = ({ post }) => {
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
          console.log(imageUrl)
          setImageUrl(imageUrl)
        } catch (error) {
          console.error(error)
        }
      }
    }
    getPostImageUrl()
  }, [])

  const addVote = async (voteType: string) => {
    if (existingVote && existingVoteId && existingVote != voteType) {
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
      console.log("Updated vote:", updateThisVote)
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
      console.log("Created vote:", createNewVote)
    }
  }

  return (
    <Container onClick={() => router.push(`/post/${post.id}`)}>
      <VoteSection>
        <UpvoteWrapper onClick={() => addVote("upvote")}>
          {existingVote === "upvote" ? <UpvoteFill /> : <Upvote />}
        </UpvoteWrapper>
        <p>{upvotes - downvotes}</p>
        <DownvoteWrapper onClick={() => addVote("downvote")}>
          {existingVote === "downvote" ? <DownvoteFill /> : <Downvote />}
        </DownvoteWrapper>
      </VoteSection>
      <ContentSection>
        <SmallText>
          Posted by <b>{post.owner}</b> {formatDate(post.createdAt)} hours ago.
        </SmallText>
        <Title>{post.title}</Title>
        <Text>{post.content}</Text>
        {post.image && imageUrl && (
          <Image src={imageUrl} height={540} width={980} layout="intrinsic" />
        )}
      </ContentSection>
    </Container>
  )
}

const Container = styled.article`
  display: flex;
  width: 50%;
  min-width: 480px;
  background-color: ${({ theme }) => theme.palette.grey[100]};
  margin-bottom: 10px;
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;

  :hover {
    outline: ${({ theme }) => theme.palette.grey[500]} 1px solid;
  }
`

const VoteSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 15px;
  user-select: none;

  p {
    font-weight: 500;
  }
`

const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`

const Text = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
`

const SmallText = styled.p`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 12px;
  margin-bottom: 10px;
`

const UpvoteWrapper = styled.div`
  border-radius: 2px;
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.palette.warning.main};
    background-color: ${({ theme }) => theme.palette.grey[300]};
  }
`

const DownvoteWrapper = styled(UpvoteWrapper)`
  margin-top: 2px;

  :hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`
