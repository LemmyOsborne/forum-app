import styled from "styled-components"

export const Container = styled.div`
  border: 1px dashed snow;
  height: 250px;
  padding-left: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.grey[200]};
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 20px;

  p {
    color: ${({ theme }) => theme.palette.grey[600]};
  }
`
