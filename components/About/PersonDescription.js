import React, { useRef } from "react"
import styles from "../../styles/Pages/About/PersonalDescription.module.css"
import ReactMarkdown from "react-markdown"
import Draggable from "react-draggable"
import CloseButton from "../Button/CloseButton"

import useNavigationState from "../../state/NavigationState"
import useGridState from "../../state/GridState"
const PersonDescription = ({
  defaultPosition,
  setIsPersonDescriptionShown,
  personDescriptionData,
}) => {
  const nodeRef = useRef(null)
  const state = useNavigationState()
  const grid = useGridState()
  const handleClose = () => {
    setIsPersonDescriptionShown(false)
  }
  return (
    <>
      <Draggable defaultPosition={defaultPosition} nodeRef={nodeRef}>
        <div ref={nodeRef} className={styles.container}>
          <div className={styles.section}>
            {state.currentLanguage == "cn"
              ? personDescriptionData.NameCN
              : personDescriptionData.Name}
          </div>
          <div className={styles.section}>
            <div>
              {state.currentLanguage == "cn"
                ? personDescriptionData.Position1CN
                : personDescriptionData.Position1}
            </div>
            <div>
              {state.currentLanguage == "cn"
                ? personDescriptionData.Position2CN
                : personDescriptionData.Position2}
            </div>
          </div>
          <div className={styles.section}>
            <ReactMarkdown
              children={
                state.currentLanguage == "cn"
                  ? personDescriptionData.DescriptionCN
                  : personDescriptionData.Description
              }
            />
          </div>

          <div className={styles.section}>
            <div>Email</div>
            <div>
              <a href={`mailto:${personDescriptionData.Email}`}>
                {personDescriptionData.Email}
              </a>
            </div>
          </div>
          {personDescriptionData.Instagram && (
            <div className={styles.section}>
              <div>Instagram</div>
              <div>
                <a href={personDescriptionData.Instagram}>
                  {personDescriptionData.Instagram}
                </a>
              </div>
            </div>
          )}
          {personDescriptionData.Facebook && (
            <div className={styles.section}>
              <div>Facebook</div>
              <div>
                <a href={personDescriptionData.Facebook}>
                  {personDescriptionData.Facebook}
                </a>
              </div>
            </div>
          )}
          {grid.layout == "web" && (
            <div className={styles.button} onClick={handleClose}>
              <CloseButton />
            </div>
          )}
        </div>
      </Draggable>
      {grid.layout == "mobile" && (
        <div className={styles.button} onClick={handleClose}>
          <CloseButton />
        </div>
      )}
    </>
  )
}

export default PersonDescription
