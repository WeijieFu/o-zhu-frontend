import React, { useEffect, useState, useRef } from "react"
import styles from "../../styles/Grid/Grid.module.css"

import CloseButton from "../Button/CloseButton"
import Draggable from "react-draggable"

import useNavigationState from "../../state/NavigationState"

const LocationGrid = ({ currentLocation }) => {
  const [isInformationShown, setIsInformationShown] = useState(false)
  const state = useNavigationState()

  const handleInformationClick = (e) => {
    setIsInformationShown(true)
  }

  const handleClose = () => {
    setIsInformationShown(false)
  }

  return (
    <div className={styles["grid-container"]}>
      <div className={styles["grid-title"]}>
        {state.currentLanguage == "cn" ? "O筑设计" : "OFFICE ZHU"}
      </div>

      <span
        className={`${styles["grid-cell"]} ${styles["grid-cell-location"]}`}
      >
        <span className={styles["grid-cell-label"]}>
          <div>{state.currentLanguage == "cn" ? "地点:" : "Location"}</div>
          <div>
            {state.currentLanguage == "cn"
              ? currentLocation.LocationCN
              : currentLocation.Location}
          </div>
        </span>
      </span>

      <span className={`${styles["grid-cell"]} ${styles["grid-cell-email"]}`}>
        <span className={styles["grid-cell-label"]}>
          <div>{state.currentLanguage == "cn" ? "邮箱" : "Email"}</div>
          <div className={styles["grid-cell-link"]}>
            <a href={`mailto:${currentLocation.Email}`}>
              {currentLocation.Email}
            </a>
          </div>
        </span>
      </span>

      <span className={`${styles["grid-cell-image-large"]}`}>
        <img src={currentLocation.Image} alt={currentLocation.Location} />
      </span>
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
              {/* <div>Office Profile</div> */}
              <div>
                {state.currentLanguage == "cn"
                  ? currentLocation.DescriptionCN
                  : currentLocation.Description}
              </div>
              <div className={styles["grid-info-close"]} onClick={handleClose}>
                <CloseButton />
              </div>
            </div>
          </div>
        </Draggable>
      )}
    </div>
  )
}

export default LocationGrid
