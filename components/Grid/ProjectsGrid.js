import React, { useEffect, useState, useRef } from "react"
import styles from "../../styles/Grid/Grid.module.css"
import { useRouter } from "next/router"

import { count, blinkTimes, interval } from "./GridSetting"
import ProjectScene from "../Scene/ProjectScene"
import getProjects from "../../api/getProjects"

import useNavigationState from "../../state/NavigationState"

const ProjectsGrid = () => {
  const router = useRouter()
  const { category } = router.query

  const state = useNavigationState()

  const [cells, setCells] = useState([])

  const [data, setData] = useState([])

  useEffect(() => {
    if (category) {
      async function fetchAPI() {
        const data = await getProjects(category)
        setData(data)
      }
      fetchAPI()
    }
  }, [category])

  useEffect(() => {
    let i = 0
    const blickInterval = setInterval(async () => {
      let initialCell = Array.from({ length: count }, () => {
        return {
          name: Math.floor(Math.random() * 10),
          nameCN: Math.floor(Math.random() * 10),
        }
      })
      setCells(initialCell)
      i++
      if (i > blinkTimes && data) {
        clearInterval(blickInterval)

        let finalCell = Array.from({ length: count }, (_, index) => {
          return {
            name: data[index] ? data[index].Name : "0",
            nameCN: data[index] ? data[index].NameCN : "0",
          }
        })
        setCells(finalCell)
      }
    }, interval)
  }, [data])

  return (
    <>
      <div className={styles["grid-container"]}>
        <div className={styles["grid-title"]}>
          {state.currentLanguage == "cn" ? "O筑设计" : "OFFICE ZHU"}
        </div>
        {cells.map((item, index) => {
          return (
            <span className={styles["grid-cell"]} key={index}>
              <span className={styles["grid-cell-label"]}>
                <div className={styles["grid-cell-name"]}>
                  {state.currentLanguage == "cn" ? item.nameCN : item.name}
                </div>
              </span>
            </span>
          )
        })}
      </div>
      {data && (
        <ProjectScene
          data={data}
          router={router}
          root={`/projects/${category}/`}
        />
      )}
    </>
  )
}

export default ProjectsGrid
