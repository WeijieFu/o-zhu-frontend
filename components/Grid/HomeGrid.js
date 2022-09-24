import React, { useEffect, useState } from "react"
import styles from "../../styles/Grid/Grid.module.css"

// import { count, blinkTimes, interval } from "./GridSetting"
import useNavigationState from "../../state/NavigationState"
import useGridState from "../../state/GridState"

const HomeGrid = () => {
  const [cells, setCells] = useState([])
  const state = useNavigationState()
  const grid = useGridState()
  const count = grid.row * grid.column

  useEffect(() => {
    state.setCurrentPage("")
    state.setCurrentCategory("")
    state.setCurrentSorting("")
    let i = 0
    const blickInterval = setInterval(async () => {
      let initialCell = Array.from({ length: count }, () =>
        Math.floor(Math.random() * 10)
      )
      setCells(initialCell)
      i++
      if (i > grid.blinkTimes) {
        clearInterval(blickInterval)
        initialCell = Array(count).fill("0")
        setCells(initialCell)
      }
    }, grid.interval)
  }, [grid.layout])

  return (
    <div
      className={styles["grid-container"]}
      style={{ gridTemplateColumns: `repeat(${grid.column},1fr)` }}
    >
      <div className={styles["grid-title"]}>
        {state.currentLanguage == "cn" ? "〇筑设计" : "OFFICE ZHU"}
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
