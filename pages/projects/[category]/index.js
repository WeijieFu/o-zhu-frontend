import React from "react"
import Navigation from "../../../components/Navigation"
import ProjectsGrid from "../../../components/Grid/ProjectsGrid"

import styles from "../../../styles/Pages/Projects/Exhibition.module.css"
const Projects = () => {
  return (
    <div className={styles["container"]}>
      <ProjectsGrid />
      <Navigation />
    </div>
  )
}

export default Projects
