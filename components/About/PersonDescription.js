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
          {" "}
          {personDescriptionData.Description}
        </div>
        {personDescriptionData.Contact.map((value, index) => {
          return (
            <div className={styles.section} key={index}>
              <div>{value.Type}</div>
              <div>
                <a href={value.URL} target="_blank">
                  {value.Value}
                </a>
              </div>
            </div>
          )
        })}
        <div className={styles.button} onClick={handleClose}>
          <CloseButton />
        </div>
      </div>
    </Draggable>
  )
}

export default PersonDescription
