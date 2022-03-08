import { useState, useEffect } from "react"

interface IState {
  width: number
  height: number
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<IState>({
    width: 0,
    height: 0,
  })
  useEffect(() => {
    function handleResize() {
      setWindowSize((prevState) => ({
        ...prevState,
        width: window.innerWidth,
        height: window.innerHeight,
      }))
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  return windowSize
}
