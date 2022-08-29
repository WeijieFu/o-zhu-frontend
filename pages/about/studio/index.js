import React from "react"
import Navigation from "../../../components/Navigation"
import StudioGrid from "../../../components/Grid/StudioGrid"

import getStudio from "../../../api/getStudio"
import styles from "../../../styles/Pages/About/About.module.css"
import useNavigationState from "../../../state/NavigationState"
import isClickingMenu from "../../../utils/isClickingMenu"
const Studio = ({ data }) => {
  const state = useNavigationState()
  const handleClick = (e) => {
    if (!isClickingMenu(e.target.className)) {
      state.closeAll()
    }
  }
  return (
    <div className={styles.container} onClick={handleClick}>
      <StudioGrid data={data} />
      <Navigation />
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
