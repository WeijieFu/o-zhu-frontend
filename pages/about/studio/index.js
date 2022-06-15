import React from "react"
import Navigation from "../../../components/Navigation"
import StudioGrid from "../../../components/Grid/StudioGrid"

import getStudio from "../../../api/getStudio"
import styles from "../../../styles/Pages/About/About.module.css"

const Studio = ({ data }) => {
  return (
    <div className={styles.container}>
      <StudioGrid data={data} />
      <Navigation />
    </div>
  )
}

export default Studio

export async function getStaticProps() {
  // Instead of fetching your `/api` route you can call the same
  // function directly in `getStaticProps`
  const data = await getStudio()

  // Props returned will be passed to the page component
  return { props: { data } }
}
