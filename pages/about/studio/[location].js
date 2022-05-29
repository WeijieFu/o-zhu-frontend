import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

import styles from "../../../styles/Pages/About/Location.module.css"

import getStudio from "../../../api/getStudio"

import LocationGrid from "../../../components/Grid/LocationGrid"
import Navigation from "../../../components/Navigation"

const Location = () => {
  const [currentLocation, setCurrentLocation] = useState()
  const router = useRouter()
  const { location } = router.query

  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchAPI() {
      const data = await getStudio()
      setData(data)
    }
    fetchAPI()
  }, [])

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
    <div className={styles.container}>
      {currentLocation && (
        <>
          {/* <LocationGrid currentLocation={currentLocation} /> */}
          <Navigation />
        </>
      )}
    </div>
  )
}

export default Location
