import { CognitoUser } from "@aws-amplify/auth"
import { Auth } from "aws-amplify"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as ROUTES from "constants/routes"
import { Button, Container, ErrorMessage, Form, Input, ServerError } from "styles/form.styles"

interface IFormData {
  username: string
  password: string
  code: string
}

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>()

  const [signInError, setSignInError] = useState("")
  const router = useRouter()

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    try {
      await signInWithEmailAndPassword(data)
      router.push(ROUTES.HOME)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error)
      setSignInError(error.message)
    }
  }

  const signInWithEmailAndPassword = async (data: IFormData): Promise<CognitoUser> => {
    const { username, password } = data

    try {
      const user = await Auth.signIn({
        username,
        password,
      })
      return user
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return (
    <Container>
      {signInError && <ServerError>{signInError}</ServerError>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Username"
          {...register("username", {
            required: { value: true, message: "Please enter a username." },
            minLength: {
              value: 3,
              message: "Please enter a username between 3-16 characters.",
            },
            maxLength: {
              value: 16,
              message: "Please enter a username between 3-16 characters.",
            },
          })}
        />
        {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
        <Input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: { value: true, message: "Please enter a password." },
            minLength: {
              value: 8,
              message: "Please enter a stronger password.",
            },
          })}
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        <Button type="submit">Sign In</Button>
      </Form>
    </Container>
  )
}

export default SignIn
