import "../styles/globals.css"
import useGridState from "../state/GridState"
import useNavigationState from "../state/NavigationState"
import { useEffect } from "react"

function MyApp({ Component, pageProps }) {
  const grid = useGridState()
  const state = useNavigationState()
  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    if (state.currentLanguage == "en") setFont("Univers LT Std")
    if (state.currentLanguage == "cn") setFont("Aktiv Grotesk")
  }, [state.currentLanguage])

  const setRootHeight = (height) => {
    const r = document.querySelector(":root")
    r.style.setProperty("--viewport-height", `${height}px`)
  }

  const setFont = (fontFamily) => {
    const body = document.getElementsByTagName("body")[0]
    body.style.setProperty("font-family", fontFamily)

    if (fontFamily === "Univers LT Std") {
      body.style.setProperty("letter-spacing", "0rem")
      body.style.setProperty("line-height", "120%")
    }
    if (fontFamily === "Aktiv Grotesk") {
      body.style.setProperty("letter-spacing", "0.15rem")
      body.style.setProperty("line-height", "160%")
    }
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
