import React from "react"
import Navigation from "../../components/Navigation"
import ContactGrid from "../../components/Grid/ContactGrid"

import styles from "../../styles/Pages/Contact/Contact.module.css"

import getContact from "../../api/getContact"
const Contact = ({ data }) => {
  return (
    <div className={styles.container}>
      <ContactGrid data={data} />
      <Navigation />
    </div>
  )
}

export default Contact

export async function getStaticProps() {
  const data = await getContact()

  // Pass post data to the page via props
  return { props: { data } }
}
