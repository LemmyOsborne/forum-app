import { CognitoUser } from "@aws-amplify/auth"
import { Auth } from "aws-amplify"
import { Hub } from "aws-amplify"
import { AuthContext } from "context/AuthContext"
import React, { ReactElement, useEffect, useState } from "react"

interface Props {
  children: ReactElement
}

export const AuthProvider = ({ children }: Props): ReactElement => {
  const [user, setUser] = useState<CognitoUser | null>(null)

  useEffect(() => {
    checkUser()
  }, [])

  useEffect(() => {
    Hub.listen("auth", () => {
      checkUser()
    })
  }, [])

  const checkUser = async () => {
    try {
      const amplifyUser = await Auth.currentAuthenticatedUser()
      if (amplifyUser) {
        setUser(amplifyUser)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error(error)
      setUser(null)
    }
  }

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}
