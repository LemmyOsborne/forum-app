import { API } from "aws-amplify"
import { deleteComment, updateComment } from "graphql/mutations"
import { Comment, DeleteCommentInput, UpdateCommentInput } from "API"
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api"
import React, { useState } from "react"
import { formatDate } from "helpers/formatDate"
import { Container, Info, Content } from "styles/components/post-comment.styles"
import TrashboxIcon from "assets/icons/trashbox.svg"
import UpdatePostIcon from "assets/icons/update-post.svg"
import TextareaAutosize from "react-textarea-autosize"
import {
  ButtonGroup,
  TrashboxIconWrapper,
  UpdatePostIconWrapper,
  Button,
} from "styles/components/post-preview/post-preview.styles"

interface Props {
  comment: Comment | null
}

export const PostComment: React.FC<Props> = ({ comment }) => {
  const [isUpdateCommentText, setIsUpdateCommentText] = useState(false)
  const [commentText, setCommentText] = useState(comment?.content)
  const [isCommentDelete, setIsCommentDelete] = useState(false)

  const updateCommentText = async (commentId: string, text: string) => {
    const updateCommentTextInput: UpdateCommentInput = {
      id: commentId,
      content: text,
    }

    await API.graphql({
      query: updateComment,
      variables: { input: updateCommentTextInput },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })

    setIsUpdateCommentText(false)
  }

  const deleteExistingComment = async (commentId: string) => {
    setIsCommentDelete(true)

    const deleteCommentInput: DeleteCommentInput = { id: commentId }

    await API.graphql({
      query: deleteComment,
      variables: { input: deleteCommentInput },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })
  }

  return comment && !isCommentDelete ? (
    <Container>
      <ButtonGroup>
        <UpdatePostIconWrapper onClick={() => setIsUpdateCommentText((prevState) => !prevState)}>
          <UpdatePostIcon width="16" height="16" />
        </UpdatePostIconWrapper>
        <TrashboxIconWrapper onClick={() => deleteExistingComment(comment.id)}>
          <TrashboxIcon width="18" height="18" />
        </TrashboxIconWrapper>
      </ButtonGroup>
      <Info>
        <b>{comment.owner}</b>
        <p>{formatDate(comment.createdAt)} hr. ago</p>
      </Info>
      {isUpdateCommentText && commentText ? (
        <>
          <TextareaAutosize
            value={commentText}
            onChange={({ target }) => setCommentText(target.value)}
            autoFocus
            style={{
              padding: "4px",
              overflow: "hidden",
              margin: "10px 0",
              borderRadius: "4px",
              resize: "vertical",
            }}
          />
          <Button onClick={() => updateCommentText(comment.id, commentText)}>Save</Button>
        </>
      ) : (
        <Content>{commentText}</Content>
      )}
    </Container>
  ) : null
}
