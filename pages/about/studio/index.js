import React from "react"
import Navigation from "../../../components/Navigation"
import StudioGrid from "../../../components/Grid/StudioGrid"

import styles from "../../../styles/Pages/About/About.module.css"

const Studio = () => {
  return (
    <div className={styles.container}>
      <StudioGrid />
      <Navigation />
    </div>
  )
}

export default Studio
