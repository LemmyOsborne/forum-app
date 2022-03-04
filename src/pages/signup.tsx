import { CognitoUser } from "@aws-amplify/auth"
import { Auth } from "aws-amplify"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import styled from "styled-components"

interface IFormData {
  email: string
  username: string
  password: string
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>()

  const onSubmit: SubmitHandler<IFormData> = (data) => console.log(data)

  const signUpWithEmailAndPassword = async (
    data: IFormData
  ): Promise<CognitoUser> => {
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

  return (
    <Container>
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
        {errors.username && <Error>{errors.username.message}</Error>}
        <Input
          placeholder="Email"
          {...register("email", {
            required: { value: true, message: "Please enter a valid email." },
          })}
        />
        {errors.email && <Error>{errors.email.message}</Error>}
        <Input
          placeholder="Password"
          {...register("password", {
            required: { value: true, message: "Please enter a password." },
            minLength: {
              value: 8,
              message: "Please enter a stronger password.",
            },
          })}
        />
        {errors.password && <Error>{errors.password.message}</Error>}
        <Button type="submit">Sign Up</Button>
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
  width: 40%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.palette.grey[700]};
  padding: 20px;
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
`

const Button = styled.button`
  background-color: ${({ theme }) => theme.palette.primary.dark};
  padding: 10px 15px;
  border-radius: 4px;
  color: ${({ theme }) => theme.palette.common.white};
  cursor: pointer;
`

const Error = styled.div`
  color: ${({ theme }) => theme.palette.warning.light};
  width: 100%;
  margin: 10px 0 15px;
`

export default SignUp
