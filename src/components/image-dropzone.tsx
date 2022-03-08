import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Container } from "styles/components/image-dropzone.styles"

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
