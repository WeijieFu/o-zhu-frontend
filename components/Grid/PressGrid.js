import React, { useEffect, useState, useRef } from "react"
import Link from "next/link"
import _ from "lodash"
import styles from "../../styles/Grid/Grid.module.css"

import useNavigationState from "../../state/NavigationState"
import generateRandom from "./generateRandom"

// import { row, column, count, blinkTimes, interval } from "./GridSetting"
import useGridState from "../../state/GridState"

const PressGrid = ({ data }) => {
  const state = useNavigationState()
  const [cells, setCells] = useState([])
  const [scroll, setScroll] = useState(0)
  const grid = useGridState()
  const count = grid.row * grid.column
  const row = grid.row
  const column = grid.column
  const blinkTimes = grid.blinkTimes
  const interval = grid.interval

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
      setScroll(0)
      setCells(finalCell)
    }
    if (state.currentSorting == "date") {
      console.log(state.currentSorting)
      const finalCell = sortByName(count, row, column, data.length)
      setScroll(0)
      setCells(finalCell)
    }
  }, [state.currentSorting])

  //SORTING METHODS
  const sortByRandom = (count, row, column, length) => {
    const pagesCount = Math.ceil(length / ((row - 1) * (column - 1) * 0.5))
    const randomArray = generateRandom(pagesCount, count, row, column, length)
    const finalCell = Array(count * pagesCount)
    finalCell.fill({ name: "0" })
    randomArray.forEach((value, index) => {
      finalCell[value] = {
        name: data[index].Date.slice(0, 10).toString().replaceAll("-", " "),
        image: data[index].Image,
        url: data[index].URL,
        index: index,
      }
    })
    // console.log(column, finalCell)
    return finalCell
  }

  const sortByName = (count, row, column, length) => {
    const pagesCount = Math.ceil(length / ((row - 1) * (column - 1)))
    const filteredCell = cells.filter((cell) => cell.name !== "0")
    const sortedCell = _.sortBy(filteredCell, ({ name }) => name.toLowerCase())
    const finalCell = Array(count * pagesCount)
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
  //HANDLE SCROLL
  const handleScroll = (e) => {
    if (cells.length > count) {
      const direction = e.deltaY / Math.abs(e.deltaY)
      const pagesCount =
        state.currentSorting === "random"
          ? Math.ceil(data.length / ((row - 1) * (column - 1) * 0.5))
          : Math.ceil(data.length / ((row - 1) * (column - 1)))
      if (direction > 0 && scroll < (pagesCount - 1) * row) {
        setScroll(scroll + direction)
      }
      if (direction < 0 && scroll > 0) {
        setScroll(scroll + direction)
      }
    }
  }
  const handleTouch = (e) => {
    console.log(e)
  }
  /*
  TEMPLATE
*/
  return (
    <>
      <div
        className={styles["grid-container"]}
        onWheel={handleScroll}
        onTouchMove={handleTouch}
      >
        <div className={styles["grid-title"]}>
          {state.currentLanguage == "cn" ? "O筑设计" : "OFFICE ZHU"}
        </div>

        {cells.map((item, index) => {
          return (
            <span
              className={styles["grid-cell"]}
              key={index}
              style={{ transform: `translateY(${scroll * -100}%)` }}
            >
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

export default PressGrid
