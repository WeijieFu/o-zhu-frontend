import React from "react"
import Navigation from "../../components/Navigation"
import styles from "../../styles/Pages/Press/Press.module.css"
import PressGrid from "../../components/Grid/PressGrid"

const Press = () => {
  return (
    <div className={styles.container}>
      <PressGrid />
      <Navigation></Navigation>
    </div>
  )
}

export default Press
