import { Post } from "API"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Downvote from "assets/icons/downvote.svg"
import Upvote from "assets/icons/upvote.svg"
import UpvoteFill from "assets/icons/upvote-fill.svg"
import DownvoteFill from "assets/icons/downvote-fill.svg"
import { formatDate } from "helpers/formatDate"

interface Props {
  post: Post
}

export const PostPreview: React.FC<Props> = ({ post }) => {
  const [upvotes, setUpvotes] = useState<number | undefined>(
    post.votes?.items ? post.votes.items.filter((vote) => vote?.vote === "upvote").length : 0
  )
  const [downvotes, setDownvotes] = useState<number | undefined>(
    post.votes?.items ? post.votes.items.filter((vote) => vote?.vote === "downvote").length : 0
  )

  const [upvoted, setUpvoted] = useState(false)
  const [downvoted, setDownvoted] = useState(false)

  const handleUpvoted = () => {
    if (downvoted) {
      setDownvoted(false)
    }
    setUpvoted((upvoted) => !upvoted)
  }

  const handleDownvoted = () => {
    if (upvoted) {
      setUpvoted(false)
    }
    setDownvoted((downvoted) => !downvoted)
  }

  return (
    <Container>
      <VoteSection>
        <UpvoteWrapper onClick={handleUpvoted}>
          {upvoted ? <UpvoteFill /> : <Upvote />}
        </UpvoteWrapper>
        <p>{upvotes - downvotes}</p>
        <DownvoteWrapper onClick={handleDownvoted}>
          {downvoted ? <DownvoteFill /> : <Downvote />}
        </DownvoteWrapper>
      </VoteSection>
      <InfoSection>
        <SmallText>
          Posted by <b>{post.owner}</b> {formatDate(post.createdAt)} hours ago.
        </SmallText>
        <Title>{post.title}</Title>
        <Text>{post.content}</Text>
      </InfoSection>
    </Container>
  )
}

const Container = styled.article`
  display: flex;
  min-width: 600px;
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

  p {
    font-weight: 500;
  }
`

const InfoSection = styled.section`
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
