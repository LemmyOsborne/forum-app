import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api"
import { CreatePostInput, CreatePostMutation } from "API"
import { API, Storage } from "aws-amplify"
import { ImageDropzone } from "components/image-dropzone"
import { createPost } from "graphql/mutations"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Button, Container, ErrorMessage, Input, Select } from "styles/components/form.styles"
import { Form, Textarea } from "styles/components/create.styles"
import { v4 as uuidv4 } from "uuid"
import * as ROUTES from "constants/routes"
import { ThreadsContext } from "context/ThreadsContext"

interface IFormData {
  title: string
  content?: string
  threadId: string
}

const Create = () => {
  const [file, setFile] = useState<File>()
  const router = useRouter()
  const { threads } = useContext(ThreadsContext)
  const { threadName } = router.query

  useEffect(() => {
    if (
      !localStorage.getItem(
        "CognitoIdentityServiceProvider.5rj6ud7ornl6odgesokbgimbtb.LastAuthUser"
      )
    ) {
      router.push(ROUTES.HOME)
    }
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormData>()

  const onSubmit: SubmitHandler<IFormData> = async ({ title, content, threadId }) => {
    if (file) {
      try {
        const imagePath = uuidv4()

        await Storage.put(imagePath, file, {
          contentType: file.type,
        })

        const createNewPostInput: CreatePostInput = {
          title: title,
          content: content,
          image: imagePath,
          threadPostsId: threadId,
        }
        const createNewPost = (await API.graphql({
          query: createPost,
          variables: { input: createNewPostInput },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as { data: CreatePostMutation }

        threadName
          ? router.push(`/thread/${createNewPost.data.createPost?.threadPostsId}`)
          : router.push(`/post/${createNewPost.data.createPost?.id}`)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Error uploading file: ", error)
      }
    } else {
      const createNewPostWithoutImageInput: CreatePostInput = {
        title: title,
        content: content,
        threadPostsId: threadId,
      }

      const createNewPostWithoutImage = (await API.graphql({
        query: createPost,
        variables: { input: createNewPostWithoutImageInput },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as { data: CreatePostMutation }

      threadName
        ? router.push(`/thread/${createNewPostWithoutImage.data.createPost?.threadPostsId}`)
        : router.push(`/post/${createNewPostWithoutImage.data.createPost?.id}`)
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
        <Select
          {...register("threadId", {
            required: { value: true, message: "Please choose where you want to public this post." },
          })}
        >
          {threads?.map((thread) => (
            <React.Fragment key={thread.id}>
              {threadName ? (
                <option selected disabled hidden>
                  {threadName}
                </option>
              ) : (
                <option value={""} selected disabled hidden>
                  Choose thread
                </option>
              )}
              <option value={thread.id}>{thread.name}</option>
            </React.Fragment>
          ))}
        </Select>
        {errors.threadId && <ErrorMessage>{errors.threadId.message}</ErrorMessage>}
        <ImageDropzone file={file} setFile={setFile} />
        <Button disabled={isSubmitting} type="submit">
          Post
        </Button>
      </Form>
    </Container>
  )
}

export default Create
