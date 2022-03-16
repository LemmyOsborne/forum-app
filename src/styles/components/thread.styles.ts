import styled from "styled-components"

export const Container = styled.div`
  margin-top: 3.7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.secondary.dark};
`

export const Header = styled.header`
  background-color: ${({ theme }) => theme.palette.secondary.light};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: baseline;
  padding: 20px;
  margin-bottom: 40px;
`

export const Title = styled.h1`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 40px;
  margin-right: 10px;
`

export const Subtitle = styled.h2`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 30px;

  span {
    text-decoration: underline;
    cursor: pointer;
  }
`
