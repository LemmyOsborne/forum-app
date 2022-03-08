import styled from "styled-components"

export const WarnContainer = styled.div`
  width: 400px;
  max-width: 80%;
  padding: 10px;
  position: absolute;
  border-radius: 4px;
  left: 40px;
  z-index: 50;
  background-color: ${({ theme }) => theme.palette.warning.light};
  color: ${({ theme }) => theme.palette.warning.contrastText};
`

export const Container = styled.article`
  display: flex;
  width: 50%;
  min-width: 480px;
  background-color: ${({ theme }) => theme.palette.grey[100]};
  margin-bottom: 10px;
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;

  :hover {
    outline: ${({ theme }) => theme.palette.grey[500]} 1px solid;
  }
`

export const VoteSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 15px;
  user-select: none;

  p {
    font-weight: 500;
  }
`

export const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
`

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`

export const Text = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
`

export const SmallText = styled.p`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 12px;
  margin-bottom: 10px;
`

export const UpvoteWrapper = styled.div`
  border-radius: 2px;
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.palette.warning.main};
    background-color: ${({ theme }) => theme.palette.grey[300]};
  }
`

export const DownvoteWrapper = styled(UpvoteWrapper)`
  margin-top: 2px;

  :hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`

export const Comment = styled.div`
  max-width: fit-content;
  padding: 10px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.text.secondary};

  svg {
    color: ${({ theme }) => theme.palette.text.secondary};
    margin-right: 5px;
  }

  :hover {
    background-color: ${({ theme }) => theme.palette.grey[300]};
  }
`
