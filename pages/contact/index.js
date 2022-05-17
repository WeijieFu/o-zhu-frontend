import React from "react"
import Navigation from "../../components/Navigation"
import ContactGrid from "../../components/Grid/ContactGrid"

import styles from "../../styles/Pages/Contact/Contact.module.css"
const Contact = () => {
  return (
    <div className={styles.container}>
      <ContactGrid />
      <Navigation />
    </div>
  )
}

export default Contact
