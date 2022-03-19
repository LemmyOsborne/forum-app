import { CreateThreadInput, CreateThreadMutation } from "API"
import { API, Storage } from "aws-amplify"
import { createThread } from "graphql/mutations"
import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import styled from "styled-components"
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api"
import { useRouter } from "next/router"
import { ImageDropzone } from "./image-dropzone"
import { v4 as uuidv4 } from "uuid"

interface Props {
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

interface IFormData {
  name: string
  description?: string
}

export const CreateThread: React.FC<Props> = ({ setModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>()

  const router = useRouter()
  const [file, setFile] = useState<File>()

  const onSubmit: SubmitHandler<IFormData> = async ({ name, description }) => {
    if (file) {
      try {
        const imagePath = uuidv4()

        await Storage.put(imagePath, file, {
          contentType: file.type,
        })

        const createThreadInput: CreateThreadInput = {
          name: name,
          description: description,
          image: imagePath,
        }

        const newThread = (await API.graphql({
          query: createThread,
          variables: { input: createThreadInput },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as { data: CreateThreadMutation }

        router.push(`/thread/${newThread.data.createThread?.id}`)
      } catch (e) {
        console.error(e)
      }
    } else {
      try {
        const createThreadInput: CreateThreadInput = {
          name: name,
          description: description,
        }

        const newThread = (await API.graphql({
          query: createThread,
          variables: { input: createThreadInput },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as { data: CreateThreadMutation }

        router.push(`/thread/${newThread.data.createThread?.id}`)
      } catch (e) {
        console.error(e)
      }
    }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden"
  }, [])

  return createPortal(
    <Overlay onClick={() => setModal(false)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Top>
          <Title>Create new community.</Title>
          <Subtitle>Community names cannot be changed after creating.</Subtitle>
        </Top>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="name">Name of community</Label>
          <InputWrapper>
            <Input
              placeholder="Name"
              id="name"
              {...register("name", {
                required: true,
                maxLength: {
                  value: 30,
                  message: "Community name must be shorter than 31 character.",
                },
              })}
            />
          </InputWrapper>
          <Label htmlFor="description">Describe your community</Label>
          <InputWrapper>
            <Input
              placeholder="Describe your community"
              id="description"
              {...register("description", {
                maxLength: {
                  value: 300,
                  message: "Description must be shorter than 301 character.",
                },
              })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </InputWrapper>
          <Label htmlFor="image">Add an avatar of your community</Label>
          <InputWrapper>
            <ImageDropzone id="image" file={file} setFile={setFile} />
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

const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.background.header};
  max-width: 600px;
  width: 100%;
  min-width: 310px;
  padding: 20px;
  border-radius: 4px;
  position: relative;
  z-index: 1001;
  overflow: scroll;
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
  margin-bottom: 20px;
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

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.palette.warning.light};
  width: 100%;
  margin: 10px 0 15px;
`
