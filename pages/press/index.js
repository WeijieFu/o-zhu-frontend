import React from "react"
import Navigation from "../../components/Navigation"
import styles from "../../styles/Pages/Press/Press.module.css"
import PressGrid from "../../components/Grid/PressGrid"

import getPress from "../../api/getPress"
const Press = ({ data }) => {
  return (
    <div className={styles.container}>
      <PressGrid data={data} />
      <Navigation></Navigation>
    </div>
  )
}

export default Press

export async function getStaticProps() {
  const data = await getPress()

  // Pass post data to the page via props
  return { props: { data } }
}
