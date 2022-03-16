import styled from "styled-components"

export const Container = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.secondary.dark};
  margin-top: 10px;
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

export const Button = styled.button`
  max-height: 30px;
  max-width: 100px;
  padding: 5px 20px;
  border-radius: 20px;
  margin-bottom: 15px;
  background-color: ${({ theme }) => theme.palette.info.dark};
  color: ${({ theme }) => theme.palette.secondary.contrastText};
`
