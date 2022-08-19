import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

import styles from "../../styles/Pages/About/Location.module.css"

import getProject from "../../api/getProject"
import getProjects from "../../api/getProjects"
import ProjectGrid from "../../components/Grid/ProjectGrid"

import Navigation from "../../components/Navigation"

const Project = ({ data }) => {
  return (
    <div className={styles.container}>
      {data && (
        <>
          <ProjectGrid data={data} />
          <Navigation />
        </>
      )}
    </div>
  )
}

export default Project

export async function getStaticPaths() {
  const projects = await getProjects()

  const paths = []

  for (const project of projects) {
    paths.push({
      params: {
        id: project._id,
      },
    })
  }

  return {
    paths,
    fallback: false, // false or 'blocking'
  }
}

export async function getStaticProps(context) {
  const id = context.params.id
  const data = await getProject(id)

  return { props: { data: JSON.parse(JSON.stringify(data)) } }
  // Pass post data to the page via props
}
