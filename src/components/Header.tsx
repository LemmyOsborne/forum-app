import Image from "next/image"
import Link from "next/link"
import React, { useContext, useState } from "react"
import * as ROUTES from "constants/routes"
import Logo from "assets/logo.png"
import MenuIcon from "assets/icons/menu.svg"
import LogoutIcon from "assets/icons/logout.svg"
import { Auth } from "aws-amplify"
import { useRouter } from "next/router"
import { useUser } from "context/AuthContext"
import AddIcon from "assets/icons/add.svg"
import SignInIcon from "assets/icons/signin.svg"
import {
  Container,
  Dropdown,
  DropdownMenu,
  MenuButton,
  MenuItem,
  SignInButton,
  SignUpButton,
  ButtonGroup,
  Username,
} from "styles/components/header.styles"
import { ToggleThemeContext } from "pages/_app"
import { useWindowSize } from "hooks/useWindowSize"

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const router = useRouter()
  const { user } = useUser()
  const username = user?.getUsername()
  const { setTheme } = useContext(ToggleThemeContext)
  const { width } = useWindowSize()

  const signOut = async () => {
    try {
      await Auth.signOut()
      router.push(ROUTES.SIGN_IN)
    } catch (error) {
      console.log("error signing out: ", error)
    }
  }
  return (
    <Container>
      <Link href={ROUTES.HOME}>
        <Image src={Logo} height={120} width={200} />
      </Link>
      <div style={{ display: "flex" }}>
        {user ? (
          <Username>{username}</Username>
        ) : (
          <ButtonGroup>
            <Link href={ROUTES.SIGN_IN}>
              <SignInButton>Sign In</SignInButton>
            </Link>
            <Link href={ROUTES.SIGN_UP}>
              <SignUpButton>Sign Up</SignUpButton>
            </Link>
          </ButtonGroup>
        )}
        <Dropdown>
          <MenuButton onClick={() => setShowMenu(!showMenu)}>
            <MenuIcon />
          </MenuButton>
          {showMenu && (
            <DropdownMenu>
              <MenuItem onClick={() => setTheme("dark")}>Switch Theme</MenuItem>
              <MenuItem onClick={() => router.push(ROUTES.CREATE)}>
                <AddIcon />
                Create Post
              </MenuItem>
              {!user && width <= 600 && (
                <>
                  <MenuItem onClick={() => router.push(ROUTES.SIGN_IN)}>
                    <SignInIcon />
                    Sign In
                  </MenuItem>
                  <MenuItem onClick={() => router.push(ROUTES.SIGN_UP)}>
                    <SignInIcon />
                    Sign Up
                  </MenuItem>
                </>
              )}
              {user && (
                <MenuItem onClick={signOut}>
                  <LogoutIcon />
                  Logout
                </MenuItem>
              )}
            </DropdownMenu>
          )}
        </Dropdown>
      </div>
    </Container>
  )
}
