import { CognitoUser } from "@aws-amplify/auth"
import { Auth } from "aws-amplify"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import styled from "styled-components"
import * as ROUTES from "constants/routes"

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

  const [signUpError, setSignUpError] = useState(false)
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
      console.log("Signed up a user: ", user)
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
          type="email"
          {...register("email", {
            required: { value: true, message: "Please enter a valid email." },
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
        {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
        <Button type="submit">{showCode ? "Confirm Code" : "Sign Up"}</Button>
      </Form>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`

const Form = styled.form`
  width: 400px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.palette.grey[700]};
  padding: 40px 20px;
  user-select: none;
`

const Input = styled.input`
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

const Button = styled.button`
  background-color: ${({ theme }) => theme.palette.primary.dark};
  padding: 10px 15px;
  border-radius: 4px;
  color: ${({ theme }) => theme.palette.common.white};
  cursor: pointer;

  :disabled {
    opacity: 0.6;
  }
`

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.palette.warning.light};
  width: 100%;
  margin: 10px 0 15px;
`

const ServerError = styled.div`
  background-color: ${({ theme }) => theme.palette.info.dark};
  color: ${({ theme }) => theme.palette.error.dark};
  width: 100vw;
  min-height: 100px;
  padding: 10px 20px;
  border-radius: 4px;
`

export default SignUp
