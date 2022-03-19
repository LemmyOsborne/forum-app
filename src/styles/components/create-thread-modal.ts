import styled from "styled-components"

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: hsl(0, 0%, 15%, 0.9);
  z-index: 999;
  position: absolute;
  top: 0;
  pointer-events: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 60px;
  overflow: scroll;
`

export const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.background.header};
  max-width: 600px;
  width: 100%;
  min-width: 310px;
  padding: 20px;
  border-radius: 4px;
  position: relative;
  z-index: 1001;
  overflow: scroll;

  @media (max-width: ${({ theme }) => theme.media.sm}) {
    padding: 10px;
  }
`

export const Top = styled.section`
  margin-bottom: 60px;
`

export const Title = styled.h1`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 30px;
`

export const Subtitle = styled.p``

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`

export const Label = styled.label`
  font-size: 18px;
  color: ${({ theme }) => theme.palette.text.primary};
  margin-bottom: 10px;
`

export const InputWrapper = styled.div`
  margin-bottom: 20px;
  width: 100%;
`

export const Input = styled.input`
  border-radius: 4px;
  padding: 10px;
  width: 100%;
`

export const Button = styled.button`
  background-color: ${({ theme }) => theme.palette.primary.dark};
  padding: 10px 15px;
  border-radius: 25px;
  max-width: 150px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.text.primary};
`

export const Footer = styled.footer`
  background-color: ${({ theme }) => theme.palette.secondary.dark};
  padding: 15px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 0 0 4px 4px;
  display: flex;
  flex-direction: row-reverse;
`

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.palette.warning.light};
  width: 100%;
  margin: 10px 0 15px;
`
