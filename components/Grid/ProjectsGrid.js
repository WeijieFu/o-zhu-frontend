import React, { useEffect, useState, useRef } from "react"
import _ from "lodash"

import styles from "../../styles/Grid/Grid.module.css"
import { useRouter } from "next/router"

import { row, column, count, blinkTimes, interval } from "./GridSetting"
import ProjectScene from "../Scene/ProjectScene"
import getProjects from "../../api/getProjects"

import useNavigationState from "../../state/NavigationState"

import generateRandom from "./generateRandom"

const ProjectsGrid = ({ data }) => {
  const router = useRouter()
  const { category } = router.query

  const state = useNavigationState()

  const [cells, setCells] = useState([])

  // const [data, setData] = useState([])

  useEffect(() => {
    if (category) {
      // async function fetchAPI() {
      //   const data = await getProjects(category)
      //   setData(data)
      // }
      // fetchAPI()
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
    const randomArray = generateRandom(count, row, column, length)
    const finalCell = Array(count)

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

  const sortByName = () => {
    const filteredCell = cells.filter((cell) => cell.name !== "0")
    const sortedCell = []
    if (state.currentLanguage == "en") {
      sortedCell = _.sortBy(filteredCell, ({ name }) => name.toLowerCase())
    }

    if (state.currentLanguage == "cn") {
      sortedCell = _.sortBy(filteredCell, ({ nameCN }) => nameCN)
    }

    const finalCell = Array(count)
    finalCell.fill({
      name: "0",
      nameCN: "0",
      size: "0",
      year: "0",
      location: "0",
      locationCN: "0",
    })
    sortedCell.forEach((value, index) => {
      finalCell[index] = {
        name: value.name,
        nameCN: value.nameCN,
        size: value.size,
        year: value.year,
        location: value.location,
        locationCN: value.locationCN,
      }
      data[index].index = index
    })
    return finalCell
  }

  const sortBySize = () => {
    const filteredCell = cells.filter((cell) => cell.name !== "0")
    const sortedCell = []

    sortedCell = _.sortBy(filteredCell, ({ size }) => size)

    const finalCell = Array(count)
    finalCell.fill({
      name: "0",
      nameCN: "0",
      size: "0",
      year: "0",
      location: "0",
      locationCN: "0",
    })
    sortedCell.forEach((value, index) => {
      finalCell[index] = {
        name: value.name,
        nameCN: value.nameCN,
        size: value.size,
        year: value.year,
        location: value.location,
        locationCN: value.locationCN,
      }
      data[index].index = index
    })
    return finalCell
  }

  const sortByYear = () => {
    const filteredCell = cells.filter((cell) => cell.name !== "0")
    const sortedCell = []

    sortedCell = _.sortBy(filteredCell, ({ year }) => year)

    const finalCell = Array(count)
    finalCell.fill({
      name: "0",
      nameCN: "0",
      size: "0",
      year: "0",
      location: "0",
      locationCN: "0",
    })
    sortedCell.forEach((value, index) => {
      finalCell[index] = {
        name: value.name,
        nameCN: value.nameCN,
        size: value.size,
        year: value.year,
        location: value.location,
        locationCN: value.locationCN,
      }
      data[index].index = index
    })
    return finalCell
  }

  const sortByLocation = () => {
    const filteredCell = cells.filter((cell) => cell.name !== "0")
    const sortedCell = []

    sortedCell = _.sortBy(filteredCell, ({ location }) => location)

    const finalCell = Array(count)
    finalCell.fill({
      name: "0",
      nameCN: "0",
      size: "0",
      year: "0",
      location: "0",
      locationCN: "0",
    })
    sortedCell.forEach((value, index) => {
      finalCell[index] = {
        name: value.name,
        nameCN: value.nameCN,
        size: value.size,
        year: value.year,
        location: value.location,
        locationCN: value.locationCN,
      }
      data[index].index = index
    })
    return finalCell
  }

  //HANDLE SORTING METHOD CHANGE
  useEffect(() => {
    if (state.currentSorting == "random") {
      const finalCell = sortByRandom(count, row, column, data.length)
      setCells(finalCell)
    }
    if (state.currentSorting == "name") {
      const finalCell = sortByName()
      setCells(finalCell)
    }

    if (state.currentSorting == "size") {
      const finalCell = sortBySize()
      setCells(finalCell)
    }

    if (state.currentSorting == "year") {
      const finalCell = sortByYear()
      setCells(finalCell)
    }

    if (state.currentSorting == "location") {
      const finalCell = sortByYear()
      setCells(finalCell)
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
                <div className={styles["grid-cell-name"]}>{name(item)}</div>
              </span>
            </span>
          )
        })}
      </div>
      {data && <ProjectScene data={data} router={router} />}
    </>
  )
}

export default ProjectsGrid
