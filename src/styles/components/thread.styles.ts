import styled from "styled-components"

export const Container = styled.div`
  margin-top: 3.7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
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
  position: relative;
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

export const Button = styled.button`
  padding: 10px 20px;
  border-radius: 25px;
  font-weight: 600;
  border: 2px solid ${({ theme }) => theme.palette.secondary.contrastText};
  color: ${({ theme }) => theme.palette.secondary.contrastText};
  align-self: center;
  position: absolute;
  right: 40px;

  :hover {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.contrastText};
    border: 2px solid ${({ theme }) => theme.palette.primary.contrastText};
  }
`
