import React from "react"
import Navigation from "../../../components/Navigation"
import TeamGrid from "../../../components/Grid/TeamGrid"

import styles from "../../../styles/Pages/About/About.module.css"

const Team = () => {
  return (
    <div className={styles.container}>
      <TeamGrid />
      <Navigation />
    </div>
  )
}

export default Team
