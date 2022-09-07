import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

import styles from "../../../styles/Pages/About/Location.module.css"

import getStudio from "../../../api/getStudio"

import LocationGrid from "../../../components/Grid/LocationGrid"
import MobileLocationGrid from "../../../components/Grid/MobileLocationGrid"
import Navigation from "../../../components/Navigation"
import useNavigationState from "../../../state/NavigationState"
import useGridState from "../../../state/GridState"
import isClickingMenu from "../../../utils/isClickingMenu"

const Location = ({ data }) => {
  const [currentLocation, setCurrentLocation] = useState()
  const router = useRouter()
  const { location } = router.query

  const state = useNavigationState()
  const grid = useGridState()
  const handleClick = (e) => {
    if (!isClickingMenu(e.target.className)) {
      state.closeAll()
    }
  }
  useEffect(() => {
    if (data) {
      data.forEach((value) => {
        if (value.Location.toLowerCase() === location) {
          setCurrentLocation(value)
        }
      })

      console.log(currentLocation)
    }
  }, [data])

  return (
    <div className={styles.container} onClick={handleClick}>
      {currentLocation && (
        <>
          {grid.layout === "web" && (
            <>
              <Navigation />
              <LocationGrid currentLocation={currentLocation} />
            </>
          )}

          {grid.layout === "mobile" && (
            <>
              <MobileLocationGrid currentLocation={currentLocation} />
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Location

export async function getStaticPaths() {
  const data = await getStudio()

  const paths = data.map((item) => ({
    params: { location: item.Location.toLowerCase() },
  }))

  return {
    paths,
    fallback: false, // false or 'blocking'
  }
}

export async function getStaticProps() {
  const data = await getStudio()

  // Pass post data to the page via props
  return { props: { data } }
}
