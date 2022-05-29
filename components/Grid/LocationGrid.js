import React, { useEffect, useState } from "react"
import styles from "../../styles/Grid/Grid.module.css"

const LocationGrid = ({ currentLocation }) => {
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

      {/* <span className={`${styles["grid-cell-image-large"]}`}>
        <img
          src={currentLocation.Image.data.attributes.url}
          alt={currentLocation.Image.data.attributes.name}
        />
      </span> */}
    </div>
  )
}

export default LocationGrid
