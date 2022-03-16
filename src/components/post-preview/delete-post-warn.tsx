import { createPortal } from "react-dom"
import {
  Container,
  DeleteButton,
  CancelButton,
} from "styles/components/post-preview/delete-post-warn.styles"

interface IDeletePostWarn {
  deleteExistingPost: (postId: string) => Promise<void>
  setShowDeletePostWarn: React.Dispatch<React.SetStateAction<boolean>>
  id: string
}

export const DeletePostWarn: React.FC<IDeletePostWarn> = ({
  deleteExistingPost,
  setShowDeletePostWarn,
  id,
}) => {
  return createPortal(
    <Container>
      <span>Are you sure you want to delete this post?</span>
      <div>
        <DeleteButton onClick={() => deleteExistingPost(id)}>Yes</DeleteButton>
        <CancelButton onClick={() => setShowDeletePostWarn(false)}>No</CancelButton>
      </div>
    </Container>,
    document.getElementById(`container-${id}`) as Element
  )
}
