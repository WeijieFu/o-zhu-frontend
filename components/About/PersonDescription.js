import React, { useRef } from "react"
import styles from "../../styles/Pages/About/PersonalDescription.module.css"

import Draggable from "react-draggable"
import CloseButton from "../Button/CloseButton"
const PersonDescription = ({
  defaultPosition,
  setIsPersonDescriptionShown,
  personDescriptionData,
}) => {
  const nodeRef = useRef(null)
  const handleClose = () => {
    setIsPersonDescriptionShown(false)
  }
  return (
    <Draggable defaultPosition={defaultPosition} nodeRef={nodeRef}>
      <div ref={nodeRef} className={styles.container}>
        <div className={styles.section}> {personDescriptionData.Name}</div>
        <div className={styles.section}>
          <div>{personDescriptionData.Position1}</div>
          <div>{personDescriptionData.Position2}</div>
        </div>
        <div className={styles.section}>
          {personDescriptionData.Description}
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

        <div className={styles.button} onClick={handleClose}>
          <CloseButton />
        </div>
      </div>
    </Draggable>
  )
}

export default PersonDescription
