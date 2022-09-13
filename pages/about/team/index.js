import React, { useState } from "react"
import Navigation from "../../../components/Navigation"
import MobileNavigation from "../../../components/MobileNavigation"
import TeamGrid from "../../../components/Grid/TeamGrid"

import styles from "../../../styles/Pages/About/About.module.css"

import getTeam from "../../../api/getTeam"
import useGridState from "../../../state/GridState"
import useNavigationState from "../../../state/NavigationState"
import isClickingMenu from "../../../utils/isClickingMenu"

const Team = ({ data }) => {
  const grid = useGridState()
  const state = useNavigationState()
  const [isPersonDescriptionShown, setIsPersonDescriptionShown] =
    useState(false)
  const handleClick = (e) => {
    if (!isClickingMenu(e.target.className)) {
      state.closeAll()
    }
  }
  return (
    <div className={styles.container} onClick={handleClick}>
      <TeamGrid
        data={data}
        isPersonDescriptionShown={isPersonDescriptionShown}
        setIsPersonDescriptionShown={setIsPersonDescriptionShown}
      />
      {grid.layout === "web" && <Navigation />}
      {grid.layout === "mobile" && (
        <MobileNavigation isPersonDescriptionShown={isPersonDescriptionShown} />
      )}
    </div>
  )
}

export default Team

export async function getStaticProps() {
  // Instead of fetching your `/api` route you can call the same
  // function directly in `getStaticProps`
  const data = await getTeam()

  // Props returned will be passed to the page component
  return { props: { data } }
}
