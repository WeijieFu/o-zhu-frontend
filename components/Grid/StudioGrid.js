import React, { useEffect, useState, useRef } from "react"
import styles from "../../styles/Grid/Grid.module.css"
import Link from "next/link"
import getStudio from "../../api/getStudio"
import { useRouter } from "next/router"

import { count, blinkTimes, interval } from "./GridSetting"
import StudioScene from "../Scene/StudioScene"

const StudioGrid = () => {
  const router = useRouter()

  const [cells, setCells] = useState([])

  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchAPI() {
      const data = await getStudio()
      setData(data)
    }
    fetchAPI()
  }, [])

  useEffect(() => {
    let i = 0
    const blickInterval = setInterval(async () => {
      let initialCell = Array.from({ length: count }, () => {
        return {
          name: Math.floor(Math.random() * 10),
        }
      })
      setCells(initialCell)
      i++
      if (i > blinkTimes && data) {
        clearInterval(blickInterval)

        let finalCell = Array.from({ length: count }, (_, index) => {
          return {
            name: data[index] ? data[index].Location : "0",
          }
        })
        setCells(finalCell)
        // console.log(data[0].Model.data.attributes.url)
      }
    }, interval)
  }, [data])

  return (
    <>
      <div className={styles["grid-container"]}>
        <div className={styles["grid-title"]}>OFFICE ZHU</div>
        {cells.map((item, index) => {
          return (
            <span className={styles["grid-cell"]} key={index}>
              <span className={styles["grid-cell-label"]}>
                <div className={styles["grid-cell-name"]}>{item.name}</div>
              </span>
            </span>
          )
        })}
      </div>
      {data && <StudioScene data={data} router={router} />}
    </>
  )
}

export default StudioGrid
