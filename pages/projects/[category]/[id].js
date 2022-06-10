import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

import styles from "../../../styles/Pages/About/Location.module.css"

import getProject from "../../../api/getProject"
import ProjectGrid from "../../../components/Grid/ProjectGrid"

import Navigation from "../../../components/Navigation"

const Project = () => {
  const router = useRouter()

  const [data, setData] = useState([])

  useEffect(() => {
    if (router && router.query) {
      const { category, id } = router.query

      async function fetchAPI() {
        const data = await getProject(category, id)
        setData(data)
      }
      fetchAPI()
    }
  }, [router])

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
