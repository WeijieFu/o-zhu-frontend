import React, { useEffect, useState, useRef } from "react"
import _ from "lodash"

import styles from "../../styles/Grid/Grid.module.css"
import { useRouter } from "next/router"

// import { row, column, count, blinkTimes, interval } from "./GridSetting"
import ProjectScene from "../Scene/ProjectScene"
import MobileProjectScene from "../Scene/MobileProjectScene"
import useNavigationState from "../../state/NavigationState"
import useGridState from "../../state/GridState"
import generateRandom from "./generateRandom"

const ProjectsGrid = ({ data }) => {
  const router = useRouter()

  const grid = useGridState()
  const count = grid.row * grid.column
  const row = grid.row
  const column = grid.column
  const blinkTimes = grid.blinkTimes
  const interval = grid.interval

  const { category } = router.query

  const state = useNavigationState()

  const [cells, setCells] = useState([])

  useEffect(() => {
    if (category) {
      state.setCurrentSorting("random")
      state.setCurrentCategory("projects")
      state.setCurrentPage(
        category == "urban_design"
          ? category.replace("_", " ")
          : category.replace("_", " & ")
      )
    }
  }, [category])

  useEffect(() => {
    let i = 0
    const blickInterval = setInterval(() => {
      let initialCell = Array.from({ length: count }, () => {
        return {
          name: Math.floor(Math.random() * 10),
          nameCN: Math.floor(Math.random() * 10),
          size: 0,
          year: 0,
          location: 0,
          locationCN: 0,
        }
      })
      setCells(initialCell)
      i++
      if (i > blinkTimes && data) {
        clearInterval(blickInterval)

        const finalCell = sortByRandom(count, row, column, data.length)
        setCells(finalCell)
      }
    }, interval)
  }, [data, grid.layout])

  //SORTING METHODS
  const sortByRandom = (count, row, column, length) => {
    const pagesCount = Math.ceil(length / ((row - 1) * (column - 1) * 0.5))
    const randomArray = generateRandom(pagesCount, count, row, column, length)
    const finalCell = Array(count * pagesCount)

    finalCell.fill({ name: "0", nameCN: "0" })

    randomArray.forEach((value, index) => {
      finalCell[value] = {
        name: data[index].Name,
        nameCN: data[index].NameCN,
        size: data[index].Area,
        year: data[index].Date.slice(0, 4),
        location: data[index].Place,
        locationCN: data[index].PlaceCN,
      }
      data[index].index = value
    })
    // console.log(finalCell, column, count, pagesCount)
    return finalCell
  }

  const sortByName = (count, row, column, length) => {
    const pagesCount = Math.ceil(length / ((row - 1) * (column - 1)))
    const filteredCell = cells.filter((cell) => cell.name !== "0")
    const sortedCell = []
    if (state.currentLanguage == "en") {
      sortedCell = _.sortBy(filteredCell, ({ name }) => name.toLowerCase())
    }

    if (state.currentLanguage == "cn") {
      sortedCell = _.sortBy(filteredCell, ({ nameCN }) => nameCN)
    }

    const finalCell = Array(count * pagesCount)
    finalCell.fill({
      name: "0",
      nameCN: "0",
      size: "0",
      year: "0",
      location: "0",
      locationCN: "0",
    })
    sortedCell.forEach((value, index) => {
      finalCell[index + Math.floor(index / (column - 1))] = {
        name: value.name,
        nameCN: value.nameCN,
        size: value.size,
        year: value.year,
        location: value.location,
        locationCN: value.locationCN,
      }

      // data[index].index = index + Math.floor(index / (column - 1))
      let obj = data.find((o) => o.Name === value.name)
      obj.index = index + Math.floor(index / (column - 1))
    })
    return finalCell
  }

  const sortBySize = (count, row, column, length) => {
    const pagesCount = Math.ceil(length / ((row - 1) * (column - 1)))
    const filteredCell = cells.filter((cell) => cell.name !== "0")
    const sortedCell = []

    sortedCell = _.sortBy(filteredCell, ({ size }) => size)

    const finalCell = Array(count * pagesCount)
    finalCell.fill({
      name: "0",
      nameCN: "0",
      size: "0",
      year: "0",
      location: "0",
      locationCN: "0",
    })
    sortedCell.forEach((value, index) => {
      finalCell[index + Math.floor(index / (column - 1))] = {
        name: value.name,
        nameCN: value.nameCN,
        size: value.size,
        year: value.year,
        location: value.location,
        locationCN: value.locationCN,
      }
      // data[index].index = index + Math.floor(index / (column - 1))
      let obj = data.find((o) => o.Name === value.name)
      obj.index = index + Math.floor(index / (column - 1))
    })
    return finalCell
  }

  const sortByYear = (count, row, column, length) => {
    const pagesCount = Math.ceil(length / ((row - 1) * (column - 1)))
    const filteredCell = cells.filter((cell) => cell.name !== "0")
    const sortedCell = []

    sortedCell = _.sortBy(filteredCell, ({ year }) => year)

    const finalCell = Array(count * pagesCount)
    finalCell.fill({
      name: "0",
      nameCN: "0",
      size: "0",
      year: "0",
      location: "0",
      locationCN: "0",
    })
    sortedCell.forEach((value, index) => {
      finalCell[index + Math.floor(index / (column - 1))] = {
        name: value.name,
        nameCN: value.nameCN,
        size: value.size,
        year: value.year,
        location: value.location,
        locationCN: value.locationCN,
      }
      // data[index].index = index + Math.floor(index / (column - 1))
      let obj = data.find((o) => o.Name === value.name)
      obj.index = index + Math.floor(index / (column - 1))
    })

    return finalCell
  }

  const sortByLocation = (count, row, column, length) => {
    const pagesCount = Math.ceil(length / ((row - 1) * (column - 1)))
    const filteredCell = cells.filter((cell) => cell.name !== "0")
    const sortedCell = []

    sortedCell = _.sortBy(filteredCell, ({ location }) => location)

    const finalCell = Array(count * pagesCount)
    finalCell.fill({
      name: "0",
      nameCN: "0",
      size: "0",
      year: "0",
      location: "0",
      locationCN: "0",
    })
    sortedCell.forEach((value, index) => {
      finalCell[index + Math.floor(index / (column - 1))] = {
        name: value.name,
        nameCN: value.nameCN,
        size: value.size,
        year: value.year,
        location: value.location,
        locationCN: value.locationCN,
      }
      // data[index].index = index + Math.floor(index / (column - 1))
      let obj = data.find((o) => o.Name === value.name)
      obj.index = index + Math.floor(index / (column - 1))
    })
    return finalCell
  }

  //HANDLE SORTING METHOD CHANGE
  useEffect(() => {
    if (state.currentSorting == "random") {
      const finalCell = sortByRandom(count, row, column, data.length)
      setCells(finalCell)
      setScroll(0)
    }
    if (state.currentSorting == "name") {
      const finalCell = sortByName(count, row, column, data.length)
      setCells(finalCell)
      setScroll(0)
    }

    if (state.currentSorting == "size") {
      const finalCell = sortBySize(count, row, column, data.length)
      setCells(finalCell)
      setScroll(0)
    }

    if (state.currentSorting == "year") {
      const finalCell = sortByYear(count, row, column, data.length)
      setCells(finalCell)
      setScroll(0)
    }

    if (state.currentSorting == "location") {
      const finalCell = sortByLocation(count, row, column, data.length)
      setCells(finalCell)
      setScroll(0)
    }
  }, [state.currentSorting])

  const name = (item) => {
    if (state.currentSorting == "name") {
      return state.currentLanguage == "cn" ? item.nameCN : item.name
    }
    if (state.currentSorting == "random") {
      return state.currentLanguage == "cn" ? item.nameCN : item.name
    }
    if (state.currentSorting == "size") {
      return item.size
    }
    if (state.currentSorting == "year") {
      return item.year
    }

    if (state.currentSorting == "location") {
      return state.currentLanguage == "cn" ? item.locationCN : item.location
    }
  }

  //HANDLE SCROLL
  const [scroll, setScroll] = useState(0)
  const handleScroll = (e) => {
    const step = window.innerHeight / 7.75
    if (cells.length > count) {
      const direction = e.deltaY / Math.abs(e.deltaY)
      const pagesCount =
        state.currentSorting === "random"
          ? Math.ceil(data.length / ((row - 1) * (column - 1) * 0.5))
          : Math.ceil(data.length / ((row - 1) * (column - 1)))
      if (direction > 0 && scroll > -(pagesCount - 1) * row * step + step) {
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

  const handleTouchStart = async (e) => {
    setTouchStart(e.touches[0].clientY)
  }
  const handleTouchMove = async (e) => {
    const step = window.innerHeight / 7.75
    const currentTouch = e.touches[0].clientY
    const delta = Math.floor((currentTouch - touchStart) / step) * step
    const newScroll = delta + scrollStart
    // console.log(touchStart)
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

  return (
    <>
      <div className={styles["grid-container"]}>
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
                <div className={styles["grid-cell-name"]}>{name(item)}</div>
              </span>
            </span>
          )
        })}
      </div>
      {data && (
        <>
          {grid.layout == "web" && (
            <ProjectScene
              data={data}
              router={router}
              category={category}
              handleScroll={handleScroll}
              handleTouchStart={handleTouchStart}
              handleTouchMove={handleTouchMove}
              handleTouchEnd={handleTouchEnd}
              scroll={scroll}
            />
          )}
          {grid.layout == "mobile" && (
            <MobileProjectScene
              data={data}
              router={router}
              category={category}
              handleScroll={handleScroll}
              handleTouchStart={handleTouchStart}
              handleTouchMove={handleTouchMove}
              handleTouchEnd={handleTouchEnd}
              scroll={scroll}
              step={window.innerHeight / 7.75}
            />
          )}
        </>
      )}
    </>
  )
}

export default ProjectsGrid
