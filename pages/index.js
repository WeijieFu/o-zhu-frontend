import Head from "next/head"
import styles from "../styles/Home.module.css"

import Navigation from "../components/Navigation"
import MobileNavigation from "../components/MobileNavigation"
import HomeGrid from "../components/Grid/HomeGrid"
import useGridState from "../state/GridState"
import isClickingMenu from "../utils/isClickingMenu"
import useNavigationState from "../state/NavigationState"
export default function Home() {
  const grid = useGridState()
  const state = useNavigationState()
  const handleClick = (e) => {
    if (!isClickingMenu(e.target.className)) {
      state.closeAll()
    }
  }
  return (
    <div className={styles.container} onClick={handleClick}>
      <Head>
        <title>O-ZHU</title>
        <meta name="description" content="OFFICE ZHU OFFICIAL WEBSITE" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/AktivGrotesk_CNSG_Rg.ttf"
          as="font"
          crossOrigin=""
          type="font/ttf"
        />
        <link
          rel="preload"
          href="/fonts/UniversLTStd.otf"
          as="font"
          crossOrigin=""
          type="font/otf"
        />
      </Head>
      <HomeGrid />
      {grid.layout === "web" && <Navigation />}
      {grid.layout === "mobile" && <MobileNavigation />}
    </div>
  )
}
