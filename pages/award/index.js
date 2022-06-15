import React from "react"
import Navigation from "../../components/Navigation"
import AwardGrid from "../../components/Grid/AwardGrid"

import styles from "../../styles/Pages/Award/Award.module.css"

import getAward from "../../api/getAward"
const Award = ({ data }) => {
  return (
    <div className={styles.container}>
      <AwardGrid data={data} />
      <Navigation></Navigation>
    </div>
  )
}

export default Award

export async function getStaticProps() {
  const data = await getAward()

  // Pass post data to the page via props
  return { props: { data } }
}
