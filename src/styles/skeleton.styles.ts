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

export const PostsSectionSkeleton = styled.div`
  background-color: ${({ theme }) => theme.palette.secondary.main};
  min-width: 310px;
  width: 100%;
  max-width: 700px;
  margin-bottom: 3rem;
  border-radius: 4px;
  padding: 20px 40px;
`

export const PostsSectionSkeletonTitle = styled.div`
  height: 30px;
  animation: ${({ theme }) => (theme.title === "light" ? skeletonLight : skeletonDark)} 1s linear
    infinite alternate;
  margin: 30px 0;
  width: 50%;
  border-radius: 2px;
`

export const PostsSectionSkeletonText = styled.div`
  height: 15px;
  animation: ${({ theme }) => (theme.title === "light" ? skeletonLight : skeletonDark)} 1s linear
    infinite alternate;
  margin-bottom: 10px;
  border-radius: 2px;

  :last-of-type {
    width: 80%;
  }
`
export const ThreadsSectionSkeleton = styled(PostsSectionSkeleton)`
  min-width: 300px;
  width: 100%;
  max-width: 300px;
  margin-bottom: 0;
`
export const ThreadsSectionSkeletonItem = styled.div`
  display: flex;
  align-items: baseline;
`

export const ThreadsSectionSkeletonTitle = styled(PostsSectionSkeletonTitle)`
  margin: 0 auto 30px;
  width: 70%;
`
export const ThreadsSectionSkeletonAvatar = styled.div`
  border-radius: 100%;
  margin-right: 20px;
  height: 40px;
  width: 40px;
  animation: ${({ theme }) => (theme.title === "light" ? skeletonLight : skeletonDark)} 1s linear
    infinite alternate;
`

export const ThreadsSectionSkeletonText = styled(PostsSectionSkeletonText)`
  height: 25px;
`
