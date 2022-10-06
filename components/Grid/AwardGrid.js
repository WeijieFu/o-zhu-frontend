import React, { useEffect, useState, useRef } from "react"
import _ from "lodash"
import Link from "next/link"

import styles from "../../styles/Grid/Grid.module.css"

import useNavigationState from "../../state/NavigationState"
import generateRandom from "./generateRandom"
import useGridState from "../../state/GridState"
// import { row, column, count, blinkTimes, interval } from "./GridSetting"

const AwardGrid = ({ data }) => {
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
      console.log(column)
    }, interval)
  }, [data, grid.layout])

  //HANDLE SORTING METHOD CHANGE
  useEffect(() => {
    if (state.currentSorting == "random") {
      const finalCell = sortByRandom(count, row, column, data.length)
      setCells(finalCell)
    }
    if (state.currentSorting == "date") {
      const finalCell = sortByName(count, row, column, data.length)

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
    const step = window.innerHeight / 7.75
    if (cells.length > count) {
      const direction = e.deltaY / Math.abs(e.deltaY)
      const pagesCount =
        state.currentSorting === "random"
          ? Math.ceil(data.length / ((row - 1) * (column - 1) * 0.5))
          : Math.ceil(data.length / ((row - 1) * (column - 1)))
      if (direction > 0 && scroll > -(pagesCount - 1) * row * step) {
        setScroll(scroll - direction * step)
      }
      if (direction < 0 && scroll < -step) {
        setScroll(scroll - direction * step)
      }
      console.log(scroll, direction)
    }
  }

  /*
  HANDLE TOUCH
  */
  const [touchStart, setTouchStart] = useState(0)
  const [scrollStart, setScrollStart] = useState(0)
  const lastItem = useRef()

  const handleTouchStart = (e) => {
    setTouchStart(e.nativeEvent.touches[0].clientY)
  }
  const handleTouchMove = (e) => {
    const step = window.innerHeight / 7.75
    const currentTouch = e.nativeEvent.touches[0].clientY
    const delta = Math.floor((currentTouch - touchStart) / step) * step
    const newScroll = delta + scrollStart
    const rect = lastItem.current.getBoundingClientRect()
    if (delta > 0 && newScroll <= 0) {
      setScroll(newScroll)
    }
    if (delta < 0 && rect.bottom > window.innerHeight - step) {
      setScroll(newScroll)
    }
  }
  const handleTouchEnd = (e) => {
    setScrollStart(scroll)
  }

  /*
  TEMPLATE
*/
  return (
    <>
      <div
        className={styles["grid-container"]}
        onWheel={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles["grid-title"]}>
          {state.currentLanguage == "cn" ? "〇筑设计" : "OFFICE ZHU"}
        </div>

        {cells.map((item, index) => {
          return (
            <span
              className={styles["grid-cell"]}
              key={index}
              style={{
                transform: `translateY(${scroll}px)`,
              }}
              ref={index === cells.length - 1 ? lastItem : null}
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

export default AwardGrid
