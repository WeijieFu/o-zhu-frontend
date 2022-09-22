import React from "react"
import Navigation from "../../components/Navigation"
import MobileNavigation from "../../components/MobileNavigation"
import ContactGrid from "../../components/Grid/ContactGrid"

import styles from "../../styles/Pages/Contact/Contact.module.css"

import getContact from "../../api/getContact"

import useGridState from "../../state/GridState"
import useNavigationState from "../../state/NavigationState"
import isClickingMenu from "../../utils/isClickingMenu"
const Contact = ({ data }) => {
  const grid = useGridState()
  const state = useNavigationState()
  const handleClick = (e) => {
    console.log(e.target.className)
    if (!isClickingMenu(e.target.className)) {
      state.closeAll()
    }
  }
  return (
    <div className={styles.container} onClick={handleClick}>
      <ContactGrid data={data} />
      {grid.layout === "web" && <Navigation />}
      {grid.layout === "mobile" && <MobileNavigation />}
    </div>
  )
}

export default Contact

export async function getStaticProps() {
  const data = await getContact()

  // Pass post data to the page via props
  return { props: { data } }
}
