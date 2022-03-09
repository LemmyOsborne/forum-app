import styled from "styled-components"

export const Container = styled.main`
  background-color: ${({ theme }) => theme.palette.grey[800]};
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.common.black};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 100%;
  min-height: 100vh;
  padding: 7rem 0 30px;
`

export const CloseButton = styled.button`
  position: absolute;
  z-index: 10;
  top: 75px;
  right: 50px;
  color: white;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;

  svg {
    margin-right: 3px;
  }

  :hover {
    opacity: 0.8;
  }
`

export const Textarea = styled.textarea`
  min-height: 150px;
  min-width: 100%;
  max-width: 100%;
  padding: 20px;
  border-radius: 3px;
  background-color: inherit;
  border: 1px solid lightgrey;
  color: ${({ theme }) => theme.palette.text.secondary};
`

export const Button = styled.button`
  max-height: 30px;
  padding: 5px 20px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.palette.info.dark};
  color: ${({ theme }) => theme.palette.secondary.contrastText};
`

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.palette.warning.light};
  width: 100%;
  margin: 10px 0 15px;
`
