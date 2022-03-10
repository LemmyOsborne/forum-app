import { CognitoUser } from "@aws-amplify/auth"
import { Auth } from "aws-amplify"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as ROUTES from "constants/routes"
import {
  Button,
  Container,
  ErrorMessage,
  Form,
  Input,
  ServerError,
} from "styles/components/form.styles"

interface IFormData {
  email: string
  username: string
  password: string
  code: string
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>()

  const [signUpError, setSignUpError] = useState("")
  const [showCode, setShowCode] = useState(false)
  const router = useRouter()

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    try {
      if (showCode) {
        confirmSignUp(data)
      } else {
        await signUpWithEmailAndPassword(data)
        setShowCode(true)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error)
      setSignUpError(error.message)
    }
  }

  const signUpWithEmailAndPassword = async (data: IFormData): Promise<CognitoUser> => {
    const { username, email, password } = data

    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      })
      return user
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const confirmSignUp = async (data: IFormData) => {
    const { username, password, code } = data

    try {
      await Auth.confirmSignUp(username, code)
      const amplifyUser = await Auth.signIn(username, password)
      if (amplifyUser) {
        router.push(ROUTES.HOME)
      } else {
        throw new Error("Something went wrong")
      }
    } catch (error) {
      console.log("error confirming sign up", error)
    }
  }

  return (
    <Container>
      {signUpError && <ServerError>{signUpError}</ServerError>}
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
          placeholder="Email"
          {...register("email", {
            required: { value: true, message: "Email is required." },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email.",
            },
          })}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
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
        {showCode && (
          <Input
            placeholder="Verification code"
            {...register("code", {
              required: { value: true, message: "Please enter a code." },
              minLength: {
                value: 6,
                message: "Code should have 6 characters.",
              },
              maxLength: {
                value: 6,
                message: "Code should have 6 characters.",
              },
            })}
          />
        )}
        {errors.code && <ErrorMessage>{errors.code.message}</ErrorMessage>}
        <Button type="submit">{showCode ? "Confirm Code" : "Sign Up"}</Button>
      </Form>
    </Container>
  )
}

export default SignUp
