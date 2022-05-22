import React from "react"
import Navigation from "../../components/Navigation"
import AwardGrid from "../../components/Grid/AwardGrid"

import styles from "../../styles/Pages/Award/Award.module.css"

const Award = () => {
  return (
    <div className={styles.container}>
      <AwardGrid />
      <Navigation></Navigation>
    </div>
  )
}

export default Award
