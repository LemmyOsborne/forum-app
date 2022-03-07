import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api"
import { CreatePostInput, CreatePostMutation } from "API"
import { API, Storage } from "aws-amplify"
import { ImageDropzone } from "components"
import { createPost } from "graphql/mutations"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import styled from "styled-components"
import { Button, Container, ErrorMessage, Input } from "styles/form.styles"
import { v4 as uuidv4 } from "uuid"

interface IFormData {
  title: string
  content?: string
}

const Create = () => {
  const [file, setFile] = useState<File>()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>()

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    console.log(file)
    console.log(data)

    if (file) {
      try {
        const imagePath = uuidv4()

        await Storage.put(imagePath, file, {
          contentType: file.type,
        })

        const createNewPostInput: CreatePostInput = {
          title: data.title,
          content: data.content,
          image: imagePath,
        }
        const createNewPost = (await API.graphql({
          query: createPost,
          variables: { input: createNewPostInput },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as { data: CreatePostMutation }

        console.log("New post created successfully:", createNewPost)

        router.push(`/post/${createNewPost.data.createPost?.id}`)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Error uploading file: ", error)
      }
    } else {
      const createNewPostWithoutImageInput: CreatePostInput = {
        title: data.title,
        content: data.content,
      }

      const createNewPostWithoutImage = (await API.graphql({
        query: createPost,
        variables: { input: createNewPostWithoutImageInput },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as { data: CreatePostMutation }

      router.push(`/post/${createNewPostWithoutImage.data.createPost?.id}`)
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Title"
          {...register("title", {
            required: { value: true, message: "Please enter a title." },
            maxLength: {
              value: 120,
              message: "Please enter a username under 120 characters.",
            },
          })}
        />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        <Textarea
          placeholder="Text"
          {...register("content", {
            maxLength: {
              value: 1000,
              message: "Please enter a text under 1000 characters.",
            },
          })}
        />
        {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
        <ImageDropzone file={file} setFile={setFile} />
        <Button type="submit">Post</Button>
      </Form>
    </Container>
  )
}

const Form = styled.form`
  width: 800px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.palette.grey[700]};
  padding: 40px 40px;
  user-select: none;
  position: absolute;
  top: 6rem;
`

const Textarea = styled.textarea`
  padding: 10px 20px;
  margin-bottom: 5px;
  min-height: 150px;
  max-width: 100%;
  min-width: 100%;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.grey[200]};
`

export default Create
