import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import styled from "styled-components"
import * as ROUTES from "constants/routes"
import Logo from "assets/logo.png"
import MenuIcon from "assets/icons/menu.svg"
import LogoutIcon from "assets/icons/logout.svg"
import { Auth } from "aws-amplify"
import { useRouter } from "next/router"
import { useUser } from "context/AuthContext"
import AddIcon from "assets/icons/add.svg"

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

const Container = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 60px;
  background-color: ${({ theme }) => theme.palette.grey[200]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  padding: 0 20px;
`

const SignInButton = styled.button`
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  padding: 0 25px;
  height: 30px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-right: 10px;
  background-color: ${({ theme }) => theme.palette.common.white};
  border-radius: 20px;
`

const SignUpButton = styled(SignInButton)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
`

const Dropdown = styled.div`
  position: relative;
`

const MenuButton = styled.button`
  width: 30px;
  height: 30px;
`
const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  min-height: 50px;
  background-color: ${({ theme }) => theme.palette.grey[200]};
  position: absolute;
  top: 30px;
  right: 0;
  border-radius: 4px;
`

const MenuItem = styled.div`
  width: 100%;
  border-bottom: 1px solid lightgrey;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  transition: background-color 0.23s ease, color 0.23s ease;

  &:first-of-type {
    border-radius: 4px 4px 0 0;
  }

  &:last-of-type {
    border-radius: 0 0 4px 4px;
  }

  svg {
    margin-right: 5px;
  }

  :hover {
    color: ${({ theme }) => theme.palette.primary.contrastText};
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
`

const Username = styled.p`
  margin: 5px 15px 0;
  font-weight: 600;
`
