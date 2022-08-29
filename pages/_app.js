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
  const handleResize = (e) => {
    console.log(window.innerWidth)
    if (window.innerWidth < 750) {
      grid.setGridToMobile()
    } else {
      grid.setGridToWeb()
    }
  }

  return <Component {...pageProps} />
}

export default MyApp
