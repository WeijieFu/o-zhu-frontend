import React, { useEffect } from "react"
import styles from "../../styles/Pages/Projects/Spot.module.css"
import Draggable from "react-draggable"
import CloseButton from "../Button/CloseButton"
import useNavigationState from "../../state/NavigationState"

const Spot = ({ defaultPosition, data, index, setIsSpotShown }) => {
  const handleClose = () => {
    setIsSpotShown(false)
  }

  const state = useNavigationState()
  return (
    <Draggable defaultPosition={defaultPosition}>
      <div className={styles["container"]}>
        <div className={styles["text"]}>
          <span>{index + 1}</span>
          <span>
            {state.currentLanguage == "cn"
              ? data.DescriptionCN
              : data.Description}
          </span>
        </div>

        {data.Image && (
          <div className={styles["image"]}>
            <img src={data.Image} alt={data.ProjectImage} />
          </div>
        )}

        <div onClick={handleClose} className={styles["close"]}>
          <CloseButton />
        </div>
      </div>
    </Draggable>
  )
}

export default Spot
