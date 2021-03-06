import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import * as ROUTES from "constants/routes"
import LogoImage from "assets/logo.png"
import MenuIcon from "assets/icons/menu.svg"
import LogoutIcon from "assets/icons/logout.svg"
import { Auth } from "aws-amplify"
import { useRouter } from "next/router"
import AddIcon from "assets/icons/add.svg"
import SignInIcon from "assets/icons/signin.svg"
import SunIcon from "assets/icons/sun.svg"
import MoonIcon from "assets/icons/moon.svg"
import SearchIcon from "assets/icons/search.svg"
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
  Search,
  SearchContainer,
  SearchResult,
  SearchItem,
  SearchTag,
} from "styles/components/header.styles"
import { useWindowSize } from "hooks/useWindowSize"
import { CreateThread } from "./create-thread-modal"
import { useAppDispatch, useAppSelector } from "features/store"
import { changeTheme } from "features/slices/themeSlice"
import { ETheme } from "interfaces/interfaces"
import { fetchThreads } from "features/slices/threadsSlice"
import { signOut as logout } from "features/slices/authSlice"

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const router = useRouter()
  const user = useAppSelector((state) => state.authReducer.user)
  const { width } = useWindowSize()
  const [showThreadModal, setShowThreadModal] = useState(false)
  const [search, setSearch] = useState("")
  const threads = useAppSelector((state) => state.threadsReducer.threads)
  const dispatch = useAppDispatch()
  const searchResult = threads
    ?.map((thread) => thread.name)
    .filter((name) => name.toLowerCase().includes(search?.toLowerCase() as string))
  const [searchTag, setSearchTag] = useState<string>()
  const { theme } = useAppSelector((state) => state.themeReducer)

  const handleToggleTheme = (themeType: ETheme) => {
    dispatch(changeTheme({ theme: themeType }))
  }

  const signOut = async () => {
    try {
      await Auth.signOut()
      dispatch(logout())
      router.push(ROUTES.SIGN_IN)
    } catch (error) {
      console.log("error signing out: ", error)
    }
  }

  const backspaceHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Backspace") setSearchTag("")
  }

  const [isFocus, setIsFocus] = useState(false)

  useEffect(() => {
    dispatch(fetchThreads())
  }, [])

  return (
    <Container>
      <Logo onClick={() => router.push(ROUTES.HOME)}>
        <Image src={LogoImage} height={150} width={150} alt="Logo" />
      </Logo>
      <SearchContainer focus={isFocus}>
        <SearchIcon />
        {searchTag && <SearchTag>{searchTag}</SearchTag>}
        <Search
          placeholder="Find threads"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          onKeyDown={(e) => backspaceHandler(e)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
        {search && (
          <SearchResult>
            {searchResult?.map((result) => (
              <SearchItem
                onClick={async () => {
                  setSearchTag(result)
                  await router.push(
                    `/thread/${threads?.find((thread) => thread.name === result)?.id}`
                  )
                  setSearch("")
                }}
                key={result}
              >
                {result}
              </SearchItem>
            ))}
          </SearchResult>
        )}
      </SearchContainer>
      <div style={{ display: "flex" }}>
        {user ? (
          <Username>{user}</Username>
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
          <MenuButton
            aria-label="menu-button"
            onBlur={() => setTimeout(() => setShowMenu(false), 500)}
            onClick={() => setShowMenu(!showMenu)}
          >
            <MenuIcon />
          </MenuButton>
          {showMenu && (
            <DropdownMenu>
              {theme === "light" ? (
                <MenuItem onClick={() => handleToggleTheme(ETheme.Dark)}>
                  <MoonIcon />
                  Dark mode
                </MenuItem>
              ) : (
                <MenuItem onClick={() => handleToggleTheme(ETheme.Light)}>
                  <SunIcon />
                  Light mode
                </MenuItem>
              )}
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
                <>
                  <MenuItem onClick={() => router.push(ROUTES.CREATE)}>
                    <AddIcon />
                    Create Post
                  </MenuItem>
                  <MenuItem onClick={() => setShowThreadModal(true)}>
                    <AddIcon />
                    Create Thread
                  </MenuItem>
                  <MenuItem onClick={signOut}>
                    <LogoutIcon />
                    Logout
                  </MenuItem>
                </>
              )}
            </DropdownMenu>
          )}
        </Dropdown>
      </div>
      {showThreadModal && <CreateThread setModal={setShowThreadModal} />}
    </Container>
  )
}
