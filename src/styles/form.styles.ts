import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  position: relative;
`

export const Form = styled.form`
  width: 400px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.palette.grey[700]};
  padding: 40px 20px;
  user-select: none;
`

export const Input = styled.input`
  padding: 10px 20px;
  margin-bottom: 5px;
  min-height: 50px;
  width: 100%;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.grey[200]};

  :hover {
    outline: ${({ theme }) => theme.palette.warning.main} 2px solid;
  }

  :focus {
    outline: ${({ theme }) => theme.palette.info.light} 2px solid;
  }

  :last-of-type {
    margin-bottom: 15px;
  }
`

export const Button = styled.button`
  background-color: ${({ theme }) => theme.palette.primary.dark};
  padding: 10px 15px;
  border-radius: 4px;
  color: ${({ theme }) => theme.palette.common.white};
  cursor: pointer;

  :disabled {
    opacity: 0.6;
  }
`

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.palette.warning.light};
  width: 100%;
  margin: 10px 0 15px;
`

export const ServerError = styled.div`
  background-color: ${({ theme }) => theme.palette.info.dark};
  color: ${({ theme }) => theme.palette.error.dark};
  width: 100vw;
  min-height: 100px;
  padding: 10px 20px;
  border-radius: 4px;
`
