import React, { useEffect, useState } from "react"
import styles from "../../styles/Grid/Grid.module.css"

import { count, blinkTimes, interval } from "./GridSetting"
import useNavigationState from "../../state/NavigationState"
const HomeGrid = () => {
  const [cells, setCells] = useState([])
  const state = useNavigationState()
  useEffect(() => {
    let i = 0
    const blickInterval = setInterval(async () => {
      let initialCell = Array.from({ length: count }, () =>
        Math.floor(Math.random() * 10)
      )
      setCells(initialCell)
      i++
      if (i > blinkTimes) {
        clearInterval(blickInterval)
        initialCell = Array(count).fill("0")
        setCells(initialCell)
      }
    }, interval)
  }, [])

  return (
    <div className={styles["grid-container"]}>
      <div className={styles["grid-title"]}>
        {state.currentLanguage == "cn" ? "O筑设计" : "OFFICE ZHU"}
      </div>
      {cells.map((item, index) => {
        return (
          <span className={styles["grid-cell"]} key={index}>
            <span className={styles["grid-cell-label"]}>{item}</span>
          </span>
        )
      })}
    </div>
  )
}

export default HomeGrid
