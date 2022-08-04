import React, { useEffect, useState, useRef } from "react"
import _ from "lodash"

import styles from "../../styles/Grid/Grid.module.css"

import getTeam from "../../api/getTeam"
import PersonDescription from "../About/PersonDescription"
import useNavigationState from "../../state/NavigationState"
import generateRandom from "./generateRandom"

import { row, column, count, blinkTimes, interval } from "./GridSetting"

const TeamGrid = ({ data }) => {
  const state = useNavigationState()
  const [cells, setCells] = useState([])

  // const [data, setData] = useState([])
  const [personDescriptionData, setPersonDescriptionData] = useState([])
  const [isPersonDescriptionShown, setIsPersonDescriptionShown] = useState(
    false
  )
  const [defaultPosition, setDefaultPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    state.setCurrentCategory("about")
    state.setCurrentPage("team")
    state.setCurrentSorting("random")
    console.log(data)
  }, [])

  useEffect(() => {
    let i = 0
    const blickInterval = setInterval(() => {
      let initialCell = Array.from({ length: count }, () => {
        return {
          name: Math.floor(Math.random() * 10),
          nameCN: Math.floor(Math.random() * 10),
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
    console.log(cells)
    if (state.currentSorting == "random") {
      const finalCell = sortByRandom(count, row, column, data.length)
      setCells(finalCell)
    }
    if (state.currentSorting == "name") {
      const finalCell = sortByName(count, row, column, data.length)
      setCells(finalCell)
    }
  }, [state.currentSorting])

  const handleImageClick = (e, index) => {
    setDefaultPosition({ x: e.clientX, y: e.clientY })
    setPersonDescriptionData(data[index])
    setIsPersonDescriptionShown(!isPersonDescriptionShown)
  }
  //SORTING METHODS
  const sortByRandom = (count, row, column, length) => {
    const pagesCount = 1
    const randomArray = generateRandom(pagesCount, count, row, column, length)
    const finalCell = Array(count)
    finalCell.fill({ name: "0", nameCN: "0" })
    randomArray.forEach((value, index) => {
      finalCell[value] = {
        name: data[index].Name,
        nameCN: data[index].NameCN,
        image: data[index].Image,
        index: index,
      }
    })

    return finalCell
  }

  const sortByName = (count, row, column, length) => {
    const filteredCell = cells.filter((cell) => cell.name !== "0")
    const sortedCell = []
    if (state.currentLanguage == "en") {
      sortedCell = _.sortBy(filteredCell, ({ name }) => name.toLowerCase())
    }

    if (state.currentLanguage == "cn") {
      sortedCell = _.sortBy(filteredCell, ({ nameCN }) => nameCN)
    }

    const finalCell = Array(count)
    finalCell.fill({ name: "0", nameCN: "0" })
    sortedCell.forEach((value, index) => {
      finalCell[index] = {
        name: value.name,
        nameCN: value.nameCN,
        image: value.image,
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
      {isPersonDescriptionShown && (
        <span className={styles["grid-draggable"]}>
          <PersonDescription
            defaultPosition={defaultPosition}
            setIsPersonDescriptionShown={setIsPersonDescriptionShown}
            personDescriptionData={personDescriptionData}
          />
        </span>
      )}

      <div className={styles["grid-container"]}>
        <div className={styles["grid-title"]}>
          {state.currentLanguage == "cn" ? "O筑设计" : "OFFICE ZHU"}
        </div>
        {cells.map((item, index) => {
          return (
            <span className={styles["grid-cell"]} key={index}>
              <span className={styles["grid-cell-label"]}>
                <div className={styles["grid-cell-name"]}>
                  {state.currentLanguage == "cn" ? item.nameCN : item.name}
                </div>
                {item.image && (
                  <img
                    className={styles["grid-cell-image"]}
                    src={item.image}
                    onClick={(e) => {
                      handleImageClick(e, item.index)
                    }}
                  />
                )}
              </span>
            </span>
          )
        })}
      </div>
    </>
  )
}

export default TeamGrid
