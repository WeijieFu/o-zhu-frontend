import React from "react"
import Navigation from "../../../components/Navigation"
import Grid from "../../../components/Grid/HomeGrid"

import styles from "../../../styles/Pages/Projects/Exhibition.module.css"
const Exhibition = () => {
  return (
    <div className={styles["container"]}>
      <Grid />
      <Navigation />
    </div>
  )
}

export default Exhibition
