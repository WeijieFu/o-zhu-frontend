import React from "react"
import Navigation from "../../../components/Navigation"
import ProjectsGrid from "../../../components/Grid/ProjectsGrid"

import styles from "../../../styles/Pages/Projects/Exhibition.module.css"

import getProjects from "../../../api/getProjects"

const Projects = ({ data }) => {
  return (
    <div className={styles["container"]}>
      <ProjectsGrid data={data} />
      <Navigation />
    </div>
  )
}

export default Projects

export async function getStaticPaths() {
  const categories = [
    "all",
    "exhibition",
    "interior",
    "architecture",
    "urban_design",
    "research_publication",
  ]

  const paths = categories.map((item) => ({
    params: { category: item },
  }))

  return {
    paths,
    fallback: false, // false or 'blocking'
  }
}

export async function getStaticProps(context) {
  console.log(context.params)
  const data = await getProjects(context.params.category)

  // Pass post data to the page via props
  return { props: { data } }
}
