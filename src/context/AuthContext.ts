import { createContext, SetStateAction, Dispatch, useContext } from "react"
import { CognitoUser } from "@aws-amplify/auth"

export interface IAuthContext {
  user: CognitoUser | null
  setUser: Dispatch<SetStateAction<CognitoUser | null>>
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const useUser = (): IAuthContext => useContext(AuthContext)
