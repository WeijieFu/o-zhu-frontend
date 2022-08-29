import React from "react"
import Navigation from "../../components/Navigation"
import MobileNavigation from "../../components/MobileNavigation"
import AwardGrid from "../../components/Grid/AwardGrid"

import styles from "../../styles/Pages/Award/Award.module.css"

import getAward from "../../api/getAward"
import useGridState from "../../state/GridState"
import useNavigationState from "../../state/NavigationState"
import isClickingMenu from "../../utils/isClickingMenu"

const Award = ({ data }) => {
  const grid = useGridState()
  const state = useNavigationState()
  const handleClick = (e) => {
    if (!isClickingMenu(e.target.className)) {
      state.closeAll()
    }
  }
  return (
    <div className={styles.container} onClick={handleClick}>
      <AwardGrid data={data} />
      {grid.layout === "web" && <Navigation />}
      {grid.layout === "mobile" && <MobileNavigation />}
    </div>
  )
}

export default Award

export async function getStaticProps() {
  const data = await getAward()

  // Pass post data to the page via props
  return { props: { data } }
}
