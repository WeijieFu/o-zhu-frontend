import React, { useEffect, useState, useRef } from "react"
import styles from "../../styles/Grid/Grid.module.css"

import getTeam from "../../api/getTeam"
import PersonDescription from "../About/PersonDescription"

const StudioGrid = () => {
  const count = 66
  const blinkTimes = 10
  const [cells, setCells] = useState([])

  const [data, setData] = useState([])
  const [personDescriptionData, setPersonDescriptionData] = useState([])
  const [isPersonDescriptionShown, setIsPersonDescriptionShown] = useState(
    false
  )
  const [defaultPosition, setDefaultPosition] = useState({ x: 0, y: 0 })
  useEffect(() => {
    let i = 0
    const blickInterval = setInterval(async () => {
      let initialCell = Array.from({ length: count }, () => {
        return {
          name: Math.floor(Math.random() * 10),
        }
      })
      setCells(initialCell)
      i++
      if (i > blinkTimes) {
        clearInterval(blickInterval)

        const data = await getTeam()

        let finalCell = Array.from({ length: count }, (_, index) => {
          return {
            name: data[index] ? data[index].Name : "0",
            image: data[index] ? data[index].Image.data.attributes.url : "",
          }
        })
        setCells(finalCell)
        setData(data)
      }
    }, 100)
  }, [])

  const handleImageClick = (e, index) => {
    setDefaultPosition({ x: e.clientX, y: e.clientY })
    setPersonDescriptionData(data[index])
    setIsPersonDescriptionShown(!isPersonDescriptionShown)
  }

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
        <div className={styles["grid-title"]}>OFFICE ZHU</div>
        {cells.map((item, index) => {
          return (
            <span className={styles["grid-cell"]} key={index}>
              <span className={styles["grid-cell-label"]}>
                <div className={styles["grid-cell-name"]}>{item.name}</div>
                {item.image && (
                  <img
                    className={styles["grid-cell-image"]}
                    src={item.image}
                    onClick={(e) => {
                      handleImageClick(e, index)
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

export default StudioGrid
