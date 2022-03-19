import styled, { keyframes } from "styled-components"

const skeletonDark = keyframes`
    0% {
    background-color: #212121;
  }

  100% {
    background-color: #2f3031;
  }
`

const skeletonLight = keyframes`
    0% {
    background-color: #c7d2d8;
  }

  100% {
    background-color: hsl(200, 20%, 95%);
  }
`

export const Skeleton = styled.div`
  background-color: ${({ theme }) => theme.palette.secondary.main};
  min-width: 400px;
  width: 90%;
  max-width: 700px;
  margin-bottom: 3rem;
  border-radius: 4px;
  padding: 20px 40px;
`

export const SkeletonTitle = styled.div`
  height: 30px;
  animation: ${({ theme }) => (theme.title === "light" ? skeletonLight : skeletonDark)} 1s linear
    infinite alternate;
  margin: 30px 0;
  width: 50%;
  border-radius: 2px;
`

export const SkeletonText = styled.div`
  height: 15px;
  animation: ${({ theme }) => (theme.title === "light" ? skeletonLight : skeletonDark)} 1s linear
    infinite alternate;
  margin-bottom: 10px;
  border-radius: 2px;

  :last-of-type {
    width: 80%;
  }
`
