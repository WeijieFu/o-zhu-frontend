import React, { useEffect, useState, useRef } from "react"
import styles from "../../styles/Grid/Grid.module.css"
import ReactMarkdown from "react-markdown"
import CloseButton from "../Button/CloseButton"
import Draggable from "react-draggable"
import Spot from "../Project/Spot"
import useNavigationState from "../../state/NavigationState"
import { useRouter } from "next/router"
const MobileProjectGrid = ({ data }) => {
  const [isInformationShown, setIsInformationShown] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isSpotShown, setIsSpotShown] = useState(false)
  const [defaultPosition, setDefaultPosition] = useState({ x: 0, y: 0 })
  const [spotIndex, setSpotIndex] = useState([0, 0])
  const state = useNavigationState()
  const router = useRouter()
  const [currentDetail, setCurrentDetail] = useState(0)
  const handleInformationClick = () => {
    setIsInformationShown(true)
  }

  const handleClose = () => {
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

  const handleSpotClick = (e, imageIndex, index) => {
    console.log(imageIndex, index, spotIndex)
    if (imageIndex == spotIndex[0] && index == spotIndex[1]) {
      setIsSpotShown(!isSpotShown)
    }
    if (imageIndex != spotIndex[0] || index != spotIndex[1]) {
      setSpotIndex([imageIndex, index])
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
        {state.currentLanguage == "cn" ? "O筑设计" : "OFFICE ZHU"}
      </div>
      {currentDetail == 1 && (
        <div
          className={styles["grid-arrow-left"]}
          onClick={() => {
            setCurrentDetail(0)
          }}
        >
          <svg
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 1L0.999999 9L9 17" stroke="#C4C4C4" />
          </svg>
        </div>
      )}
      {currentDetail == 0 && (
        <div
          className={styles["grid-arrow-right"]}
          onClick={() => {
            setCurrentDetail(1)
          }}
        >
          <svg
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L9 9L1 17" stroke="#C4C4C4" />
          </svg>
        </div>
      )}

      {data.Date && (
        <>
          {currentDetail === 0 && (
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
                  <div>
                    {state.currentLanguage == "cn" ? "合作:" : "Client:"}
                  </div>
                  <div>
                    {state.currentLanguage == "cn"
                      ? data.ClientCN
                      : data.Client}
                  </div>
                </span>
              </span>

              <span className={`${styles["grid-cell"]} `}>
                <span className={styles["grid-cell-label"]}>
                  <div>
                    {state.currentLanguage == "cn" ? "地点:" : "Place:"}
                  </div>
                  <div>
                    {state.currentLanguage == "cn" ? data.PlaceCN : data.Place}
                  </div>
                </span>
              </span>
            </>
          )}
          {currentDetail === 1 && (
            <>
              <span className={`${styles["grid-cell"]} `}>
                <span className={styles["grid-cell-label"]}>
                  <div>
                    {state.currentLanguage == "cn" ? (
                      "面积:"
                    ) : (
                      <>
                        M<sup>2</sup>:
                      </>
                    )}
                  </div>
                  <div>{data.Area}</div>
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
                    {state.currentLanguage == "cn"
                      ? "用时:"
                      : "Construction Time:"}
                  </div>
                  <div>
                    {state.currentLanguage == "cn"
                      ? data.ConstructionTimeCN
                      : data.ConstructionTime}
                  </div>
                </span>
              </span>
            </>
          )}

          {data.Images && (
            <div className={`${styles["grid-cell-image-large"]}`}>
              {data.Images.map((image, imageIndex) => {
                return (
                  <div className={`${styles["grid-cell-image-large-wrapper"]}`}>
                    <img key={imageIndex} src={image.Image} alt={image.Name} />

                    {image.Spot &&
                      image.Spot.map((value, index) => {
                        return (
                          <span
                            className={styles["grid-cell-image-spot"]}
                            style={{
                              left: `${value.x * 100}%`,
                              top: `${value.y * 100}%`,
                            }}
                            onClick={(e) => {
                              handleSpotClick(e, imageIndex, index)
                            }}
                            key={index}
                          >
                            {isSpotShown &&
                            spotIndex[0] == imageIndex &&
                            spotIndex[1] == index ? (
                              <CloseButton />
                            ) : (
                              index + 1
                            )}
                          </span>
                        )
                      })}
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}

      {!isInformationShown && (
        <span
          className={styles["grid-button-info"]}
          onClick={handleInformationClick}
        >
          i
        </span>
      )}

      {isInformationShown && (
        <>
          <div className={styles["grid-info-close"]} onClick={handleClose}>
            <CloseButton />
          </div>
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
              </div>
            </div>
          </Draggable>
        </>
      )}

      {isSpotShown && (
        <Spot
          defaultPosition={defaultPosition}
          data={data.Images[spotIndex[0]].Spot[spotIndex[1]]}
          index={spotIndex[1]}
          setIsSpotShown={setIsSpotShown}
        />
      )}

      <div className={styles["grid-back"]} onClick={handleBack}>
        {state.currentLanguage == "cn" ? "退回" : "Back"}
      </div>
    </div>
  )
}

export default MobileProjectGrid
