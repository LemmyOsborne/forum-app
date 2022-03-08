import { Comment } from "API"
import React from "react"
import { formatDate } from "helpers/formatDate"
import { Container, Info, Content } from "styles/components/post-comment.styles"

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
