import { Comment } from "API"
import React from "react"
import styled from "styled-components"
import { formatDate } from "helpers/formatDate"

interface Props {
  comment: Comment | null
}

export const PostComment: React.FC<Props> = ({ comment }) => {
  return comment ? (
    <Container>
      <Info>
        <b>{comment.owner}</b>
        <p>{formatDate(comment.createdAt)} hr. ago</p>
      </Info>
      <Content>{comment.content}</Content>
    </Container>
  ) : (
    <p>Loading...</p>
  )
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 4px;
`

const Info = styled.div`
  display: flex;

  p {
    margin-left: 5px;
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`

const Content = styled.div`
  padding: 10px 0;
  font-size: 16px;
`
