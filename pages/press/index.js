import React from "react"
import Navigation from "../../components/Navigation"
import MobileNavigation from "../../components/MobileNavigation"
import styles from "../../styles/Pages/Press/Press.module.css"
import PressGrid from "../../components/Grid/PressGrid"
import useGridState from "../../state/GridState"
import getPress from "../../api/getPress"
import useNavigationState from "../../state/NavigationState"
import isClickingMenu from "../../utils/isClickingMenu"

const Press = ({ data }) => {
  const grid = useGridState()
  const state = useNavigationState()
  const handleClick = (e) => {
    if (!isClickingMenu(e.target.className)) {
      state.closeAll()
    }
  }

  return (
    <div className={styles.container} onClick={handleClick}>
      <PressGrid data={data} />
      {grid.layout === "web" && <Navigation />}
      {grid.layout === "mobile" && <MobileNavigation />}
    </div>
  )
}

export default Press

export async function getStaticProps() {
  const data = await getPress()

  // Pass post data to the page via props
  return { props: { data } }
}
