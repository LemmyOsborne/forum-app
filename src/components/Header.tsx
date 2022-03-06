import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import styled from "styled-components"
import * as ROUTES from "constants/routes"
import Logo from "assets/logo.png"
import MenuIcon from "assets/icons/menu.svg"
import LogoutIcon from "assets/icons/logout.svg"

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <Container>
      <Link href={ROUTES.HOME}>
        <Image src={Logo} height={150} width={200} />
      </Link>
      <div style={{ display: "flex" }}>
        <Link href={ROUTES.SIGN_IN}>
          <SignInButton>Sign In</SignInButton>
        </Link>
        <Link href={ROUTES.SIGN_UP}>
          <SignUpButton>Sign Up</SignUpButton>
        </Link>
        <Dropdown>
          <MenuButton onClick={() => setShowMenu(!showMenu)}>
            <MenuIcon />
          </MenuButton>
          {showMenu && (
            <DropdownMenu>
              <MenuItem>Switch Theme</MenuItem>
              <MenuItem>
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
  max-height: 30px;
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
  width: 40px;
  height: 40px;
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
  padding: 5px;
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
