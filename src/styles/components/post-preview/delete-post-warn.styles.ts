import styled from "styled-components"

export const Container = styled.div`
  width: 400px;
  height: 50%;
  max-width: 80%;
  padding: 10px;
  position: absolute;
  border-radius: 4px;
  right: 20px;
  z-index: 150;
  background-color: ${({ theme }) => theme.palette.warning.light};
  color: ${({ theme }) => theme.palette.warning.contrastText};
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;

  @media (max-width: ${({ theme }) => theme.media.md}) {
    font-size: 16px;
  }
`

export const DeleteButton = styled.button`
  transition: text-decoration 0.33s ease;
  font-size: 16px;

  :hover {
    text-decoration: line-through;
    color: ${({ theme }) => theme.palette.error.main};
  }
`
export const CancelButton = styled(DeleteButton)`
  margin-left: 35px;

  :hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.palette.success.main};
  }
`
