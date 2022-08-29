import React, { useEffect, useState } from "react"
import styles from "../../styles/Grid/Grid.module.css"

import Link from "next/link"
import getContact from "../../api/getContact"
import { count, blinkTimes, interval } from "./GridSetting"

import useNavigationState from "../../state/NavigationState"
import useGridState from "../../state/GridState"
const ContactGrid = ({ data }) => {
  const [cells, setCells] = useState([])
  const grid = useGridState()
  const state = useNavigationState()
  // useEffect(() => {
  //   console.log(grid.column)
  // }, [grid.column])

  useEffect(() => {
    let i = 0
    const blickInterval = setInterval(async () => {
      let initialCell = Array.from({ length: count }, () => {
        return {
          type: Math.floor(Math.random() * 10),
          value: "",
          url: "",
        }
      })
      setCells(initialCell)
      i++
      if (i > blinkTimes && data) {
        clearInterval(blickInterval)

        let finalCell = Array.from({ length: count }, (_, index) => {
          return {
            type: data[index] ? data[index].Type : "0",
            value: data[index] ? data[index].Value : "",
            url: data[index] ? data[index].URL : "",
          }
        })
        setCells(finalCell)
      }
    }, interval)
  }, [data])
  const handleMenuClose = () => {
    console.log("click")
  }
  return (
    <div className={styles["grid-container"]} onClick={handleMenuClose}>
      <div className={styles["grid-title"]}>
        {state.currentLanguage == "cn" ? "O筑设计" : "OFFICE ZHU"}
      </div>

      {cells.map((item, index) => {
        return (
          <span className={styles["grid-cell"]} key={index}>
            <span className={styles["grid-cell-label"]}>
              <div>{item.type}</div>
              {item.type === "Email" ? (
                <div className={styles["grid-cell-link"]}>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`mailto:${item.value}`}
                  >
                    {item.value}
                  </a>
                </div>
              ) : (
                <div className={styles["grid-cell-link"]}>
                  <a target="_blank" rel="noreferrer" href={item.url}>
                    {item.value}
                  </a>
                </div>
              )}
            </span>
          </span>
        )
      })}
    </div>
  )
}

export default ContactGrid
