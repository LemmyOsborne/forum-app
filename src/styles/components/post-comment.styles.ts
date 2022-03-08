import styled from "styled-components"

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 4px;
`

export const Info = styled.div`
  display: flex;

  p {
    margin-left: 5px;
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`

export const Content = styled.div`
  padding: 10px 0;
  font-size: 16px;
`
