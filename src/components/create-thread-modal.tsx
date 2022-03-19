import { CreateThreadInput, CreateThreadMutation } from "API"
import { API, Storage } from "aws-amplify"
import { createThread } from "graphql/mutations"
import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api"
import { useRouter } from "next/router"
import { ImageDropzone } from "./image-dropzone"
import { v4 as uuidv4 } from "uuid"
import {
  Button,
  Container,
  ErrorMessage,
  Footer,
  Form,
  Input,
  InputWrapper,
  Label,
  Overlay,
  Subtitle,
  Title,
  Top,
} from "styles/components/create-thread-modal"

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
