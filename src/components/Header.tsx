import Image from "next/image"
import Link from "next/link"
import React, { useContext, useState } from "react"
import * as ROUTES from "constants/routes"
import LogoImage from "assets/logo.png"
import MenuIcon from "assets/icons/menu.svg"
import LogoutIcon from "assets/icons/logout.svg"
import { Auth } from "aws-amplify"
import { useRouter } from "next/router"
import { useUser } from "context/AuthContext"
import AddIcon from "assets/icons/add.svg"
import SignInIcon from "assets/icons/signin.svg"
import SunIcon from "assets/icons/sun.svg"
import MoonIcon from "assets/icons/moon.svg"
import {
  Container,
  Dropdown,
  Logo,
  DropdownMenu,
  MenuButton,
  MenuItem,
  SignInButton,
  SignUpButton,
  ButtonGroup,
  Username,
} from "styles/components/header.styles"
import { ToggleThemeContext } from "context/ToggleThemeContext"
import { useWindowSize } from "hooks/useWindowSize"
import { CreateThread } from "./create-thread-modal"

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const router = useRouter()
  const { user } = useUser()
  const username = user?.getUsername()
  const { theme, setTheme } = useContext(ToggleThemeContext)
  const { width } = useWindowSize()
  const [showThreadModal, setShowThreadModal] = useState(false)

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
      <Logo onClick={() => router.push(ROUTES.HOME)}>
        <Image src={LogoImage} height={150} width={150} alt="Logo" />
      </Logo>
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
        <Dropdown onMouseLeave={() => setShowMenu(false)}>
          <MenuButton aria-label="menu-button" onClick={() => setShowMenu(!showMenu)}>
            <MenuIcon />
          </MenuButton>
          {showMenu && (
            <DropdownMenu>
              {theme === "light" ? (
                <MenuItem onClick={() => setTheme("dark")}>
                  <MoonIcon />
                  Dark mode
                </MenuItem>
              ) : (
                <MenuItem onClick={() => setTheme("light")}>
                  <SunIcon />
                  Light mode
                </MenuItem>
              )}
              <MenuItem onClick={() => router.push(ROUTES.CREATE)}>
                <AddIcon />
                Create Post
              </MenuItem>
              <MenuItem onClick={() => setShowThreadModal(true)}>
                <AddIcon />
                Create Thread
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
      {showThreadModal && <CreateThread setModal={setShowThreadModal} />}
    </Container>
  )
}
