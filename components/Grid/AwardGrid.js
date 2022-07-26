import React, { useEffect, useState, useRef } from "react"
import _ from "lodash"
import Link from "next/link"

import styles from "../../styles/Grid/Grid.module.css"

import getAward from "../../api/getAward"
import useNavigationState from "../../state/NavigationState"
import generateRandom from "./generateRandom"

import { row, column, count, blinkTimes, interval } from "./GridSetting"

const AwardGrid = ({ data }) => {
  const state = useNavigationState()
  const [cells, setCells] = useState([])

  // const [data, setData] = useState([])

  // useEffect(() => {
  //   async function fetchAPI() {
  //     const data = await getAward()
  //     setData(data)
  //   }
  //   fetchAPI()
  // }, [])

  useEffect(() => {
    let i = 0
    const blickInterval = setInterval(() => {
      let initialCell = Array.from({ length: count }, () => {
        return {
          name: Math.floor(Math.random() * 10),
        }
      })
      setCells(initialCell)
      i++
      if (data && i > blinkTimes) {
        clearInterval(blickInterval)
        const finalCell = sortByRandom(count, row, column, data.length)
        setCells(finalCell)
      }
    }, interval)
  }, [data])
  //HANDLE SORTING METHOD CHANGE
  useEffect(() => {
    if (state.currentSorting == "random") {
      const finalCell = sortByRandom(count, row, column, data.length)
      setCells(finalCell)
    }
    if (state.currentSorting == "date") {
      const finalCell = sortByName()
      setCells(finalCell)
    }
  }, [state.currentSorting])

  //SORTING METHODS
  const sortByRandom = (count, row, column, length) => {
    const randomArray = generateRandom(count, row, column, length)
    const finalCell = Array(count)
    finalCell.fill({ name: "0" })
    randomArray.forEach((value, index) => {
      finalCell[value] = {
        name: data[index].Date.slice(0, 10),
        image: data[index].Image,
        url: data[index].URL,
        index: index,
      }
    })

    return finalCell
  }

  const sortByName = () => {
    const filteredCell = cells.filter((cell) => cell.name !== "0")
    const sortedCell = _.sortBy(filteredCell, ({ name }) => name.toLowerCase())
    const finalCell = Array(count)
    finalCell.fill({ name: "0" })
    sortedCell.forEach((value, index) => {
      finalCell[index + Math.floor(index / (column - 1))] = {
        name: value.name,
        image: value.image,
        url: value.url,
        index: index,
      }
    })

    return finalCell
  }

  /*
  TEMPLATE
*/
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
                <div className={styles["grid-cell-name"]}>{item.name}</div>
                {item.image && (
                  <Link href={item.url}>
                    <a target="_blank" rel="noreferrer">
                      <img
                        className={styles["grid-cell-image"]}
                        src={item.image}
                      />
                    </a>
                  </Link>
                )}
              </span>
            </span>
          )
        })}
      </div>
    </>
  )
}

export default AwardGrid
