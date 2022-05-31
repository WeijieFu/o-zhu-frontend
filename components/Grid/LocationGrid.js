import React, { useEffect, useState, useRef } from "react"
import styles from "../../styles/Grid/Grid.module.css"

import CloseButton from "../Button/CloseButton"
import Draggable from "react-draggable"

const LocationGrid = ({ currentLocation }) => {
  const [isInformationShown, setIsInformationShown] = useState(false)
  const [defaultPosition, setDefaultPosition] = useState({ x: 0, y: 0 })

  const handleInformationClick = (e) => {
    setIsInformationShown(true)
  }

  const handleClose = () => {
    setIsInformationShown(false)
  }

  return (
    <div className={styles["grid-container"]}>
      <div className={styles["grid-title"]}>OFFICE ZHU</div>

      <span
        className={`${styles["grid-cell"]} ${styles["grid-cell-location"]}`}
      >
        <span className={styles["grid-cell-label"]}>
          <div>Location</div>
          <div>{currentLocation.Location}</div>
        </span>
      </span>

      <span className={`${styles["grid-cell"]} ${styles["grid-cell-email"]}`}>
        <span className={styles["grid-cell-label"]}>
          <div>Email</div>
          <div className={styles["grid-cell-link"]}>
            <a href={`mailto:${currentLocation.Email}`}>
              {currentLocation.Email}
            </a>
          </div>
        </span>
      </span>

      <span className={`${styles["grid-cell-image-large"]}`}>
        <img
          src={currentLocation.Image.data.attributes.url}
          alt={currentLocation.Image.data.attributes.name}
        />
      </span>
      {!isInformationShown && (
        <span
          className={styles["grid-button-info"]}
          onClick={handleInformationClick}
        >
          Information
        </span>
      )}
      {isInformationShown && (
        <Draggable defaultPosition={defaultPosition}>
          <div className={styles["grid-info-container"]}>
            <div className={styles["grid-info-block"]}>
              <div>Office Profile</div>
              <div>{currentLocation.Description}</div>
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
