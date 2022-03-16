import { CreateThreadInput } from "API"
import { API } from "aws-amplify"
import { createThread } from "graphql/mutations"
import React, { useEffect } from "react"
import { createPortal } from "react-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import styled from "styled-components"
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api"

export const CreateThread = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>()

  const onSubmit: SubmitHandler<{ name: string }> = async (data) => {
    const createThreadInput: CreateThreadInput = { name: data.name }

    const createNewThread = await API.graphql({
      query: createThread,
      variables: { input: createThreadInput },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })
  }

  useEffect(() => {
    document.body.style.overflow = "hidden"
  }, [])

  return createPortal(
    <Overlay>
      <Container>
        <Top>
          <Title>Create new community.</Title>
          <Subtitle>Community names cannot be changed after creating.</Subtitle>
        </Top>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="input">Name of community</Label>
          <InputWrapper>
            <Input
              placeholder="Name"
              id="input"
              {...register("name", {
                required: true,
                maxLength: {
                  value: 30,
                  message: "Community name must be shorter than 31 character.",
                },
              })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </InputWrapper>
          <Footer>
            <Button type="submit">Create Community</Button>
          </Footer>
        </Form>
      </Container>
    </Overlay>,
    document.body
  )
}

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: #1c1c1ce6;
  z-index: 999;
  position: absolute;
  top: 0;
  pointer-events: unset;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.background.header};
  height: 350px;
  width: 600px;
  padding: 20px;
  border-radius: 4px;
  position: relative;
`

const Top = styled.section`
  margin-bottom: 60px;
`

const Title = styled.h1`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 30px;
`

const Subtitle = styled.p``

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  font-size: 18px;
  color: ${({ theme }) => theme.palette.text.primary};
  margin-bottom: 10px;
`

const InputWrapper = styled.div`
  margin-bottom: 40px;
  width: 100%;
`

const Input = styled.input`
  border-radius: 4px;
  padding: 10px;
  width: 100%;
`

const Button = styled.button`
  background-color: ${({ theme }) => theme.palette.primary.dark};
  padding: 10px 15px;
  border-radius: 25px;
  max-width: 150px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.text.primary};
`

const Footer = styled.footer`
  background-color: ${({ theme }) => theme.palette.primary.main};
  padding: 15px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 0 0 4px 4px;
  display: flex;
  flex-direction: row-reverse;
`

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.palette.warning.light};
  width: 100%;
  margin: 10px 0 15px;
`
