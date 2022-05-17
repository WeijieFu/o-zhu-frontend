import React, { useEffect, useState } from "react"
import styles from "../../styles/Grid/Grid.module.css"

import Link from "next/link"
import getContact from "../../api/getContact"

const ContactGrid = ({ currentPage }) => {
  const count = 66
  const blinkTimes = 5
  const [cells, setCells] = useState([])
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
      if (i > blinkTimes) {
        clearInterval(blickInterval)

        const data = await getContact()

        let finalCell = Array.from({ length: count }, (_, index) => {
          return {
            type: data[index] ? data[index].Type : "0",
            value: data[index] ? data[index].Value : "",
            url: data[index] ? data[index].URL : "",
          }
        })
        setCells(finalCell)
      }
    }, 100)
  }, [])

  return (
    <div className={styles["grid-container"]}>
      <div className={styles["grid-title"]}>OFFICE ZHU</div>

      {cells.map((item, index) => {
        return (
          <span className={styles["grid-cell"]} key={index}>
            <span className={styles["grid-cell-label"]}>
              <div>{item.type}</div>

              <div className={styles["grid-cell-link"]}>
                <Link href={item.url}>
                  <a target="_blank">{item.value}</a>
                </Link>
              </div>
            </span>
          </span>
        )
      })}
    </div>
  )
}

export default ContactGrid
