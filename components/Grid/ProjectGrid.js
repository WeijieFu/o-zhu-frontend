import React, { useEffect, useState, useRef } from "react"
import styles from "../../styles/Grid/Grid.module.css"
import ReactMarkdown from "react-markdown"
import CloseButton from "../Button/CloseButton"
import Draggable from "react-draggable"
import Spot from "../Project/Spot"
import useNavigationState from "../../state/NavigationState"

import { useRouter } from "next/router"
const ProjectGrid = ({ data }) => {
  const [isInformationShown, setIsInformationShown] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isSpotShown, setIsSpotShown] = useState(false)
  const [defaultPosition, setDefaultPosition] = useState({ x: 0, y: 0 })
  const [spotIndex, setSpotIndex] = useState(0)
  const state = useNavigationState()

  const router = useRouter()
  const handleInformationClick = () => {
    setIsInformationShown(true)
  }

  const handleClose = () => {
    // console.log("df")
    setIsInformationShown(false)
  }

  const handleLeftClick = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    } else {
      setCurrentImageIndex(data.Images.length - 1)
    }
  }

  const handleRightClick = () => {
    if (currentImageIndex < data.Images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    } else {
      setCurrentImageIndex(0)
    }
  }

  const handleSpotClick = (e, index) => {
    if (index === spotIndex) {
      setIsSpotShown(!isSpotShown)
    }
    if (index !== spotIndex) {
      setSpotIndex(index)
      setIsSpotShown(true)
    }
    setDefaultPosition({ x: e.clientX, y: e.clientY })
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className={styles["grid-container"]}>
      <div className={styles["grid-title"]}>
        {state.currentLanguage == "cn" ? "〇筑设计" : "OFFICE ZHU"}
      </div>
      {data.Date && (
        <>
          <span
            className={`${styles["grid-cell"]} ${styles["grid-cell-location"]}`}
          >
            <span className={styles["grid-cell-label"]}>
              <div>{state.currentLanguage == "cn" ? "项目:" : "Name:"}</div>
              <div>
                {state.currentLanguage == "cn" ? data.NameCN : data.Name}
              </div>
            </span>
          </span>

          <span className={`${styles["grid-cell"]} `}>
            <span className={styles["grid-cell-label"]}>
              <div>{state.currentLanguage == "cn" ? "客户:" : "Client:"}</div>
              <div>
                {state.currentLanguage == "cn" ? data.ClientCN : data.Client}
              </div>
            </span>
          </span>

          <span className={`${styles["grid-cell"]} `}>
            <span className={styles["grid-cell-label"]}>
              <div>{state.currentLanguage == "cn" ? "地点:" : "Place:"}</div>
              <div>
                {state.currentLanguage == "cn" ? data.PlaceCN : data.Place}
              </div>
            </span>
          </span>

          <span className={`${styles["grid-cell"]} `}>
            <span className={styles["grid-cell-label"]}>
              <div>{state.currentLanguage == "cn" ? "面积:" : "Area:"}</div>
              <div>
                {data.Area} M<sup>2</sup>:
              </div>
            </span>
          </span>

          <span className={`${styles["grid-cell"]} `}>
            <span className={styles["grid-cell-label"]}>
              <div>{state.currentLanguage == "cn" ? "时间:" : "Time:"}</div>
              <div>{data.Date.slice(0, 7)}</div>
            </span>
          </span>

          <span className={`${styles["grid-cell"]} `}>
            <span className={styles["grid-cell-label"]}>
              <div>
                {state.currentLanguage == "cn" ? "用时:" : "Construction Time:"}
              </div>
              <div>
                {state.currentLanguage == "cn"
                  ? data.ConstructionTimeCN
                  : data.ConstructionTime}
              </div>
            </span>
          </span>
          {data.Images && (
            <div className={`${styles["grid-cell-image-large"]}`}>
              <span
                className={styles["grid-cell-image-arrow-left"]}
                onClick={handleLeftClick}
              />
              <div className={`${styles["grid-cell-image-large-wrapper"]}`}>
                <img
                  src={data.Images[currentImageIndex].Image}
                  alt={data.Images[currentImageIndex].Name}
                />

                {data.Images[currentImageIndex].Spot &&
                  data.Images[currentImageIndex].Spot.map((value, index) => {
                    return (
                      <span
                        className={styles["grid-cell-image-spot"]}
                        style={{
                          left: `${value.x * 100}%`,
                          top: `${value.y * 100}%`,
                        }}
                        onClick={(e) => {
                          handleSpotClick(e, index)
                        }}
                        key={index}
                      >
                        {index + 1}
                      </span>
                    )
                  })}
              </div>

              <span
                className={styles["grid-cell-image-arrow-right"]}
                onClick={handleRightClick}
              />
            </div>
          )}
        </>
      )}

      {!isInformationShown && (
        <span
          className={styles["grid-button-info"]}
          onClick={handleInformationClick}
        >
          {state.currentLanguage == "cn" ? "信息" : "Information"}
        </span>
      )}

      {isInformationShown && (
        <Draggable>
          <div className={styles["grid-info-container"]}>
            <div className={styles["grid-info-block"]}>
              <ReactMarkdown
                children={
                  state.currentLanguage == "cn"
                    ? data.InformationCN
                    : data.Information
                }
              />

              <div
                className={styles["grid-info-close"]}
                onClick={handleClose}
                onTouchStart={handleClose}
              >
                <CloseButton />
              </div>
            </div>
          </div>
        </Draggable>
      )}

      {isSpotShown && (
        <Spot
          defaultPosition={defaultPosition}
          data={data.Images[currentImageIndex].Spot[spotIndex]}
          index={spotIndex}
          setIsSpotShown={setIsSpotShown}
        />
      )}

      <div className={styles["grid-back"]} onClick={handleBack}>
        {state.currentLanguage == "cn" ? "退回" : "Back"}
      </div>
    </div>
  )
}

export default ProjectGrid
