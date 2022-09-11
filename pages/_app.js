import "../styles/globals.css"
import useGridState from "../state/GridState"
import { useEffect } from "react"

function MyApp({ Component, pageProps }) {
  const grid = useGridState()
  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  const setRootHeight = (height) => {
    const r = document.querySelector(":root")
    r.style.setProperty("--viewport-height", `${height}px`)
  }
  const handleResize = (e) => {
    // console.log(window.innerWidth, window.innerHeight)
    if (window.innerWidth < 750) {
      grid.setGridToMobile()
    } else {
      grid.setGridToWeb()
    }
    setRootHeight(window.innerHeight)
  }

  return <Component {...pageProps} />
}

export default MyApp
