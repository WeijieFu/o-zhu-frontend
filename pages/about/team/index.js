import React from "react"
import Navigation from "../../../components/Navigation"
import TeamGrid from "../../../components/Grid/TeamGrid"

import styles from "../../../styles/Pages/About/About.module.css"

import getTeam from "../../../api/getTeam"

const Team = ({ data }) => {
  return (
    <div className={styles.container}>
      <TeamGrid data={data} />
      <Navigation />
    </div>
  )
}

export default Team

export async function getStaticProps() {
  // Instead of fetching your `/api` route you can call the same
  // function directly in `getStaticProps`
  const data = await getTeam()

  // Props returned will be passed to the page component
  return { props: { data } }
}
