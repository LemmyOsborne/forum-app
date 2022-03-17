import styled from "styled-components"

export const Container = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 60px;
  background-color: ${({ theme }) => theme.palette.background.header};
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  padding: 0 20px;
`

export const Logo = styled.div`
  cursor: pointer;
`

export const ButtonGroup = styled.div`
  @media (max-width: ${({ theme }) => theme.media.sm}) {
    display: none;
  }
`

export const SignInButton = styled.button`
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  padding: 0 25px;
  height: 30px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-right: 10px;
  background-color: transparent;
  border-radius: 20px;
`

export const SignUpButton = styled(SignInButton)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
`

export const Dropdown = styled.div`
  position: relative;
`

export const MenuButton = styled.button`
  width: 30px;
  height: 30px;

  svg {
    fill: ${({ theme }) => theme.palette.text.primary};
  }
`
export const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 180px;
  min-height: 30px;
  background-color: ${({ theme }) => theme.palette.background.header};
  position: absolute;
  top: 30px;
  right: 0;
  border-radius: 4px;
`

export const MenuItem = styled.div`
  background-color: inherit;
  width: 100%;
  border-bottom: 1px solid lightgrey;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  transition: background-color 0.23s ease, color 0.23s ease;
  color: ${({ theme }) => theme.palette.text.primary};

  &:first-of-type {
    border-radius: 4px 4px 0 0;
  }

  &:last-of-type {
    border-radius: 0 0 4px 4px;
    border: none;
  }

  svg {
    margin-right: 5px;
    fill: ${({ theme }) => theme.palette.text.primary};
  }

  :hover {
    color: ${({ theme }) => theme.palette.primary.contrastText};
    background-color: ${({ theme }) => theme.palette.primary.main};

    svg {
      fill: ${({ theme }) => theme.palette.primary.contrastText};
    }
  }
`

export const Username = styled.p`
  margin: 5px 15px 0;
  font-weight: 600;
`

export const SearchContainer = styled.div`
  position: relative;
  width: 400px;

  svg {
    position: absolute;
    fill: ${({ theme }) => theme.palette.text.primary};
    top: 5px;
    left: 8px;
  }
`

export const Search = styled.input`
  border: 1px solid lightgray;
  padding: 10px 0 10px 45px;
  width: 100%;
  border-radius: 4px;
  color: white;
  background: none;
`
export const SearchResult = styled.div`
  background-color: ${({ theme }) => theme.palette.secondary.dark};
  position: absolute;
  top: 40px;
  width: 100%;
`

export const SearchItem = styled.div`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.palette.secondary.light};
    color: ${({ theme }) => theme.palette.secondary.contrastText};
  }
`
