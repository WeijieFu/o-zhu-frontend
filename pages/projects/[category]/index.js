import React from "react"
import Navigation from "../../../components/Navigation"
import ProjectsGrid from "../../../components/Grid/ProjectsGrid"

import styles from "../../../styles/Pages/Projects/Exhibition.module.css"

import getProjects from "../../../api/getProjects"

import isClickingMenu from "../../../utils/isClickingMenu"
import useNavigationState from "../../../state/NavigationState"
const Projects = ({ data }) => {
  const state = useNavigationState()
  const handleClick = (e) => {
    if (!isClickingMenu(e.target.className)) {
      state.closeAll()
    }
  }
  return (
    <div className={styles["container"]} onClick={handleClick}>
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
  const resData = await getProjects()
  const data = []
  if (context.params.category == "all") {
    console.log(resData.length)
    return { props: { data: resData } }
  } else {
    for (const project of resData) {
      for (const category of project.Category) {
        if (category.Category == context.params.category) {
          data.push(project)
        }
      }
    }
    return { props: { data: data } }
  }

  // Pass post data to the page via props
}
