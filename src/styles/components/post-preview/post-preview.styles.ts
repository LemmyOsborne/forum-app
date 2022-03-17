import styled from "styled-components"

export const WarnContainer = styled.div`
  width: 400px;
  max-width: 80%;
  padding: 10px;
  position: absolute;
  border-radius: 4px;
  left: 40px;
  z-index: 1050;
  background-color: ${({ theme }) => theme.palette.warning.light};
  color: ${({ theme }) => theme.palette.warning.contrastText};
`

export const Container = styled.article`
  display: flex;
  min-width: 400px;
  width: 90%;
  max-width: 700px;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  margin-bottom: 10px;
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;
  height: 100%;
  position: relative;

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
  max-width: 90%;
`

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`

export const Text = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
  overflow-wrap: anywhere;
  white-space: pre-line;
`

export const SmallText = styled.p`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 12px;
  margin-bottom: 10px;

  :first-of-type {
    b {
      :hover {
        color: ${({ theme }) => theme.palette.text.primary};
        text-decoration: underline;
      }
    }

    :after {
      content: "-";
      margin: 0 4px;
    }
  }
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
    color: ${({ theme }) => theme.palette.info.main};
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
    background-color: ${({ theme }) => theme.palette.secondary.dark};
  }
`

export const ButtonGroup = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  display: flex;
  z-index: 100;
`

export const TrashboxIconWrapper = styled.div`
  fill: ${({ theme }) => theme.palette.text.secondary};
  padding: 1px 1px 0;
  border-radius: 4px;

  :hover {
    fill: ${({ theme }) => theme.palette.error.main};
    background-color: ${({ theme }) => theme.palette.secondary.dark};
  }
`

export const UpdatePostIconWrapper = styled.div`
  color: ${({ theme }) => theme.palette.text.secondary};
  padding: 3px;
  border-radius: 4px;

  :hover {
    color: ${({ theme }) => theme.palette.success.light};
    background-color: ${({ theme }) => theme.palette.secondary.dark};
  }
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
