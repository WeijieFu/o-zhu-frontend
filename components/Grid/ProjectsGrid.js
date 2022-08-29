import React, { useEffect, useState, useRef } from "react"
import _ from "lodash"

import styles from "../../styles/Grid/Grid.module.css"
import { useRouter } from "next/router"

import { row, column, count, blinkTimes, interval } from "./GridSetting"
import ProjectScene from "../Scene/ProjectScene"

import useNavigationState from "../../state/NavigationState"

import generateRandom from "./generateRandom"

const ProjectsGrid = ({ data }) => {
  const router = useRouter()
  const { category } = router.query

  const state = useNavigationState()

  const [cells, setCells] = useState([])
  const [scroll, setScroll] = useState(0)
  // const [data, setData] = useState([])
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
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
    const blickInterval = setInterval(async () => {
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
  }, [data])

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
  return (
    <>
      <div className={styles["grid-container"]}>
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
                <div className={styles["grid-cell-name"]}>{name(item)}</div>
              </span>
            </span>
          )
        })}
      </div>
      {data && (
        <ProjectScene
          data={data}
          router={router}
          category={category}
          handleScroll={handleScroll}
          scroll={scroll}
        />
      )}
    </>
  )
}

export default ProjectsGrid
