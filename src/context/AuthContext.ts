import { createContext, SetStateAction, Dispatch } from "react"
import { CognitoUser } from "@aws-amplify/auth"

interface IAuthContext {
  user: CognitoUser | null
  setUser: Dispatch<SetStateAction<CognitoUser | null>>
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)
