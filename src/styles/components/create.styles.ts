import styled from "styled-components"

export const Form = styled.form`
  width: 800px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.palette.grey[700]};
  padding: 40px 40px;
  user-select: none;
  position: absolute;
  top: 6rem;
`

export const Textarea = styled.textarea`
  padding: 10px 20px;
  margin-bottom: 5px;
  min-height: 150px;
  max-width: 100%;
  min-width: 100%;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.grey[200]};
`
