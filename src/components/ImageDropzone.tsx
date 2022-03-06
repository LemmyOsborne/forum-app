import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import styled from "styled-components"

interface Props {
  file: File | undefined
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>
}

export const ImageDropzone: React.FC<Props> = ({ file, setFile }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles[0])
    },
    [file]
  )
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: "image/*", maxFiles: 1 })

  return file ? (
    <Container>
      <h3 style={{ marginBottom: "10px" }}>Your image:</h3>
      <img src={URL.createObjectURL(file)} style={{ width: "auto", maxHeight: 150 }} />
    </Container>
  ) : (
    <Container {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
    </Container>
  )
}

const Container = styled.div`
  border: 1px dashed snow;
  height: 250px;
  padding-left: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.grey[200]};
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 20px;

  p {
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`
