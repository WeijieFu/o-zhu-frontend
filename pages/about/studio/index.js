import React from "react"
import Navigation from "../../../components/Navigation"
import MobileNavigation from "../../../components/MobileNavigation"
import StudioGrid from "../../../components/Grid/StudioGrid"

import getStudio from "../../../api/getStudio"
import styles from "../../../styles/Pages/About/About.module.css"
import useNavigationState from "../../../state/NavigationState"
import isClickingMenu from "../../../utils/isClickingMenu"
import useGridState from "../../../state/GridState"
const Studio = ({ data }) => {
  const grid = useGridState()
  const state = useNavigationState()
  const handleClick = (e) => {
    if (!isClickingMenu(e.target.className)) {
      state.closeAll()
    }
  }
  return (
    <div className={styles.container} onClick={handleClick}>
      <StudioGrid data={data} />
      {grid.layout === "web" && <Navigation />}
      {grid.layout === "mobile" && <MobileNavigation />}
    </div>
  )
}

export default Studio

export async function getStaticProps() {
  // Instead of fetching your `/api` route you can call the same
  // function directly in `getStaticProps`
  const data = await getStudio()

  // Props returned will be passed to the page component
  return { props: { data } }
}
