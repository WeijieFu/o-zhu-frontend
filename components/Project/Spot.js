import React, { useEffect } from "react"
import styles from "../../styles/Pages/Projects/Spot.module.css"
import Draggable from "react-draggable"
import CloseButton from "../Button/CloseButton"
import useNavigationState from "../../state/NavigationState"
import ReactMarkdown from "react-markdown"
import useGridState from "../../state/GridState"
const Spot = ({ defaultPosition, data, index, setIsSpotShown }) => {
  const grid = useGridState()
  const handleClose = () => {
    setIsSpotShown(false)
  }

  const state = useNavigationState()
  return (
    <Draggable defaultPosition={defaultPosition}>
      <div className={styles["container"]}>
        <div className={styles["text"]}>
          <span>{index + 1}</span>
          <ReactMarkdown
            children={
              state.currentLanguage == "cn"
                ? data.DescriptionCN
                : data.Description
            }
          />
        </div>

        {data.Image && (
          <div className={styles["image"]}>
            <img src={data.Image} alt={data.ProjectImage} />
          </div>
        )}
        {grid.layout == "web" && (
          <div onClick={handleClose} className={styles["close"]}>
            <CloseButton />
          </div>
        )}
      </div>
    </Draggable>
  )
}

export default Spot
