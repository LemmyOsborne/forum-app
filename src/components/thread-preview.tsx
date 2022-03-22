import { Thread } from "API"
import { Storage } from "aws-amplify"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import styled from "styled-components"

interface Props {
  thread: Thread
  index: number
}

export const ThreadPreview: React.FC<Props> = ({ thread: { id, name, image }, index }) => {
  const [imageUrl, setImageUrl] = useState("")

  useEffect(() => {
    if (image) {
      const getImageUrl = async () => {
        try {
          const imageUrl = await Storage.get(image)
          setImageUrl(imageUrl)
        } catch (error) {
          console.error(error)
        }
      }
      getImageUrl()
    }
  }, [])
  return (
    <Container>
      <ThreadNumber>{index + 1}</ThreadNumber>
      <ThreadImage src={imageUrl} />
      <ThreadName>
        <Link href={`/thread/${id}`}>{name}</Link>
      </ThreadName>
    </Container>
  )
}

const Container = styled.article`
  border-bottom: 1px solid grey;
  display: flex;
  padding: 10px 20px;
  overflow: hidden;

  :last-of-type {
    border: none;
  }
`

const ThreadImage = styled.img`
  border-radius: 50%;
  width: 30px;
  margin-right: 10px;
`
const ThreadName = styled.span`
  a {
    cursor: pointer;
    font-size: 20px;
    text-decoration: none;
    color: inherit;

    :hover {
      text-decoration: underline;
    }
  }
`

const ThreadNumber = styled.p`
  margin-right: 20px;
  font-size: 16px;
`
