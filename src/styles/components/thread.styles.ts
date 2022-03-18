import styled from "styled-components"

export const Container = styled.div`
  margin-top: 3rem;
  display: grid;
  position: relative;
  align-items: center;
  min-height: 100vh;
  grid-template-areas:
    "head head "
    "posts info"
    "posts .";
  grid-template-rows: 100px 1fr;
  grid-template-columns: 1fr 35vw;
  gap: 20px;
  background-color: ${({ theme }) => theme.palette.secondary.dark};
`

export const Header = styled.header`
  background-color: ${({ theme }) => theme.palette.secondary.light};
  width: 100%;
  padding: 20px;
  grid-area: head;
`

export const HeaderContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
`

export const PostsContainer = styled.section`
  grid-area: posts;
  justify-self: end;
  align-self: start;
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
  padding: 4px 25px;
  margin-top: 10px;
  border-radius: 25px;
  margin-left: 20px;
  font-weight: 600;
  border: 2px solid ${({ theme }) => theme.palette.secondary.contrastText};
  color: ${({ theme }) => theme.palette.secondary.contrastText};
  align-self: center;

  :hover {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.contrastText};
    border: 2px solid ${({ theme }) => theme.palette.primary.contrastText};
  }
`

export const Info = styled.section`
  grid-area: info;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.text.primary};
  width: 300px;
  padding: 10px 20px 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-self: start;
  justify-self: start;
`

export const InfoTitle = styled.h1`
  color: ${({ theme }) => theme.palette.secondary.contrastText};
  font-size: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.secondary.contrastText};
`
export const CreatePostButton = styled.button`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  transition: all 0.33s cubic-bezier(0.075, 0.82, 0.165, 1);

  :hover {
    background-color: ${({ theme }) => theme.palette.primary.dark};
    text-decoration: underline;
  }
`

export const Description = styled.p`
  font-weight: 500;
  letter-spacing: 0.3px;
`

export const Subs = styled.p``

export const CreatedAt = styled.p``
