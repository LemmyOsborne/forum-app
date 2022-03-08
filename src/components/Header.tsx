import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import * as ROUTES from "constants/routes"
import Logo from "assets/logo.png"
import MenuIcon from "assets/icons/menu.svg"
import LogoutIcon from "assets/icons/logout.svg"
import { Auth } from "aws-amplify"
import { useRouter } from "next/router"
import { useUser } from "context/AuthContext"
import AddIcon from "assets/icons/add.svg"
import {
  Container,
  Dropdown,
  DropdownMenu,
  MenuButton,
  MenuItem,
  SignInButton,
  SignUpButton,
  Username,
} from "styles/components/header.styles"

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const router = useRouter()
  const { user } = useUser()
  const username = user?.getUsername()

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
        <Image src={Logo} height={150} width={200} />
      </Link>
      <div style={{ display: "flex" }}>
        {user ? (
          <Username>{username}</Username>
        ) : (
          <div>
            <Link href={ROUTES.SIGN_IN}>
              <SignInButton>Sign In</SignInButton>
            </Link>
            <Link href={ROUTES.SIGN_UP}>
              <SignUpButton>Sign Up</SignUpButton>
            </Link>
          </div>
        )}
        <Dropdown>
          <MenuButton onClick={() => setShowMenu(!showMenu)}>
            <MenuIcon />
          </MenuButton>
          {showMenu && (
            <DropdownMenu>
              <MenuItem>Switch Theme</MenuItem>
              <MenuItem onClick={() => router.push(ROUTES.CREATE)}>
                <AddIcon />
                Create Post
              </MenuItem>
              <MenuItem onClick={signOut}>
                <LogoutIcon />
                Logout
              </MenuItem>
            </DropdownMenu>
          )}
        </Dropdown>
      </div>
    </Container>
  )
}
